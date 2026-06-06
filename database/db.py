import os
import json
import sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_FILE = os.path.join(BASE_DIR, 'backend', '.env')
JSON_DB_PATH = os.path.join(BASE_DIR, 'database', 'database.json')
SQLITE_DB_PATH = os.path.join(BASE_DIR, 'database', 'vendorbridge.db')

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

def get_db_connection():
    conn = sqlite3.connect(SQLITE_DB_PATH)
    conn.execute("PRAGMA foreign_keys = ON;")
    return conn

TABLES_DDL = [
    """
    CREATE TABLE IF NOT EXISTS users (
        email TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        name TEXT NOT NULL,
        vendor_id INTEGER
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS vendors (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        gst TEXT NOT NULL,
        rep TEXT NOT NULL,
        email TEXT NOT NULL,
        rating REAL,
        status TEXT NOT NULL,
        compliance TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS rfqs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        item TEXT NOT NULL,
        qty INTEGER NOT NULL,
        deadline TEXT NOT NULL,
        description TEXT,
        status TEXT NOT NULL,
        recommended_quote_id TEXT,
        date_created TEXT NOT NULL,
        manager_remarks TEXT
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS rfq_invited_vendors (
        rfq_id TEXT REFERENCES rfqs(id) ON DELETE CASCADE,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        PRIMARY KEY (rfq_id, vendor_id)
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS quotes (
        id TEXT PRIMARY KEY,
        rfq_id TEXT REFERENCES rfqs(id) ON DELETE CASCADE,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        unit_price REAL NOT NULL,
        lead_time INTEGER NOT NULL,
        total_val REAL NOT NULL,
        comments TEXT,
        date_submitted TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS purchase_orders (
        id TEXT PRIMARY KEY,
        rfq_id TEXT REFERENCES rfqs(id) ON DELETE CASCADE,
        quote_id TEXT REFERENCES quotes(id) ON DELETE CASCADE,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        subtotal REAL NOT NULL,
        tax_val REAL NOT NULL,
        total_val REAL NOT NULL,
        date_created TEXT NOT NULL,
        status TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        po_id TEXT REFERENCES purchase_orders(id) ON DELETE CASCADE,
        rfq_id TEXT REFERENCES rfqs(id) ON DELETE CASCADE,
        vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
        subtotal REAL NOT NULL,
        tax_val REAL NOT NULL,
        total_val REAL NOT NULL,
        date_created TEXT NOT NULL,
        due_date TEXT NOT NULL,
        status TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        user_name TEXT NOT NULL,
        title TEXT NOT NULL,
        details TEXT,
        timestamp TEXT NOT NULL
    )
    """,
    """
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY,
        read BOOLEAN NOT NULL DEFAULT 0,
        title TEXT NOT NULL,
        details TEXT,
        timestamp TEXT NOT NULL
    )
    """
]

def init_db():
    conn = get_db_connection()
    try:
        with conn:
            cur = conn.cursor()
            # Create tables
            for ddl in TABLES_DDL:
                cur.execute(ddl)
            
            # Check if seeding is needed
            cur.execute("SELECT COUNT(*) FROM users")
            if cur.fetchone()[0] == 0:
                print("[DB] Users table empty. Loading seed data from database.json...")
                seed_db_from_json(cur)
    finally:
        conn.close()

def seed_db_from_json(cur):
    if not os.path.exists(JSON_DB_PATH):
        print(f"[DB] Error: Seed file {JSON_DB_PATH} not found.")
        return
        
    with open(JSON_DB_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # Seed users
    for u in data.get('users', []):
        cur.execute(
            "INSERT INTO users (email, password, role, name, vendor_id) VALUES (?, ?, ?, ?, ?)",
            (u.get('email'), u.get('password'), u.get('role'), u.get('name'), u.get('vendorId'))
        )
    # Seed vendors
    for v in data.get('vendors', []):
        cur.execute(
            "INSERT INTO vendors (id, name, category, gst, rep, email, rating, status, compliance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (v.get('id'), v.get('name'), v.get('category'), v.get('gst'), v.get('rep'), v.get('email'), v.get('rating'), v.get('status'), v.get('compliance'))
        )
    # Seed rfqs
    for r in data.get('rfqs', []):
        cur.execute(
            "INSERT INTO rfqs (id, title, category, item, qty, deadline, description, status, recommended_quote_id, date_created, manager_remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (r.get('id'), r.get('title'), r.get('category'), r.get('item'), r.get('qty'), r.get('deadline'), r.get('description'), r.get('status'), r.get('recommendedQuoteId'), r.get('dateCreated'), r.get('managerRemarks'))
        )
        for vid in r.get('invitedVendors', []):
            cur.execute(
                "INSERT INTO rfq_invited_vendors (rfq_id, vendor_id) VALUES (?, ?)",
                (r.get('id'), vid)
            )
    # Seed quotes
    for q in data.get('quotes', []):
        cur.execute(
            "INSERT INTO quotes (id, rfq_id, vendor_id, unit_price, lead_time, total_val, comments, date_submitted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (q.get('id'), q.get('rfqId'), q.get('vendorId'), q.get('unitPrice'), q.get('leadTime'), q.get('totalVal'), q.get('comments'), q.get('dateSubmitted'))
        )
    # Seed purchase orders
    for po in data.get('purchaseOrders', []):
        cur.execute(
            "INSERT INTO purchase_orders (id, rfq_id, quote_id, vendor_id, subtotal, tax_val, total_val, date_created, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (po.get('id'), po.get('rfqId'), po.get('quoteId'), po.get('vendorId'), po.get('subtotal'), po.get('taxVal'), po.get('totalVal'), po.get('dateCreated'), po.get('status'))
        )
    # Seed invoices
    for inv in data.get('invoices', []):
        cur.execute(
            "INSERT INTO invoices (id, po_id, rfq_id, vendor_id, subtotal, tax_val, total_val, date_created, due_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (inv.get('id'), inv.get('poId'), inv.get('rfqId'), inv.get('vendorId'), inv.get('subtotal'), inv.get('taxVal'), inv.get('totalVal'), inv.get('dateCreated'), inv.get('dueDate'), inv.get('status'))
        )
    # Seed activities
    for act in data.get('activities', []):
        cur.execute(
            "INSERT INTO activities (id, type, user_name, title, details, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
            (act.get('id'), act.get('type'), act.get('user'), act.get('title'), act.get('details'), act.get('timestamp'))
        )
    # Seed notifications
    for note in data.get('notifications', []):
        cur.execute(
            "INSERT INTO notifications (id, read, title, details, timestamp) VALUES (?, ?, ?, ?, ?)",
            (note.get('id'), 1 if note.get('read') else 0, note.get('title'), note.get('details'), note.get('timestamp'))
        )
    print("[DB] Seeding completed successfully.")

def get_state_from_db():
    conn = get_db_connection()
    state = {
        "currentUserRole": "officer",
        "currentVendorId": 1,
        "users": [],
        "vendors": [],
        "rfqs": [],
        "quotes": [],
        "purchaseOrders": [],
        "invoices": [],
        "activities": [],
        "notifications": []
    }
    
    try:
        cur = conn.cursor()
        
        # Users
        cur.execute("SELECT email, password, role, name, vendor_id FROM users")
        for row in cur.fetchall():
            state["users"].append({
                "email": row[0],
                "password": row[1],
                "role": row[2],
                "name": row[3],
                "vendorId": row[4]
            })
        
        # Vendors
        cur.execute("SELECT id, name, category, gst, rep, email, rating, status, compliance FROM vendors ORDER BY id")
        for row in cur.fetchall():
            state["vendors"].append({
                "id": row[0],
                "name": row[1],
                "category": row[2],
                "gst": row[3],
                "rep": row[4],
                "email": row[5],
                "rating": float(row[6]) if row[6] is not None else None,
                "status": row[7],
                "compliance": row[8]
            })
            
        # RFQs
        cur.execute("SELECT id, title, category, item, qty, deadline, description, status, recommended_quote_id, date_created, manager_remarks FROM rfqs ORDER BY id")
        for row in cur.fetchall():
            rfq_id = row[0]
            # Invited vendors for this rfq
            cur.execute("SELECT vendor_id FROM rfq_invited_vendors WHERE rfq_id = ?", (rfq_id,))
            invited = [r[0] for r in cur.fetchall()]
            
            state["rfqs"].append({
                "id": rfq_id,
                "title": row[1],
                "category": row[2],
                "item": row[3],
                "qty": row[4],
                "deadline": str(row[5]),
                "description": row[6],
                "status": row[7],
                "invitedVendors": invited,
                "recommendedQuoteId": row[8],
                "dateCreated": str(row[9]),
                "managerRemarks": row[10]
            })
            
        # Quotes
        cur.execute("SELECT id, rfq_id, vendor_id, unit_price, lead_time, total_val, comments, date_submitted FROM quotes ORDER BY id")
        for row in cur.fetchall():
            state["quotes"].append({
                "id": row[0],
                "rfqId": row[1],
                "vendorId": row[2],
                "unitPrice": float(row[3]),
                "leadTime": row[4],
                "totalVal": float(row[5]),
                "comments": row[6],
                "dateSubmitted": str(row[7])
            })
            
        # Purchase Orders
        cur.execute("SELECT id, rfq_id, quote_id, vendor_id, subtotal, tax_val, total_val, date_created, status FROM purchase_orders ORDER BY id")
        for row in cur.fetchall():
            state["purchaseOrders"].append({
                "id": row[0],
                "rfqId": row[1],
                "quoteId": row[2],
                "vendorId": row[3],
                "subtotal": float(row[4]),
                "taxVal": float(row[5]),
                "totalVal": float(row[6]),
                "dateCreated": str(row[7]),
                "status": row[8]
            })
            
        # Invoices
        cur.execute("SELECT id, po_id, rfq_id, vendor_id, subtotal, tax_val, total_val, date_created, due_date, status FROM invoices ORDER BY id")
        for row in cur.fetchall():
            state["invoices"].append({
                "id": row[0],
                "poId": row[1],
                "rfqId": row[2],
                "vendorId": row[3],
                "subtotal": float(row[4]),
                "taxVal": float(row[5]),
                "totalVal": float(row[6]),
                "dateCreated": str(row[7]),
                "dueDate": str(row[8]),
                "status": row[9]
            })
            
        # Activities
        cur.execute("SELECT id, type, user_name, title, details, timestamp FROM activities ORDER BY id DESC")
        for row in cur.fetchall():
            state["activities"].append({
                "id": row[0],
                "type": row[1],
                "user": row[2],
                "title": row[3],
                "details": row[4],
                "timestamp": row[5]
            })
            
        # Notifications
        cur.execute("SELECT id, read, title, details, timestamp FROM notifications ORDER BY id DESC")
        for row in cur.fetchall():
            state["notifications"].append({
                "id": row[0],
                "read": bool(row[1]),
                "title": row[2],
                "details": row[3],
                "timestamp": row[4]
            })
    finally:
        conn.close()
        
    return state

def save_state_to_db(state):
    conn = get_db_connection()
    try:
        with conn:
            cur = conn.cursor()
            cur.execute("PRAGMA foreign_keys = OFF;")
            
            cur.execute("DELETE FROM rfq_invited_vendors")
            cur.execute("DELETE FROM quotes")
            cur.execute("DELETE FROM invoices")
            cur.execute("DELETE FROM purchase_orders")
            cur.execute("DELETE FROM rfqs")
            cur.execute("DELETE FROM vendors")
            cur.execute("DELETE FROM users")
            cur.execute("DELETE FROM activities")
            cur.execute("DELETE FROM notifications")
            
            cur.execute("PRAGMA foreign_keys = ON;")
            
            # Insert users
            for u in state.get('users', []):
                cur.execute(
                    "INSERT INTO users (email, password, role, name, vendor_id) VALUES (?, ?, ?, ?, ?)",
                    (u.get('email'), u.get('password'), u.get('role'), u.get('name'), u.get('vendorId'))
                )
            # Insert vendors
            for v in state.get('vendors', []):
                cur.execute(
                    "INSERT INTO vendors (id, name, category, gst, rep, email, rating, status, compliance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (v.get('id'), v.get('name'), v.get('category'), v.get('gst'), v.get('rep'), v.get('email'), v.get('rating'), v.get('status'), v.get('compliance'))
                )
            # Insert rfqs
            for r in state.get('rfqs', []):
                cur.execute(
                    "INSERT INTO rfqs (id, title, category, item, qty, deadline, description, status, recommended_quote_id, date_created, manager_remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (r.get('id'), r.get('title'), r.get('category'), r.get('item'), r.get('qty'), r.get('deadline'), r.get('description'), r.get('status'), r.get('recommendedQuoteId'), r.get('dateCreated'), r.get('managerRemarks'))
                )
                for vid in r.get('invitedVendors', []):
                    cur.execute(
                        "INSERT INTO rfq_invited_vendors (rfq_id, vendor_id) VALUES (?, ?)",
                        (r.get('id'), vid)
                    )
            # Insert quotes
            for q in state.get('quotes', []):
                cur.execute(
                    "INSERT INTO quotes (id, rfq_id, vendor_id, unit_price, lead_time, total_val, comments, date_submitted) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    (q.get('id'), q.get('rfqId'), q.get('vendorId'), q.get('unitPrice'), q.get('leadTime'), q.get('totalVal'), q.get('comments'), q.get('dateSubmitted'))
                )
            # Insert purchase orders
            for po in state.get('purchaseOrders', []):
                cur.execute(
                    "INSERT INTO purchase_orders (id, rfq_id, quote_id, vendor_id, subtotal, tax_val, total_val, date_created, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (po.get('id'), po.get('rfqId'), po.get('quoteId'), po.get('vendorId'), po.get('subtotal'), po.get('taxVal'), po.get('totalVal'), po.get('dateCreated'), po.get('status'))
                )
            # Insert invoices
            for inv in state.get('invoices', []):
                cur.execute(
                    "INSERT INTO invoices (id, po_id, rfq_id, vendor_id, subtotal, tax_val, total_val, date_created, due_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    (inv.get('id'), inv.get('poId'), inv.get('rfqId'), inv.get('vendorId'), inv.get('subtotal'), inv.get('taxVal'), inv.get('totalVal'), inv.get('dateCreated'), inv.get('dueDate'), inv.get('status'))
                )
            # Insert activities
            for act in state.get('activities', []):
                cur.execute(
                    "INSERT INTO activities (id, type, user_name, title, details, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
                    (act.get('id'), act.get('type'), act.get('user'), act.get('title'), act.get('details'), act.get('timestamp'))
                )
            # Insert notifications
            for note in state.get('notifications', []):
                cur.execute(
                    "INSERT INTO notifications (id, read, title, details, timestamp) VALUES (?, ?, ?, ?, ?)",
                    (note.get('id'), 1 if note.get('read') else 0, note.get('title'), note.get('details'), note.get('timestamp'))
                )
    finally:
        conn.close()
