import http.server
import socketserver
import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import datetime
import urllib.parse
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)
from database.db import init_db, get_state_from_db, save_state_to_db


PORT = 8000
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_FILE = os.path.join(BASE_DIR, 'database', 'database.json')
OUTBOX_DIR = os.path.join(BASE_DIR, 'outbox')
ENV_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')
STATIC_DIR = os.path.join(BASE_DIR, 'frontend')

def load_env():
    env = {}
    if os.path.exists(ENV_FILE):
        with open(ENV_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    env[k.strip()] = v.strip()
    return env

class MyHandler(http.server.BaseHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for developer testing
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        if path == '/api/state':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
            self.end_headers()
            try:
                state_data = get_state_from_db()
                self.wfile.write(json.dumps(state_data).encode('utf-8'))
            except Exception as e:
                print(f"[DB] SQLite load failed, falling back to database.json: {e}")
                if os.path.exists(DB_FILE):
                    with open(DB_FILE, 'r', encoding='utf-8') as f:
                        self.wfile.write(f.read().encode('utf-8'))
                else:
                    self.wfile.write(b'{}')
            return

        elif path == '/api/config/smtp':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            env = load_env()
            config_payload = {
                "host": env.get('SMTP_HOST', ''),
                "port": env.get('SMTP_PORT', '587'),
                "user": env.get('SMTP_USER', ''),
                "from": env.get('EMAIL_FROM', 'noreply@vendorbridge.com'),
                "has_password": bool(env.get('SMTP_PASSWORD', '').strip())
            }
            self.wfile.write(json.dumps(config_payload).encode('utf-8'))
            return

        # Serve static file
        if path == '/':
            path = '/index.html'

        # Construct file path locally
        local_path = os.path.join(STATIC_DIR, path.lstrip('/'))
        
        # Security check to prevent path traversal
        if not os.path.abspath(local_path).startswith(os.path.abspath(STATIC_DIR)):
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b"Forbidden")
            return

        if os.path.exists(local_path) and os.path.isfile(local_path):
            self.send_response(200)
            
            # MIME types mapping
            mime_types = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.webp': 'image/webp'
            }
            _, ext = os.path.splitext(local_path)
            content_type = mime_types.get(ext.lower(), 'application/octet-stream')
            
            self.send_header('Content-Type', content_type)
            self.end_headers()
            with open(local_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"File not found")

    def do_POST(self):
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path

        if path == '/api/state':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Validate JSON
                state_data = json.loads(post_data.decode('utf-8'))
                try:
                    save_state_to_db(state_data)
                except Exception as dberr:
                    print(f"[DB] SQLite save failed, falling back to database.json: {dberr}")
                    with open(DB_FILE, 'w', encoding='utf-8') as f:
                        json.dump(state_data, f, indent=2)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
                self.send_header('Pragma', 'no-cache')
                self.send_header('Expires', '0')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return

        elif path == '/api/config/smtp':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                smtp_config = json.loads(post_data.decode('utf-8'))
                host = smtp_config.get('host', '').strip()
                port = smtp_config.get('port', '587').strip()
                user = smtp_config.get('user', '').strip()
                password = smtp_config.get('password', '').strip()
                email_from = smtp_config.get('from', 'noreply@vendorbridge.com').strip()
                
                # If password is empty but has_password is true, keep original password
                if not password:
                    old_env = load_env()
                    password = old_env.get('SMTP_PASSWORD', '')

                with open(ENV_FILE, 'w', encoding='utf-8') as f:
                    f.write("# SMTP Settings for Email Integration\n")
                    f.write(f"SMTP_HOST={host}\n")
                    f.write(f"SMTP_PORT={port}\n")
                    f.write(f"SMTP_USER={user}\n")
                    f.write(f"SMTP_PASSWORD={password}\n")
                    f.write(f"EMAIL_FROM={email_from}\n")
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return

        elif path == '/api/send-test-email':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                req = json.loads(post_data.decode('utf-8'))
                to_addr = "jagrutikpatel28279@gmail.com"
                if not to_addr:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "error": "Missing 'to' email address"}).encode('utf-8'))
                    return
                
                env = load_env()
                smtp_host = env.get('SMTP_HOST')
                smtp_port = env.get('SMTP_PORT', '587')
                smtp_user = env.get('SMTP_USER')
                smtp_pass = env.get('SMTP_PASSWORD')
                email_from = env.get('EMAIL_FROM', 'noreply@vendorbridge.com')
                
                if not smtp_host or not smtp_user or not smtp_pass:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "error": "SMTP parameters are not configured. Save configuration first."}).encode('utf-8'))
                    return
                
                msg = MIMEMultipart()
                msg['From'] = email_from
                msg['To'] = to_addr
                msg['Subject'] = "[VendorBridge] SMTP Email Integration Test"
                
                body = f"""
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0; border-radius: 8px;">
                    <h2 style="color: #8A2E0E; border-bottom: 2px solid #8A2E0E; padding-bottom: 8px;">SMTP Integration Success</h2>
                    <p>Congratulations!</p>
                    <p>Your SMTP credentials have been successfully verified on <strong>VendorBridge Procurement ERP</strong>.</p>
                    <p>System is ready to dispatch automated RFQ alerts and transactional notifications.</p>
                    <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
                    <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge Corporate Tech Desk</p>
                </div>
                """
                msg.attach(MIMEText(body, 'html'))
                
                server = smtplib.SMTP(smtp_host, int(smtp_port))
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(email_from, to_addr, msg.as_string())
                server.quit()
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return

        elif path == '/api/send-email':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                email_req = json.loads(post_data.decode('utf-8'))
                to_addr = "jagrutikpatel28279@gmail.com"
                subject = email_req.get('subject')
                body = email_req.get('body')
                
                if not to_addr or not subject or not body:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    self.wfile.write(json.dumps({"success": False, "error": "Missing to, subject, or body"}).encode('utf-8'))
                    return
                
                env = load_env()
                smtp_host = env.get('SMTP_HOST')
                smtp_port = env.get('SMTP_PORT', '587')
                smtp_user = env.get('SMTP_USER')
                smtp_pass = env.get('SMTP_PASSWORD')
                email_from = env.get('EMAIL_FROM', 'noreply@vendorbridge.com')
                
                sent_real = False
                err_msg = ""
                
                # Check if SMTP is configured
                if smtp_host and smtp_user and smtp_pass:
                    try:
                        msg = MIMEMultipart()
                        msg['From'] = email_from
                        msg['To'] = to_addr
                        msg['Subject'] = subject
                        
                        # Add body as HTML MIMEText
                        msg.attach(MIMEText(body, 'html'))
                        
                        # SMTP Connect
                        server = smtplib.SMTP(smtp_host, int(smtp_port))
                        server.starttls()
                        server.login(smtp_user, smtp_pass)
                        server.sendmail(email_from, to_addr, msg.as_string())
                        server.quit()
                        sent_real = True
                    except Exception as ex:
                        err_msg = f"SMTP error: {str(ex)}"
                
                # Fallback to local outbox folder if SMTP failed or not configured
                if not sent_real:
                    if not os.path.exists(OUTBOX_DIR):
                        os.makedirs(OUTBOX_DIR)
                    
                    filename = f"mail_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S_%f')}.json"
                    filepath = os.path.join(OUTBOX_DIR, filename)
                    
                    mail_content = {
                        "to": to_addr,
                        "from": email_from,
                        "subject": subject,
                        "body": body,
                        "timestamp": datetime.datetime.now().isoformat(),
                        "smtp_tried": bool(smtp_host),
                        "smtp_error": err_msg
                    }
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        json.dump(mail_content, f, indent=2)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                
                res_payload = {
                    "success": True,
                    "sent_real": sent_real,
                    "logged_locally": not sent_real
                }
                if err_msg:
                    res_payload["error"] = err_msg
                    
                self.wfile.write(json.dumps(res_payload).encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
            return
            
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"Not found")

# Start server
class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    pass

if __name__ == '__main__':
    print("[DB] Initializing database...")
    try:
        init_db()
        print("[DB] Database initialization finished.")
    except Exception as dberr:
        print(f"[DB] Database initialization failed: {dberr}")
        
    print(f"Starting server on http://localhost:{PORT}")
    server = ThreadingHTTPServer(('0.0.0.0', PORT), MyHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server...")
        server.server_close()
