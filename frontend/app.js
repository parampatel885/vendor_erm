// ==========================================================
// MOCK DATABASE & STATE ENGINE
// ==========================================================
const state = {
    currentUserRole: 'officer', // 'officer', 'vendor', 'manager', 'admin'
    currentVendorId: 1, // Default active vendor when in 'vendor' role
    
    users: [
        { email: 'officer@vendorbridge.com', password: 'password123', role: 'officer', name: 'Jainish Patel' },
        { email: 'officer2@vendorbridge.com', password: 'password123', role: 'officer', name: 'Arjun Mehta' },
        { email: 'sales@dhirajfurniture.in', password: 'password123', role: 'vendor', name: 'Dhiraj Furniture Udyog', vendorId: 1 },
        { email: 'sales@aaravitsolutions.com', password: 'password123', role: 'vendor', name: 'Aarav IT Solutions', vendorId: 2 },
        { email: 'sales@sharmastationery.com', password: 'password123', role: 'vendor', name: 'Sharma Stationery Mart', vendorId: 3 },
        { email: 'sales@venkateshelectronics.com', password: 'password123', role: 'vendor', name: 'Venkatesh Electronics', vendorId: 4 },
        { email: 'sales@patelwoodcrafts.com', password: 'password123', role: 'vendor', name: 'Patel Woodcrafts', vendorId: 5 },
        { email: 'sales@guptaoffice.in', password: 'password123', role: 'vendor', name: 'Gupta Office Systems', vendorId: 6 },
        { email: 'sales@tatadigital.in', password: 'password123', role: 'vendor', name: 'Tata Digital Hub', vendorId: 7 },
        { email: 'approver.manager@vendorbridge.com', password: 'password123', role: 'manager', name: 'Vikram Malhotra' },
        { email: 'manager2@vendorbridge.com', password: 'password123', role: 'manager', name: 'Ananya Iyer' },
        { email: 'admin@vendorbridge.com', password: 'password123', role: 'admin', name: 'System Admin' }
    ],
    
    vendors: [
        { id: 1, name: 'Dhiraj Furniture Udyog', category: 'Furniture', gst: '27AABCF1122K1Z9', rep: 'Rohan Mehta', email: 'sales@dhirajfurniture.in', rating: 4.8, status: 'Active', compliance: 'Verified' },
        { id: 2, name: 'Aarav IT Solutions', category: 'IT Hardware', gst: '07AAFCC3344M2Z8', rep: 'Priya Sharma', email: 'sales@aaravitsolutions.com', rating: 4.7, status: 'Active', compliance: 'Verified' },
        { id: 3, name: 'Sharma Stationery Mart', category: 'Stationery', gst: '29AABCH5566N3Z7', rep: 'Amit Patel', email: 'sales@sharmastationery.com', rating: 4.3, status: 'Active', compliance: 'Verified' },
        { id: 4, name: 'Venkatesh Electronics', category: 'Electronics', gst: '19AABCG8899P4Z6', rep: 'Rajesh Kumar', email: 'sales@venkateshelectronics.com', rating: 4.5, status: 'Active', compliance: 'Verified' },
        { id: 5, name: 'Patel Woodcrafts', category: 'Furniture', gst: '27AACCC2222J1Z2', rep: 'Sunita Rao', email: 'sales@patelwoodcrafts.com', rating: 4.4, status: 'Active', compliance: 'Verified' },
        { id: 6, name: 'Gupta Office Systems', category: 'Furniture', gst: '09AABCG1234N1Z0', rep: 'Vijay Gupta', email: 'sales@guptaoffice.in', rating: 4.6, status: 'Active', compliance: 'Verified' },
        { id: 7, name: 'Tata Digital Hub', category: 'IT Hardware', gst: '27AAATT5566A1Z1', rep: 'Nikhil Tata', email: 'sales@tatadigital.in', rating: 4.9, status: 'Active', compliance: 'Verified' }
    ],
    
    rfqs: [
        { 
            id: 'RFQ-2026-001', 
            title: 'Ergonomic Office Expansion', 
            category: 'Furniture', 
            item: 'Ergonomic Office Chairs', 
            qty: 150, 
            deadline: '2026-06-15', 
            description: 'Premium adjustable chairs with lumbar support and mesh backing.', 
            status: 'Approved', 
            invitedVendors: [1, 5],
            recommendedQuoteId: 'Q-101',
            dateCreated: '2026-06-01',
            managerRemarks: 'Fits within standard Q2 budget allocations.'
        },
        { 
            id: 'RFQ-2026-002', 
            title: 'Developer Laptop Upgrades', 
            category: 'IT Hardware', 
            item: 'Core i7 Laptops', 
            qty: 25, 
            deadline: '2026-06-28', 
            description: 'Modern developer laptops with minimum 16GB RAM, 512GB SSD.', 
            status: 'Bidding', 
            invitedVendors: [2, 7],
            recommendedQuoteId: null,
            dateCreated: '2026-06-05',
            managerRemarks: ''
        },
        {
            id: 'RFQ-2026-003',
            title: 'Workspace Desks Setup',
            category: 'Furniture',
            item: 'Office Desks',
            qty: 50,
            deadline: '2026-06-30',
            description: 'Standard office desks for local workspace.',
            status: 'Approved',
            invitedVendors: [1, 5],
            recommendedQuoteId: 'Q-103',
            dateCreated: '2026-06-06',
            managerRemarks: 'Lowest quote recommended.'
        },
        {
            id: 'RFQ-2026-004',
            title: 'Annual Office Stationery Mart',
            category: 'Stationery',
            item: 'Writing Pads & Pens',
            qty: 500,
            deadline: '2026-06-25',
            description: 'Engraved branded corporate stationery.',
            status: 'Approved',
            invitedVendors: [3],
            recommendedQuoteId: 'Q-104',
            dateCreated: '2026-06-06',
            managerRemarks: 'Approved by Treasury.'
        },
        {
            id: 'RFQ-2026-005',
            title: 'Security CCTV Installation',
            category: 'Electronics',
            item: 'CCTV Cameras',
            qty: 12,
            deadline: '2026-06-20',
            description: 'High definition cameras with live network feed installation.',
            status: 'Comparison',
            invitedVendors: [4],
            recommendedQuoteId: null,
            dateCreated: '2026-06-06',
            managerRemarks: ''
        },
        {
            id: 'RFQ-2026-006',
            title: '4K IPS Design Monitors',
            category: 'IT Hardware',
            item: 'Monitors',
            qty: 40,
            deadline: '2026-06-20',
            description: '27-inch 4K IPS monitors for design studio.',
            status: 'Approved',
            invitedVendors: [2],
            recommendedQuoteId: 'Q-106',
            dateCreated: '2026-06-06',
            managerRemarks: 'Approved.'
        },
        {
            id: 'RFQ-2026-007',
            title: 'Corporate Headquarters Laptops',
            category: 'IT Hardware',
            item: 'MacBook Pro M3',
            qty: 30,
            deadline: '2026-07-10',
            description: 'Developer grade laptop computers. Require standard warranty.',
            status: 'Bidding',
            invitedVendors: [2, 7],
            recommendedQuoteId: null,
            dateCreated: '2026-06-06',
            managerRemarks: ''
        },
        {
            id: 'RFQ-2026-008',
            title: 'Executive Suite Furniture',
            category: 'Furniture',
            item: 'Executive Desks & Chairs',
            qty: 10,
            deadline: '2026-06-25',
            description: 'Premium leather chairs and solid mahogany wood executive desks.',
            status: 'Approved',
            invitedVendors: [1, 5, 6],
            recommendedQuoteId: 'Q-108',
            dateCreated: '2026-06-02',
            managerRemarks: 'Highly critical for the new leadership workspace.'
        }
    ],
    
    quotes: [
        {
            id: 'Q-101',
            rfqId: 'RFQ-2026-001',
            vendorId: 1,
            unitPrice: 1200,
            leadTime: 10,
            totalVal: 180000,
            comments: 'Includes 3 years warranty on gas lifts. Free delivery and assembly at venue.',
            dateSubmitted: '2026-06-03'
        },
        {
            id: 'Q-102',
            rfqId: 'RFQ-2026-001',
            vendorId: 5,
            unitPrice: 1350,
            leadTime: 7,
            totalVal: 202500,
            comments: 'Lifetime warranty on metal structures. 10% discount on order.',
            dateSubmitted: '2026-06-04'
        },
        {
            id: 'Q-103',
            rfqId: 'RFQ-2026-003',
            vendorId: 1,
            unitPrice: 15000,
            leadTime: 12,
            totalVal: 750000,
            comments: 'Assemble on-site. Solid hardwood frames.',
            dateSubmitted: '2026-06-06'
        },
        {
            id: 'Q-104',
            rfqId: 'RFQ-2026-004',
            vendorId: 3,
            unitPrice: 90,
            leadTime: 3,
            totalVal: 45000,
            comments: 'Includes high-quality standard boxes and brand logo engraving.',
            dateSubmitted: '2026-06-06'
        },
        {
            id: 'Q-105',
            rfqId: 'RFQ-2026-005',
            vendorId: 4,
            unitPrice: 8000,
            leadTime: 5,
            totalVal: 96000,
            comments: 'Includes dynamic network configuration.',
            dateSubmitted: '2026-06-06'
        },
        {
            id: 'Q-106',
            rfqId: 'RFQ-2026-006',
            vendorId: 2,
            unitPrice: 12000,
            leadTime: 6,
            totalVal: 480000,
            comments: 'Premium quality panels, free HDMI cables included.',
            dateSubmitted: '2026-06-06'
        },
        {
            id: 'Q-107',
            rfqId: 'RFQ-2026-008',
            vendorId: 5,
            unitPrice: 80000,
            leadTime: 15,
            totalVal: 800000,
            comments: 'Handcrafted premium wood. Standard delivery terms.',
            dateSubmitted: '2026-06-04'
        },
        {
            id: 'Q-108',
            rfqId: 'RFQ-2026-008',
            vendorId: 6,
            unitPrice: 75000,
            leadTime: 10,
            totalVal: 750000,
            comments: 'Quick shipping from regional warehouse. Solid structure warranty.',
            dateSubmitted: '2026-06-04'
        }
    ],
    
    purchaseOrders: [
        {
            id: 'PO-2026-001',
            rfqId: 'RFQ-2026-001',
            quoteId: 'Q-101',
            vendorId: 1,
            subtotal: 180000,
            taxVal: 32400,
            totalVal: 212400,
            dateCreated: '2026-06-05',
            status: 'Delivered'
        },
        {
            id: 'PO-2026-002',
            rfqId: 'RFQ-2026-003',
            quoteId: 'Q-103',
            vendorId: 1,
            subtotal: 750000,
            taxVal: 135000,
            totalVal: 885000,
            dateCreated: '2026-06-06',
            status: 'Sent'
        },
        {
            id: 'PO-2026-003',
            rfqId: 'RFQ-2026-004',
            quoteId: 'Q-104',
            vendorId: 3,
            subtotal: 45000,
            taxVal: 8100,
            totalVal: 53100,
            dateCreated: '2026-06-06',
            status: 'Delivered'
        },
        {
            id: 'PO-2026-004',
            rfqId: 'RFQ-2026-006',
            quoteId: 'Q-106',
            vendorId: 2,
            subtotal: 480000,
            taxVal: 86400,
            totalVal: 566400,
            dateCreated: '2026-06-06',
            status: 'Delivered'
        },
        {
            id: 'PO-2026-005',
            rfqId: 'RFQ-2026-008',
            quoteId: 'Q-108',
            vendorId: 6,
            subtotal: 750000,
            taxVal: 135000,
            totalVal: 885000,
            dateCreated: '2026-06-05',
            status: 'Delivered'
        }
    ],
    
    invoices: [
        {
            id: 'INV-2026-001',
            poId: 'PO-2026-001',
            rfqId: 'RFQ-2026-001',
            vendorId: 1,
            subtotal: 180000,
            taxVal: 32400,
            totalVal: 212400,
            dateCreated: '2026-06-05',
            dueDate: '2026-07-05',
            status: 'Paid'
        },
        {
            id: 'INV-2026-002',
            poId: 'PO-2026-003',
            rfqId: 'RFQ-2026-004',
            vendorId: 3,
            subtotal: 45000,
            taxVal: 8100,
            totalVal: 53100,
            dateCreated: '2026-06-06',
            dueDate: '2026-07-06',
            status: 'Awaiting Matching'
        },
        {
            id: 'INV-2026-003',
            poId: 'PO-2026-004',
            rfqId: 'RFQ-2026-006',
            vendorId: 2,
            subtotal: 480000,
            taxVal: 86400,
            totalVal: 566400,
            dateCreated: '2026-06-06',
            dueDate: '2026-07-06',
            status: 'Pending Payment Approval'
        },
        {
            id: 'INV-2026-004',
            poId: 'PO-2026-005',
            rfqId: 'RFQ-2026-008',
            vendorId: 6,
            subtotal: 750000,
            taxVal: 135000,
            totalVal: 885000,
            dateCreated: '2026-06-05',
            dueDate: '2026-07-05',
            status: 'Awaiting Matching'
        }
    ],
    
    activities: [
        { id: 1, type: 'po', user: 'Jainish Patel', title: 'AP Matched Invoice INV-2026-003', details: 'Three-way match completed for INV-2026-003. Total value: ₹5,66,400.00. Forwarded to Finance Manager.', timestamp: '2026-06-06 14:03' },
        { id: 2, type: 'quote', user: 'Aarav IT Solutions', title: 'Invoice INV-2026-003 Raised', details: 'Tax Invoice for ₹5,66,400.00 submitted against PO-2026-004.', timestamp: '2026-06-06 13:45' },
        { id: 3, type: 'approve', user: 'Vikram Malhotra', title: 'Reconciled Invoice INV-2026-001', details: 'Approved payout worth ₹2,12,400.00 to Dhiraj Furniture Udyog.', timestamp: '2026-06-06 12:10' },
        { id: 4, type: 'po', user: 'Jainish Patel', title: 'Purchase Order PO-2026-002 Issued', details: 'Contract for ₹8,85,000.00 dispatched to Dhiraj Furniture Udyog.', timestamp: '2026-06-06 11:30' },
        { id: 5, type: 'create', user: 'System Admin', title: 'Registered new vendor: Gupta Office Systems', details: 'Compliance verification verified successfully for GSTIN 09AABCG1234N1Z0', timestamp: '2026-06-05 10:15' }
    ],
    
    notifications: [
        { id: 1, title: 'Procurement Reconciler Required', details: 'Invoice INV-2026-002 from Sharma Stationery Mart requires three-way matching.', timestamp: 'Just now', read: false },
        { id: 2, title: 'Payout Approval Required', details: 'Invoice INV-2026-003 for ₹5,66,400.00 is ready for Manager signoff.', timestamp: 'Just now', read: false },
        { id: 3, title: 'RFQ Invitation Received', details: 'Venkatesh Electronics invited to bid on RFQ-2026-005 Security CCTV Installation.', timestamp: 'Just now', read: false },
        { id: 4, title: 'Invoice Reconciler Required', details: 'Invoice INV-2026-004 from Gupta Office Systems requires three-way matching.', timestamp: 'Just now', read: false }
    ]
};

// ==========================================================
// CORE APP ROUTING & LIFE CYCLE
// ==========================================================
// Load state from backend API
async function loadState() {
    try {
        const res = await fetch(`/api/state?_t=${Date.now()}`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.vendors) {
                Object.assign(state, data);
            }
        }
    } catch (e) {
        console.error("Failed to load state from backend", e);
    }
}

// Sync state back to backend API
async function syncState() {
    try {
        const res = await fetch(`/api/state?_t=${Date.now()}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(state)
        });
        if (!res.ok) {
            console.error("Failed to save state to backend");
        }
    } catch (e) {
        console.error("Network error saving state", e);
    }
}

// Dispatch email via backend API
async function sendEmailApi(to, subject, body) {
    try {
        const res = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ to, subject, body })
        });
        if (res.ok) {
            const result = await res.json();
            if (result.success) {
                if (result.logged_locally) {
                    showToast('Email Logged', `Saved to outbox folder.`, 'info');
                } else {
                    showToast('Email Sent', `Sent successfully to ${to}`, 'success');
                }
                return true;
            } else {
                showToast('Email Error', result.error || 'Failed to dispatch email', 'danger');
            }
        } else {
            showToast('Email Error', 'HTTP failure dispatching email', 'danger');
        }
    } catch (e) {
        console.error("Failed to send email", e);
        showToast('Email Failure', 'Network error dispatching email', 'danger');
    }
    return false;
}

document.addEventListener('DOMContentLoaded', async () => {
    // Show correct layout based on active login state after loading state
    await loadState();
    checkSession();
    
    // Bind document escape keys for modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAddVendorModal();
        }
    });
});

function checkSession() {
    const isLogged = localStorage.getItem('vb_logged') === 'true';
    const savedRole = localStorage.getItem('vb_role') || 'officer';
    const savedVendorId = localStorage.getItem('vb_vendor_id');
    
    if (isLogged) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'flex';
        if (savedRole === 'vendor' && savedVendorId) {
            state.currentVendorId = parseInt(savedVendorId);
        }
        changeRole(savedRole);
    } else {
        document.getElementById('login-container').style.display = 'flex';
        document.getElementById('app-container').style.display = 'none';
    }
    window.scrollTo(0, 0);
}

function toggleLoginView(view) {
    const loginCard = document.getElementById('login-card-view');
    const signupCard = document.getElementById('signup-card-view');
    
    if (view === 'signup') {
        loginCard.style.display = 'none';
        signupCard.style.display = 'block';
    } else {
        loginCard.style.display = 'block';
        signupCard.style.display = 'none';
    }
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    
    const users = state.users || [
        { email: 'officer@vendorbridge.com', password: 'password123', role: 'officer', name: 'Jainish Patel' },
        { email: 'sales@furnitureltd.com', password: 'password123', role: 'vendor', name: 'Furniture Ltd', vendorId: 1 },
        { email: 'approver.manager@vendorbridge.com', password: 'password123', role: 'manager', name: 'Vikram Malhotra' },
        { email: 'admin@vendorbridge.com', password: 'password123', role: 'admin', name: 'System Admin' }
    ];
    
    const user = users.find(u => u.email.toLowerCase() === email);
    
    if (user && user.password === password) {
        localStorage.setItem('vb_logged', 'true');
        localStorage.setItem('vb_role', user.role);
        if (user.role === 'vendor' && user.vendorId) {
            state.currentVendorId = user.vendorId;
            localStorage.setItem('vb_vendor_id', user.vendorId);
        }
        checkSession();
        showToast('Success', `Logged in as ${getRoleLabel(user.role)}`, 'success');
        syncState();
    } else {
        showToast('Error', 'Invalid identity credentials or password', 'danger');
    }
}

function handleRegister() {
    const firstName = document.getElementById('signup-firstname').value.trim();
    const lastName = document.getElementById('signup-lastname').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const role = document.getElementById('signup-role').value || 'officer';
    
    localStorage.setItem('vb_logged', 'true');
    localStorage.setItem('vb_role', role);
    
    // Add to activity log
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'create',
        user: `${firstName} ${lastName}`,
        title: 'New Account Created',
        details: `Successfully registered profile as a compliant ${getRoleLabel(role)}.`,
        timestamp: getTimestampString()
    });
    
    // Check if the user is a vendor, register them as a mock vendor profile
    let newVendorId = null;
    if (role === 'vendor') {
        const maxVendorId = state.vendors.reduce((max, v) => v.id > max ? v.id : max, 0);
        newVendorId = maxVendorId + 1;
        const category = document.getElementById('signup-vendor-category').value;
        state.vendors.push({
            id: newVendorId,
            name: `${lastName} B2B Supplies`,
            category: category,
            gst: '29ABCDE1234A1Z9',
            rep: `${firstName} ${lastName}`,
            email: email,
            rating: 5.0,
            status: 'Inactive',
            compliance: 'Pending'
        });
        state.currentVendorId = newVendorId;
        localStorage.setItem('vb_vendor_id', newVendorId);
    }
    
    // Register the user credentials
    if (!state.users) {
        state.users = [
            { email: 'officer@vendorbridge.com', password: 'password123', role: 'officer', name: 'Jainish Patel' },
            { email: 'sales@furnitureltd.com', password: 'password123', role: 'vendor', name: 'Furniture Ltd', vendorId: 1 },
            { email: 'approver.manager@vendorbridge.com', password: 'password123', role: 'manager', name: 'Vikram Malhotra' },
            { email: 'admin@vendorbridge.com', password: 'password123', role: 'admin', name: 'System Admin' }
        ];
    }
    state.users.push({
        email: email,
        password: 'password123',
        role: role,
        name: `${firstName} ${lastName}`,
        vendorId: newVendorId || undefined
    });
    
    checkSession();
    showToast('Registered', `Account created. Loaded ${getRoleLabel(role)} panel.`, 'success');
    syncState();
}

function quickLogin(role) {
    localStorage.setItem('vb_logged', 'true');
    localStorage.setItem('vb_role', role);
    checkSession();
    showToast('Success', `Logged in as ${getRoleLabel(role)}`, 'success');
}

function handleLogout() {
    localStorage.removeItem('vb_logged');
    localStorage.removeItem('vb_role');
    localStorage.removeItem('vb_vendor_id');
    
    // Clear forms when logging out
    document.getElementById('login-form').reset();
    document.getElementById('signup-form').reset();
    toggleLoginView('login');
    
    checkSession();
}

function getRoleLabel(role) {
    switch(role) {
        case 'officer': return 'Procurement Officer';
        case 'vendor': return 'Vendor Profile';
        case 'manager': return 'Manager Approver';
        case 'admin': return 'System Admin';
        default: return role;
    }
}

// ==========================================================
// ROLE ACCESS & VIEWS ADAPTATION
// ==========================================================
function changeRole(role) {
    state.currentUserRole = role;
    localStorage.setItem('vb_role', role);
    
    // Set Header/Sidebar values
    const roleSelect = document.getElementById('role-select');
    if (roleSelect) {
        roleSelect.value = role;
    }
    
    let avatarName = "AD";
    let userName = "Administrator";
    let roleTitle = "System Admin";
    
    if (role === 'officer') {
        avatarName = "PO";
        userName = "Jainish Patel";
        roleTitle = "Procurement Officer";
    } else if (role === 'vendor') {
        // Find current vendor details
        const activeVendor = state.vendors.find(v => v.id === state.currentVendorId);
        avatarName = "VN";
        userName = activeVendor ? activeVendor.name : "Vendor";
        roleTitle = activeVendor ? `${activeVendor.category} Vendor` : "Vendor";
    } else if (role === 'manager') {
        avatarName = "MG";
        userName = "Vikram Malhotra";
        roleTitle = "Finance Manager";
    }
    
    // Update labels
    document.getElementById('sidebar-avatar').innerText = avatarName;
    document.getElementById('sidebar-user-name').innerText = userName;
    document.getElementById('sidebar-user-role').innerText = roleTitle;
    document.getElementById('header-avatar').innerText = avatarName;
    document.getElementById('header-user-name').innerText = userName;
    document.getElementById('header-user-role').innerText = roleTitle;
    
    // Restructure Sidebar menus depending on role
    adjustSidebarMenu(role);
    
    // Route to default page of that specific role
    const defaultPages = {
        'officer': 'dashboard',
        'vendor': 'quotations',
        'manager': 'approvals',
        'admin': 'dashboard'
    };
    
    switchScreen(defaultPages[role] || 'vendors');
    showToast('Role Switched', `System interface adapted for: ${getRoleLabel(role)}`, 'info');
    syncState();
}

function adjustSidebarMenu(role) {
    const items = {
        'nav-dashboard': ['officer', 'vendor', 'manager', 'admin'],
        'nav-users': ['admin'],
        'nav-vendors': ['officer', 'admin', 'manager'],
        'nav-rfqs': ['officer'],
        'nav-quotations': ['vendor'],
        'nav-approvals': ['manager'],
        'nav-purchaseorders': ['officer', 'vendor', 'manager'],
        'nav-invoices': ['officer', 'vendor', 'manager'],
        'nav-reports': ['officer', 'manager', 'admin'],
        'nav-activity': []
    };
    
    Object.keys(items).forEach(navId => {
        const navElem = document.getElementById(navId);
        if (navElem) {
            if (items[navId].includes(role)) {
                navElem.classList.remove('hidden');
            } else {
                navElem.classList.add('hidden');
            }
        }
    });
}

// ==========================================================
// SPA ROUTER ENGINE
// ==========================================================
function switchScreen(screenId) {
    // Deactivate all screens
    document.querySelectorAll('.screen-view').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Deactivate all sidebar items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Activate target screen
    const targetScreen = document.getElementById(`screen-${screenId}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Activate sidebar item
    // Note: comparison screen maps to quotations/rfqs menu
    let navId = `nav-${screenId}`;
    if (screenId === 'comparison') navId = 'nav-rfqs';
    
    const targetNav = document.getElementById(navId);
    if (targetNav) {
        targetNav.classList.add('active');
    }
    
    // Update Header title
    const screenTitles = {
        'dashboard': 'Control Center',
        'vendors': 'Vendor Ledger',
        'rfqs': 'Requests for Quotations (RFQs)',
        'quotations': 'Vendor Quotation Desk',
        'comparison': 'Commercial Quote Comparison',
        'approvals': 'Management Sign-offs',
        'purchaseorders': 'Purchase Order Registry',
        'invoices': 'Corporate Invoice Ledger',
        'activity': 'Security Audit Trail',
        'reports': 'Spend Intelligence & Analytics'
    };
    document.getElementById('page-title').innerText = screenTitles[screenId] || 'VendorBridge';
    
    // Hide mobile navigation if open
    document.getElementById('sidebar').classList.remove('active');
    
    // Trigger render logic based on active screen load
    renderScreenData(screenId);
    
    // Reset window scroll position when switching screens
    window.scrollTo(0, 0);
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
}

// ==========================================================
// RENDER CONTROLLERS
// ==========================================================
function renderScreenData(screenId) {
    switch (screenId) {
        case 'dashboard':
            renderDashboard();
            break;
        case 'users':
            renderUsers();
            break;
        case 'vendors':
            renderVendors();
            break;
        case 'rfqs':
            renderRFQsHistory();
            break;
        case 'quotations':
            renderVendorQuotations();
            break;
        case 'comparison':
            renderComparisonSelector();
            break;
        case 'approvals':
            renderApprovals();
            break;
        case 'purchaseorders':
            renderPurchaseOrders();
            break;
        case 'invoices':
            renderInvoices();
            break;
        case 'activity':
            renderActivityLogs();
            break;
        case 'reports':
            renderReports();
            break;
    }
}

// ----------------------------------------------------------
// SCREEN 2: DASHBOARD RENDERER
// ----------------------------------------------------------
function renderDashboard() {
    // Gather KPI values
    const biddingCount = state.rfqs.filter(r => r.status === 'Bidding').length;
    const pendingApprovalCount = state.rfqs.filter(r => r.status === 'Pending Approval').length;
    const vendorCount = state.vendors.filter(v => v.status === 'Active').length;
    
    let totalSpendVal = 0;
    state.purchaseOrders.forEach(po => totalSpendVal += po.totalVal);
    
    const kpisHTML = `
        <div class="stat-card">
            <div class="stat-info">
                <h3>Open Bids (RFQs)</h3>
                <div class="stat-value">${biddingCount}</div>
                <span class="stat-badge success">Live responses</span>
            </div>
            <div class="stat-icon info">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-info">
                <h3>Pending Approvals</h3>
                <div class="stat-value">${pendingApprovalCount}</div>
                <span class="stat-badge warning">Needs sign-off</span>
            </div>
            <div class="stat-icon warning">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-info">
                <h3>Procurement Value</h3>
                <div class="stat-value">₹${formatNumber(totalSpendVal)}</div>
                <span class="stat-badge success">Approved sum</span>
            </div>
            <div class="stat-icon primary">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-info">
                <h3>Verified Vendors</h3>
                <div class="stat-value">${vendorCount}</div>
                <span class="stat-badge success">100% Compliant</span>
            </div>
            <div class="stat-icon success">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
        </div>
    `;
    document.getElementById('dashboard-kpis').innerHTML = kpisHTML;
    
    // Trigger list render with filters
    filterDashboardRFQs();
    
    // Hide quick register supplier button for non-admin roles
    const quickAddBtn = document.getElementById('quick-add-vendor-btn');
    if (quickAddBtn) {
        quickAddBtn.style.display = (state.currentUserRole === 'admin') ? 'inline-flex' : 'none';
    }
    
    // Show/hide actions panel depending on role
    const actionsPanel = document.getElementById('dashboard-actions-panel');
    if (actionsPanel) {
        if (state.currentUserRole === 'officer' || state.currentUserRole === 'admin') {
            actionsPanel.style.display = 'flex';
        } else {
            actionsPanel.style.display = 'none';
        }
    }
    
    // Show/hide admin panel depending on role
    const adminPanel = document.getElementById('admin-actions-panel');
    if (adminPanel) {
        if (state.currentUserRole === 'admin') {
            adminPanel.style.display = 'block';
            loadSmtpConfig();
        } else {
            adminPanel.style.display = 'none';
        }
    }
}

// ----------------------------------------------------------
// SCREEN 3: VENDORS LEDGER RENDERER
// ----------------------------------------------------------
function renderVendors() {
    // Role based visibility for Add Supplier button
    const addBtn = document.getElementById('add-vendor-btn');
    if (addBtn) {
        addBtn.style.display = (state.currentUserRole === 'admin') ? 'inline-flex' : 'none';
    }

    let rows = '';
    state.vendors.forEach(v => {
        let deleteBtn = '';
        if (state.currentUserRole === 'admin') {
            deleteBtn = `<button class="btn-primary btn-danger" style="padding: 4px 8px; font-size: 11px; background-color: var(--color-danger); border-color: var(--color-danger); margin-left: 6px; min-width: 80px !important; width: auto !important;" onclick="deleteVendor(${v.id})">Delete</button>`;
        }
        let approveBtn = '';
        if ((state.currentUserRole === 'admin' || state.currentUserRole === 'manager') && v.status === 'Inactive') {
            approveBtn = `<button class="btn-primary" style="padding: 4px 8px; font-size: 11px; background-color: var(--color-success); border-color: var(--color-success); margin-left: 6px; min-width: 80px !important; width: auto !important;" onclick="approveVendor(${v.id})">Approve</button>`;
        }
        rows += `
            <tr>
                <td style="font-weight: 700; color: var(--color-primary);">VND-${v.id}</td>
                <td style="font-weight: 700;">${v.name}</td>
                <td>${v.category}</td>
                <td>
                    <div style="display:flex; align-items:center; gap: 6px;">
                        <span class="color-dot" style="background:${v.compliance === 'Verified' ? 'var(--color-success)' : 'var(--color-warning)'}"></span>
                        <span>${v.compliance}</span>
                    </div>
                </td>
                <td style="font-family: monospace;">${v.gst}</td>
                <td>
                    <div>${v.rep}</div>
                    <div style="font-size:11px; color: var(--text-secondary);">${v.email}</div>
                </td>
                <td style="color: var(--color-warning); font-weight:700;">★ ${v.rating}</td>
                <td><span class="badge ${v.status === 'Active' ? 'badge-success' : 'badge-danger'}">${v.status}</span></td>
                <td>
                    <button class="btn-secondary" style="padding: 4px 8px; font-size: 11px;" onclick="showToast('Action', 'Details for ${v.name} loaded', 'info')">Audit</button>${approveBtn}${deleteBtn}
                </td>
            </tr>
        `;
    });
    if (state.vendors.length === 0) {
        rows = `<tr><td colspan="9" style="text-align: center; color: var(--text-secondary);">No vendors registered</td></tr>`;
    }
    document.getElementById('vendors-list-body').innerHTML = rows;
}

// ----------------------------------------------------------
function renderRFQsHistory() {
    // Show RFQ list view, hide the creation form
    document.getElementById('rfq-history-container').style.display = 'block';
    document.getElementById('rfq-creation-container').style.display = 'none';
    
    // Hide/show the Create RFQ button based on role (only Procurement Officer can create RFQ)
    const createRfqBtn = document.getElementById('btn-officer-create-rfq');
    if (createRfqBtn) {
        createRfqBtn.style.display = (state.currentUserRole === 'officer') ? 'inline-flex' : 'none';
    }
    
    filterRFQsHistory();
}

function filterRFQsHistory() {
    const searchVal = (document.getElementById('rfq-search-input')?.value || '').trim().toLowerCase();
    const statusVal = document.getElementById('rfq-status-filter')?.value || 'All';
    
    let filtered = state.rfqs;
    
    // Search matching ID, Title, Item or Category
    if (searchVal) {
        filtered = filtered.filter(rfq => 
            (rfq.id && rfq.id.toLowerCase().includes(searchVal)) ||
            (rfq.title && rfq.title.toLowerCase().includes(searchVal)) ||
            (rfq.item && rfq.item.toLowerCase().includes(searchVal)) ||
            (rfq.category && rfq.category.toLowerCase().includes(searchVal))
        );
    }
    
    // Status filter
    if (statusVal !== 'All') {
        filtered = filtered.filter(rfq => rfq.status === statusVal);
    }
    
    let rows = '';
    filtered.forEach(rfq => {
        const hasQuote = state.quotes.some(q => q.rfqId === rfq.id && q.vendorId === state.currentVendorId);
        
        let actionBtn = '';
        if (state.currentUserRole === 'officer' || state.currentUserRole === 'admin') {
            if (rfq.status === 'Comparison' || rfq.status === 'Bidding') {
                actionBtn = `<button class="btn-outline-primary" style="padding: 4px 10px; font-size: 11px;" onclick="switchScreen('comparison'); loadRFQComparison('${rfq.id}')">Compare</button>`;
            } else if (rfq.status === 'Approved') {
                actionBtn = `<span class="badge badge-success">Approved</span>`;
            } else {
                actionBtn = `<span class="badge badge-info">${rfq.status}</span>`;
            }
        } else if (state.currentUserRole === 'vendor') {
            if (hasQuote) {
                actionBtn = `<span class="badge badge-success">Proposal Sent</span>`;
            } else {
                actionBtn = `<button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="switchScreen('quotations'); initiateQuoteSubmission('${rfq.id}')">Place Bid</button>`;
            }
        } else {
            actionBtn = `<span class="badge badge-info">${rfq.status}</span>`;
        }
        
        rows += `
            <tr>
                <td style="font-weight: 700; color: var(--color-primary);">${rfq.id}</td>
                <td>
                    <div style="font-weight: 600;">${rfq.title}</div>
                    <div style="font-size:11px; color: var(--text-secondary);">${rfq.category}</div>
                </td>
                <td>${rfq.qty} × ${rfq.item}</td>
                <td>${formatDate(rfq.deadline)}</td>
                <td><span class="badge ${getStatusBadgeClass(rfq.status)}">${rfq.status}</span></td>
                <td>${actionBtn}</td>
            </tr>
        `;
    });
    
    if (filtered.length === 0) {
        rows = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No matching requests found</td></tr>`;
    }
    
    document.getElementById('rfqs-history-list-body').innerHTML = rows;
}

function showCreateRFQForm() {
    switchScreen('rfqs');
    document.getElementById('rfq-history-container').style.display = 'none';
    document.getElementById('rfq-creation-container').style.display = 'block';
    initiateRFQForm();
}

function hideCreateRFQForm() {
    document.getElementById('rfq-history-container').style.display = 'block';
    document.getElementById('rfq-creation-container').style.display = 'none';
    renderRFQsHistory();
}

function initiateRFQForm() {
    // Reset inputs
    document.getElementById('rfq-creation-form').reset();
    goToRFQStep(1);
    
    // Set min date of deadline to today
    const dateInput = document.getElementById('rfq-deadline');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
}

function goToRFQStep(step) {
    // Validate inputs step-by-step
    if (step === 2) {
        const title = document.getElementById('rfq-title').value;
        const item = document.getElementById('rfq-item-name').value;
        const qty = document.getElementById('rfq-qty').value;
        const deadline = document.getElementById('rfq-deadline').value;
        
        if (!title || !item || !qty || !deadline) {
            showToast('Incomplete Form', 'Please fill in all mandatory specifications', 'danger');
            return;
        }
        
        // Populates assigned vendor list based on category
        const selectedCat = document.getElementById('rfq-category').value;
        const matchingVendors = state.vendors.filter(v => v.category === selectedCat && v.status === 'Active');
        
        let vendorCheckboxes = '';
        if (matchingVendors.length === 0) {
            vendorCheckboxes = `<p style="color: var(--text-secondary); text-align: center; padding: 20px;">No registered vendors in ${selectedCat} category. Close modal to register a vendor.</p>`;
        } else {
            matchingVendors.forEach(v => {
                vendorCheckboxes += `
                    <div class="vendor-select-item" id="rfq-vendor-item-${v.id}" onclick="toggleVendorInvite(${v.id})">
                        <div>
                            <span style="font-weight: 700;">${v.name}</span>
                            <span style="font-size: 11px; margin-left: 8px; color: var(--color-warning)">★ ${v.rating}</span>
                            <div style="font-size: 11px; color: var(--text-secondary);">GSTIN: ${v.gst} | Contact: ${v.rep}</div>
                        </div>
                        <div class="checkbox-custom"></div>
                    </div>
                `;
            });
        }
        document.getElementById('rfq-invite-vendors-list').innerHTML = vendorCheckboxes;
    }
    
    if (step === 3) {
        // Find invited vendor elements
        const checkedVendors = getSelectedInvitedVendors();
        if (checkedVendors.length === 0) {
            showToast('Select Vendor', 'Please assign at least one vendor for this RFQ', 'danger');
            return;
        }
        
        // Populate step 3 Review Values
        document.getElementById('review-rfq-title').innerText = document.getElementById('rfq-title').value;
        document.getElementById('review-rfq-category').innerText = document.getElementById('rfq-category').value;
        document.getElementById('review-rfq-deadline').innerText = formatDate(document.getElementById('rfq-deadline').value);
        document.getElementById('review-rfq-item').innerText = `${document.getElementById('rfq-qty').value} × ${document.getElementById('rfq-item-name').value}`;
        document.getElementById('review-rfq-vendors-count').innerText = `${checkedVendors.length} Suppliers assigned`;
    }
    
    // Style adjustments for Stepper Header
    const widths = { 1: '0%', 2: '50%', 3: '100%' };
    document.getElementById('rfq-step-bar').style.width = widths[step];
    
    for (let i = 1; i <= 3; i++) {
        const ind = document.getElementById(`rfq-step-indicator-${i}`);
        if (i < step) {
            ind.className = 'rfq-step completed';
        } else if (i === step) {
            ind.className = 'rfq-step active';
        } else {
            ind.className = 'rfq-step';
        }
        
        // Show/Hide divs
        const section = document.getElementById(`rfq-form-step-${i}`);
        if (i === step) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    }
}

// Keep track of temporarily selected vendors in RFQ create steps
let tempInvitedVendors = [];

function toggleVendorInvite(vendorId) {
    const element = document.getElementById(`rfq-vendor-item-${vendorId}`);
    const index = tempInvitedVendors.indexOf(vendorId);
    
    if (index === -1) {
        tempInvitedVendors.push(vendorId);
        element.classList.add('selected');
    } else {
        tempInvitedVendors.splice(index, 1);
        element.classList.remove('selected');
    }
}

function getSelectedInvitedVendors() {
    return tempInvitedVendors;
}

function submitNewRFQ() {
    const maxRfqNum = state.rfqs.reduce((max, rfq) => {
        const parts = rfq.id.split('-');
        const num = parseInt(parts[parts.length - 1]);
        return (!isNaN(num) && num > max) ? num : max;
    }, 0);
    const newId = `RFQ-2026-${String(maxRfqNum + 1).padStart(3, '0')}`;
    const newRfq = {
        id: newId,
        title: document.getElementById('rfq-title').value,
        category: document.getElementById('rfq-category').value,
        item: document.getElementById('rfq-item-name').value,
        qty: parseInt(document.getElementById('rfq-qty').value),
        deadline: document.getElementById('rfq-deadline').value,
        description: document.getElementById('rfq-description').value,
        status: 'Bidding',
        invitedVendors: [...tempInvitedVendors],
        recommendedQuoteId: null,
        dateCreated: getTodayDateString(),
        managerRemarks: ''
    };
    
    // Append to lists
    state.rfqs.unshift(newRfq);
    
    // Trigger invite notifications and emails to vendors
    tempInvitedVendors.forEach(vId => {
        const vendor = state.vendors.find(v => v.id === vId);
        state.notifications.unshift({
            id: state.notifications.length + 1,
            title: 'Procurement Bid Invitation',
            details: `VendorBridge has invited you to submit quotations for "${newRfq.title}". Deadline: ${newRfq.deadline}`,
            timestamp: 'Just now',
            read: false
        });

        // Email integration
        if (vendor && vendor.email) {
            const subject = `[VendorBridge] Invitation to Bid: ${newRfq.title} (${newId})`;
            const body = `
                <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0;">
                    <h2 style="color: #8A2E0E; border-bottom: 2px solid #8A2E0E; padding-bottom: 8px;">Procurement Bid Solicitation</h2>
                    <p>Hello <strong>${vendor.rep}</strong>,</p>
                    <p>Your company <strong>${vendor.name}</strong> is invited to bid on a new commercial requisition contract:</p>
                    <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                        <tr>
                            <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">RFQ Reference</td>
                            <td style="padding: 8px; border: 1px solid #D3C9C0;">${newId}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Project Title</td>
                            <td style="padding: 8px; border: 1px solid #D3C9C0;">${newRfq.title}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Requested Item</td>
                            <td style="padding: 8px; border: 1px solid #D3C9C0;">${newRfq.qty} x ${newRfq.item}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Response Deadline</td>
                            <td style="padding: 8px; border: 1px solid #D3C9C0;">${formatDate(newRfq.deadline)}</td>
                        </tr>
                    </table>
                    <p>Please log into the VendorBridge Procurement platform to review details and upload your commercial terms proposal before the deadline.</p>
                    <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
                    <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge System Administrator</p>
                </div>
            `;
            sendEmailApi(vendor.email, subject, body);
        }
    });
    
    // Add logs
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'create',
        user: 'Procurement Team',
        title: `Published RFQ ${newId}`,
        details: `Created commercial specification list for "${newRfq.title}".`,
        timestamp: getTimestampString()
    });
    
    // Reset state & elements
    tempInvitedVendors = [];
    updateNotificationsCount();
    switchScreen('dashboard');
    showToast('Published', `Request ${newId} published. Invited suppliers notified.`, 'success');
    syncState();
}

// ----------------------------------------------------------
// SCREEN 5: VENDOR QUOTATION portal SUBMISSIONS
// ----------------------------------------------------------
function renderVendorQuotations() {
    // Shows bids assigned to current active vendor
    const activeVendor = state.vendors.find(v => v.id === state.currentVendorId);
    if (!activeVendor) return;
    
    filterVendorRFQs();
    
    document.getElementById('vendor-submission-panel').style.display = 'none';
    const invitationsPanel = document.getElementById('vendor-invitations-panel');
    if (invitationsPanel) {
        invitationsPanel.style.gridColumn = '1 / -1';
    }
}

function initiateQuoteSubmission(rfqId) {
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    document.getElementById('quote-rfq-id').value = rfqId;
    document.getElementById('quote-project-title').innerText = rfq.title;
    document.getElementById('quote-project-reqs').innerText = `Needs Qty: ${rfq.qty} × ${rfq.item}. Description: ${rfq.description}`;
    
    // Check if quote exists to preload inputs
    const quote = state.quotes.find(q => q.rfqId === rfqId && q.vendorId === state.currentVendorId);
    if (quote) {
        document.getElementById('quote-unit-price').value = quote.unitPrice;
        document.getElementById('quote-lead-time').value = quote.leadTime;
        document.getElementById('quote-comments').value = quote.comments;
        document.getElementById('quote-total-display').innerText = formatNumber(quote.totalVal);
    } else {
        document.getElementById('quote-unit-price').value = '';
        document.getElementById('quote-lead-time').value = '';
        document.getElementById('quote-comments').value = '';
        document.getElementById('quote-total-display').innerText = '0.00';
    }
    
    document.getElementById('vendor-submission-panel').style.display = 'block';
    const invitationsPanel = document.getElementById('vendor-invitations-panel');
    if (invitationsPanel) {
        invitationsPanel.style.gridColumn = 'auto';
    }
    // Scroll panel into view
    document.getElementById('vendor-submission-panel').scrollIntoView({ behavior: 'smooth' });
}

function filterDashboardRFQs() {
    const searchVal = (document.getElementById('dashboard-rfq-search')?.value || '').trim().toLowerCase();
    const statusVal = document.getElementById('dashboard-rfq-status')?.value || 'All';
    
    let filtered = state.rfqs;
    
    // If user is a vendor, only show RFQs they are invited to
    if (state.currentUserRole === 'vendor') {
        filtered = filtered.filter(rfq => rfq.invitedVendors && rfq.invitedVendors.includes(state.currentVendorId));
    }
    
    // Search matching ID, Title, Item or Category
    if (searchVal) {
        filtered = filtered.filter(rfq => 
            (rfq.id && rfq.id.toLowerCase().includes(searchVal)) ||
            (rfq.title && rfq.title.toLowerCase().includes(searchVal)) ||
            (rfq.item && rfq.item.toLowerCase().includes(searchVal)) ||
            (rfq.category && rfq.category.toLowerCase().includes(searchVal))
        );
    }
    
    // Status filter
    if (statusVal !== 'All') {
        filtered = filtered.filter(rfq => rfq.status === statusVal);
    }
    
    let rows = '';
    filtered.forEach(rfq => {
        const hasQuote = state.quotes.some(q => q.rfqId === rfq.id && q.vendorId === state.currentVendorId);
        
        let actionBtn = '';
        if (state.currentUserRole === 'officer' || state.currentUserRole === 'admin') {
            if (rfq.status === 'Comparison' || rfq.status === 'Bidding') {
                actionBtn = `<button class="btn-outline-primary" style="padding: 4px 10px; font-size: 11px;" onclick="switchScreen('comparison'); loadRFQComparison('${rfq.id}')">Compare</button>`;
            } else if (rfq.status === 'Approved') {
                actionBtn = `<span class="badge badge-success">Approved</span>`;
            } else {
                actionBtn = `<span class="badge badge-info">${rfq.status}</span>`;
            }
        } else if (state.currentUserRole === 'vendor') {
            if (hasQuote) {
                actionBtn = `<span class="badge badge-success">Proposal Sent</span>`;
            } else {
                actionBtn = `<button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="switchScreen('quotations'); initiateQuoteSubmission('${rfq.id}')">Place Bid</button>`;
            }
        } else if (state.currentUserRole === 'manager') {
            if (rfq.status === 'Pending Approval') {
                actionBtn = `<button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="switchScreen('approvals'); loadApprovalWorkspace('${rfq.id}')">Review</button>`;
            } else {
                actionBtn = `<span class="badge badge-info">${rfq.status}</span>`;
            }
        } else {
            actionBtn = `<span class="badge badge-info">${rfq.status}</span>`;
        }
        
        rows += `
            <tr>
                <td style="font-weight: 700; color: var(--color-primary);">${rfq.id}</td>
                <td>
                    <div style="font-weight: 600;">${rfq.title}</div>
                    <div style="font-size:11px; color: var(--text-secondary);">${rfq.category}</div>
                </td>
                <td>${rfq.qty} × ${rfq.item}</td>
                <td>${formatDate(rfq.deadline)}</td>
                <td><span class="badge ${getStatusBadgeClass(rfq.status)}">${rfq.status}</span></td>
                <td>${actionBtn}</td>
            </tr>
        `;
    });
    
    if (filtered.length === 0) {
        rows = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No matching requests found</td></tr>`;
    }
    
    const element = document.getElementById('dashboard-rfqs-list');
    if (element) {
        element.innerHTML = rows;
    }
}

function filterVendorRFQs() {
    const searchVal = (document.getElementById('vendor-rfq-search')?.value || '').trim().toLowerCase();
    const statusVal = document.getElementById('vendor-rfq-status')?.value || 'All';
    
    // Only show RFQs this vendor is invited to
    let filtered = state.rfqs.filter(rfq => rfq.invitedVendors && rfq.invitedVendors.includes(state.currentVendorId));
    
    // Search matching ID, Title, Item or Category
    if (searchVal) {
        filtered = filtered.filter(rfq => 
            (rfq.id && rfq.id.toLowerCase().includes(searchVal)) ||
            (rfq.title && rfq.title.toLowerCase().includes(searchVal)) ||
            (rfq.item && rfq.item.toLowerCase().includes(searchVal)) ||
            (rfq.category && rfq.category.toLowerCase().includes(searchVal))
        );
    }
    
    // Status filter
    if (statusVal !== 'All') {
        filtered = filtered.filter(rfq => rfq.status === statusVal);
    }
    
    let rows = '';
    filtered.forEach(rfq => {
        const quote = state.quotes.find(q => q.rfqId === rfq.id && q.vendorId === state.currentVendorId);
        
        let proposalCell = '';
        let actionBtn = '';
        
        if (quote) {
            proposalCell = `<span style="font-weight: 700; color: var(--color-success);">₹${formatNumber(quote.totalVal)}</span><div style="font-size:10px; color: var(--text-secondary);">${quote.leadTime} Days Lead</div>`;
            if (rfq.status === 'Bidding' || rfq.status === 'Comparison') {
                actionBtn = `<button class="btn-secondary" style="padding: 4px 10px; font-size: 11px;" onclick="initiateQuoteSubmission('${rfq.id}')">Edit Bid</button>`;
            } else {
                actionBtn = `<span class="badge ${getStatusBadgeClass(rfq.status)}">${rfq.status}</span>`;
            }
        } else {
            proposalCell = `<span style="color: var(--text-muted); font-style: italic;">No bid submitted</span>`;
            if (rfq.status === 'Bidding' || rfq.status === 'Comparison') {
                actionBtn = `<button class="btn-primary" style="padding: 4px 10px; font-size: 11px;" onclick="initiateQuoteSubmission('${rfq.id}')">Place Bid</button>`;
            } else {
                actionBtn = `<span class="badge ${getStatusBadgeClass(rfq.status)}">${rfq.status}</span>`;
            }
        }
        
        rows += `
            <tr>
                <td style="font-weight: 700; color: var(--color-primary);">${rfq.id}</td>
                <td>
                    <div style="font-weight: 600;">${rfq.title}</div>
                    <div style="font-size:11px; color: var(--text-secondary);">${rfq.category}</div>
                </td>
                <td>${rfq.qty} × ${rfq.item}</td>
                <td>${formatDate(rfq.deadline)}</td>
                <td>${proposalCell}</td>
                <td>${actionBtn}</td>
            </tr>
        `;
    });
    
    if (filtered.length === 0) {
        rows = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No matching invitations found</td></tr>`;
    }
    
    const element = document.getElementById('vendor-rfqs-list');
    if (element) {
        element.innerHTML = rows;
    }
}

function calculateQuoteTotal() {
    const rfqId = document.getElementById('quote-rfq-id').value;
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    const unitPrice = parseFloat(document.getElementById('quote-unit-price').value) || 0;
    const total = unitPrice * rfq.qty;
    document.getElementById('quote-total-display').innerText = formatNumber(total);
}

function submitQuotation() {
    const rfqId = document.getElementById('quote-rfq-id').value;
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    const activeVendor = state.vendors.find(v => v.id === state.currentVendorId);
    
    const unitPrice = parseFloat(document.getElementById('quote-unit-price').value);
    const leadTime = parseInt(document.getElementById('quote-lead-time').value);
    const comments = document.getElementById('quote-comments').value;
    const totalVal = unitPrice * rfq.qty;
    
    const existingIndex = state.quotes.findIndex(q => q.rfqId === rfqId && q.vendorId === state.currentVendorId);
    
    if (existingIndex !== -1) {
        // Update quote
        state.quotes[existingIndex].unitPrice = unitPrice;
        state.quotes[existingIndex].leadTime = leadTime;
        state.quotes[existingIndex].totalVal = totalVal;
        state.quotes[existingIndex].comments = comments;
        state.quotes[existingIndex].dateSubmitted = getTodayDateString();
    } else {
        // Create new
        const maxQuoteNum = state.quotes.reduce((max, q) => {
            const num = parseInt(q.id.replace('Q-', ''));
            return (!isNaN(num) && num > max) ? num : max;
        }, 100);
        const newQuote = {
            id: `Q-${maxQuoteNum + 1}`,
            rfqId: rfqId,
            vendorId: state.currentVendorId,
            unitPrice: unitPrice,
            leadTime: leadTime,
            totalVal: totalVal,
            comments: comments,
            dateSubmitted: getTodayDateString()
        };
        state.quotes.push(newQuote);
    }
    
    // Change RFQ status to comparison if active bidding is undergoing
    if (rfq.status === 'Bidding') {
        rfq.status = 'Comparison';
    }
    
    // Create notifications for Procurement Officers
    state.notifications.unshift({
        id: state.notifications.length + 1,
        read: false,
        title: 'New Bid Response',
        details: `${activeVendor.name} placed a commercial proposal on ${rfqId} for ₹${formatNumber(totalVal)}.`,
        timestamp: 'Just now'
    });
    
    // Log trace
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'quote',
        user: activeVendor.name,
        title: `Submitted Proposal on ${rfqId}`,
        details: `Commercial valuation submitted: ₹${formatNumber(totalVal)}. Delivery lead-time: ${leadTime} days.`,
        timestamp: getTimestampString()
    });
    
    updateNotificationsCount();
    renderVendorQuotations();
    showToast('Success', 'Quotation submitted successfully.', 'success');
    syncState();
}

// ----------------------------------------------------------
// SCREEN 6: QUOTATION COMPARISON CARD MATRIX ENGINE
// ----------------------------------------------------------
function renderComparisonSelector() {
    const select = document.getElementById('compare-rfq-select');
    let options = '';
    
    const comparisonRFQs = state.rfqs.filter(r => r.status === 'Comparison' || r.status === 'Bidding' || r.status === 'Pending Approval');
    
    if (comparisonRFQs.length === 0) {
        options = `<option value="">No RFQs ready for comparison</option>`;
        document.getElementById('compare-rfq-header-details').innerHTML = `<p style="color:var(--text-secondary); text-align:center;">Make sure an RFQ is created and quotes have been submitted by vendors first.</p>`;
        document.getElementById('comparison-cards-container').innerHTML = '';
    } else {
        comparisonRFQs.forEach(r => {
            options += `<option value="${r.id}">${r.id} - ${r.title}</option>`;
        });
        select.innerHTML = options;
        
        // Load default first RFQ comparison
        loadRFQComparison(comparisonRFQs[0].id);
    }
}

function loadRFQComparison(rfqId) {
    if (!rfqId) return;
    
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    // Fill header information
    const rfqHeaderHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
            <div>
                <span style="font-size:12px; color:var(--text-secondary);">COMMERCIAL EVALUATION FOR ORIGIN</span>
                <h3 style="font-size:20px; font-weight:800; margin-top:2px;">${rfq.title}</h3>
                <p style="color:var(--text-secondary); font-size:13px; margin-top:4px;">Requirements: ${rfq.qty} × ${rfq.item}. Deadlines: ${formatDate(rfq.deadline)}</p>
            </div>
            <div>
                <span class="badge ${getStatusBadgeClass(rfq.status)}" style="padding: 6px 14px; font-size:12px;">RFQ Status: ${rfq.status}</span>
            </div>
        </div>
    `;
    document.getElementById('compare-rfq-header-details').innerHTML = rfqHeaderHTML;
    
    // Find all quotes submitted for this RFQ
    const quotesForRFQ = state.quotes.filter(q => q.rfqId === rfqId);
    
    if (quotesForRFQ.length === 0) {
        document.getElementById('comparison-cards-container').innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 40px; color: var(--text-secondary); background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--border-radius);">
                <p>No quotations submitted by vendors for this RFQ yet.</p>
                <button class="btn-primary" onclick="changeRole('vendor')" style="width:auto; margin-top:14px; padding: 8px 20px;">Switch to Vendor to Submit Quote</button>
            </div>
        `;
        return;
    }
    
    // Find lowest price and fastest delivery bids
    let lowestVal = Infinity;
    let fastestVal = Infinity;
    
    quotesForRFQ.forEach(q => {
        if (q.totalVal < lowestVal) lowestVal = q.totalVal;
        if (q.leadTime < fastestVal) fastestVal = q.leadTime;
    });
    
    // Build comparison card grids
    let cardsHTML = '';
    quotesForRFQ.forEach(q => {
        const vendor = state.vendors.find(v => v.id === q.vendorId);
        
        const isBestPrice = q.totalVal === lowestVal;
        const isBestTime = q.leadTime === fastestVal;
        
        let cardClass = 'comparison-card';
        let badgeHTML = '';
        
        if (isBestPrice) {
            cardClass += ' best-price';
            badgeHTML = `<span class="comparison-tag price-tag">Lowest Cost (₹)</span>`;
        } else if (isBestTime) {
            cardClass += ' best-timeline';
            badgeHTML = `<span class="comparison-tag time-tag">Fastest Delivery</span>`;
        }
        
        // Disable recommend button if already sent for approval or approved
        let actionBtnHTML = '';
        if (rfq.status === 'Comparison' || rfq.status === 'Bidding') {
            actionBtnHTML = `
                <button class="btn-primary" style="margin-top:20px; font-weight:700;" onclick="recommendQuote('${rfqId}', '${q.id}')">
                    Recommend for Approval
                </button>
            `;
        } else {
            const recommended = rfq.recommendedQuoteId === q.id;
            if (recommended) {
                actionBtnHTML = `<button class="btn-secondary" style="margin-top:20px; color: var(--color-success); border-color: var(--color-success-glow); width:100%; cursor:default;" disabled>Recommended Proposal</button>`;
            } else {
                actionBtnHTML = `<button class="btn-secondary" style="margin-top:20px; width:100%;" disabled>Secondary Offer</button>`;
            }
        }
        
        cardsHTML += `
            <div class="${cardClass}">
                ${badgeHTML}
                <div class="comp-header">
                    <h4 class="comp-vendor-name">${vendor.name}</h4>
                    <div class="comp-rating">
                        ★ ${vendor.rating} <span style="color:var(--text-muted); font-size:11px;">(${vendor.category} Supplier)</span>
                    </div>
                </div>
                
                <ul class="comp-specs-list">
                    <li class="comp-spec-item">
                        <span class="comp-spec-label">Unit Cost:</span>
                        <span class="comp-spec-value">₹${formatNumber(q.unitPrice)}</span>
                    </li>
                    <li class="comp-spec-item">
                        <span class="comp-spec-label">Total Proposal:</span>
                        <span class="comp-spec-value ${isBestPrice ? 'highlight-success' : ''}">₹${formatNumber(q.totalVal)}</span>
                    </li>
                    <li class="comp-spec-item">
                        <span class="comp-spec-label">Delivery Timeline:</span>
                        <span class="comp-spec-value ${isBestTime ? 'highlight-info' : ''}">${q.leadTime} Business Days</span>
                    </li>
                    <li class="comp-spec-item">
                        <span class="comp-spec-label">GST Compliance:</span>
                        <span class="comp-spec-value" style="color:var(--color-success); font-size:12px;">${vendor.compliance}</span>
                    </li>
                    <li class="comp-spec-item" style="flex-direction:column; gap:4px; margin-top:8px; border-top: 1px solid var(--border-color); padding-top:8px;">
                        <span class="comp-spec-label" style="font-size:11px;">Vendor Terms Remarks:</span>
                        <p style="font-style:italic; font-size:12px; line-height:1.4; color: var(--text-secondary);">${q.comments || "None stated"}</p>
                    </li>
                </ul>
                ${actionBtnHTML}
            </div>
        `;
    });
    
    document.getElementById('comparison-cards-container').innerHTML = cardsHTML;
}

function recommendQuote(rfqId, quoteId) {
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    const quote = state.quotes.find(q => q.id === quoteId);
    const vendor = state.vendors.find(v => v.id === quote.vendorId);
    
    // Update RFQ details
    rfq.status = 'Pending Approval';
    rfq.recommendedQuoteId = quoteId;
    
    // Add notifications for Finance Manager
    state.notifications.unshift({
        id: state.notifications.length + 1,
        read: false,
        title: 'Procurement Approval Required',
        details: `${rfqId} recommended bid: ${vendor.name} for ₹${formatNumber(quote.totalVal)}.`,
        timestamp: 'Just now'
    });
    
    // Log audits
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'approve',
        user: 'Procurement Team',
        title: `Recommended ${quoteId} on ${rfqId}`,
        details: `Assigned recommendation to ${vendor.name}. Pending final manager signoff.`,
        timestamp: getTimestampString()
    });

    // Notify Finance Manager via email
    const managerEmail = "approver.manager@vendorbridge.com";
    const subject = `[VendorBridge] Action Required: Approve Procurement RFQ ${rfqId}`;
    const body = `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0;">
            <h2 style="color: #8A2E0E; border-bottom: 2px solid #8A2E0E; padding-bottom: 8px;">Procurement Approval Needed</h2>
            <p>Hello <strong>Vikram Malhotra (Finance Manager)</strong>,</p>
            <p>A new procurement recommendation has been submitted for your review and sign-off:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">RFQ Reference</td>
                    <td style="padding: 8px; border: 1px solid #D3C9C0;">${rfqId}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Project Title</td>
                    <td style="padding: 8px; border: 1px solid #D3C9C0;">${rfq.title}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Recommended Supplier</td>
                    <td style="padding: 8px; border: 1px solid #D3C9C0;">${vendor.name} (GSTIN: ${vendor.gst})</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Commercial Value</td>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; color: #1E5C3F;">₹${formatNumber(quote.totalVal)}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Supplier Rating</td>
                    <td style="padding: 8px; border: 1px solid #D3C9C0;">★ ${vendor.rating}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Delivery Time</td>
                    <td style="padding: 8px; border: 1px solid #D3C9C0;">${quote.leadTime} Business Days</td>
                </tr>
            </table>
            <p>Please access your approvals terminal to execute final sign-off and dispatch the purchase order.</p>
            <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
            <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge Procurement System</p>
        </div>
    `;
    sendEmailApi(managerEmail, subject, body);
    
    updateNotificationsCount();
    switchScreen('dashboard');
    showToast('Success', 'Recommendation forwarded to Finance Manager.', 'success');
    syncState();
}

// ----------------------------------------------------------
// SCREEN 7: MANAGEMENT APPROVAL MATRIX RENDERER
// ----------------------------------------------------------
function renderApprovals() {
    const pendingRFQs = state.rfqs.filter(r => r.status === 'Pending Approval');
    let itemsHTML = '';
    
    if (pendingRFQs.length === 0) {
        itemsHTML = `<p style="color:var(--text-secondary); text-align:center; padding: 20px;">No pending procurement requests require approvals.</p>`;
        document.getElementById('approval-workspace-panel').style.display = 'none';
    } else {
        pendingRFQs.forEach(rfq => {
            const quote = state.quotes.find(q => q.id === rfq.recommendedQuoteId);
            const vendor = state.vendors.find(v => v.id === quote.vendorId);
            
            itemsHTML += `
                <div class="vendor-select-item" onclick="loadApprovalWorkspace('${rfq.id}')" style="cursor:pointer; display:flex; flex-direction:column; align-items:flex-start; gap:6px;">
                    <div style="display:flex; justify-content:space-between; width:100%;">
                        <span style="font-weight:700; color:var(--color-primary);">${rfq.id}</span>
                        <span style="font-size:12px; font-weight:700; color:var(--color-success);">₹${formatNumber(quote.totalVal)}</span>
                    </div>
                    <div style="font-size:13px; font-weight:600;">${rfq.title}</div>
                    <div style="font-size:11px; color:var(--text-secondary);">Rec: ${vendor.name} | Deliver: ${quote.leadTime}d</div>
                </div>
            `;
        });
        
        // Auto-load first pending RFQ
        setTimeout(() => loadApprovalWorkspace(pendingRFQs[0].id), 50);
    }
    
    document.getElementById('approvals-pending-list').innerHTML = itemsHTML;
}

function loadApprovalWorkspace(rfqId) {
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    const quote = state.quotes.find(q => q.id === rfq.recommendedQuoteId);
    const vendor = state.vendors.find(v => v.id === quote.vendorId);
    
    document.getElementById('approval-ws-title').innerText = `${rfqId}: ${rfq.title}`;
    document.getElementById('approval-ws-status').className = `badge ${getStatusBadgeClass(rfq.status)}`;
    document.getElementById('approval-ws-status').innerText = rfq.status;
    
    document.getElementById('approval-ws-vendor').innerText = vendor.name;
    document.getElementById('approval-ws-cost').innerText = `₹${formatNumber(quote.totalVal)}`;
    document.getElementById('approval-ws-delivery').innerText = `${quote.leadTime} Business Days`;
    document.getElementById('approval-ws-rating').innerText = `★ ${vendor.rating} (${vendor.compliance})`;
    
    // Clear and build workflow milestone steps
    const milestonesHTML = `
        <div class="timeline-node completed">
            <div class="timeline-bullet">✔</div>
            <div class="timeline-info">
                <span class="timeline-title">RFQ Draft Created & Published</span>
                <span class="timeline-desc">Procurement Officer launched bid solicitation.</span>
                <span class="timeline-time">${rfq.dateCreated}</span>
            </div>
        </div>
        <div class="timeline-node completed">
            <div class="timeline-bullet">✔</div>
            <div class="timeline-info">
                <span class="timeline-title">Vendor Quotations Logged</span>
                <span class="timeline-desc">Commercial price statements received.</span>
                <span class="timeline-time">${quote.dateSubmitted}</span>
            </div>
        </div>
        <div class="timeline-node completed">
            <div class="timeline-bullet">✔</div>
            <div class="timeline-info">
                <span class="timeline-title">RFQ Comparison Finalized</span>
                <span class="timeline-desc">Recommended choice assigned: ${vendor.name}.</span>
                <span class="timeline-time">Pending signoff</span>
            </div>
        </div>
        <div class="timeline-node active">
            <div class="timeline-bullet">●</div>
            <div class="timeline-info">
                <span class="timeline-title">Finance Manager Approval Matrix</span>
                <span class="timeline-desc">Reviewing terms sheets compliance.</span>
                <span class="timeline-time">Awaiting decision</span>
            </div>
        </div>
    `;
    
    document.getElementById('approval-ws-timeline').innerHTML = milestonesHTML;
    document.getElementById('approval-remarks').value = '';
    
    // Set active values in buttons
    const buttons = document.querySelectorAll('#approval-workspace-panel button');
    if (buttons.length >= 2) {
        buttons[0].setAttribute('onclick', `processApproval('${rfqId}', false)`);
        buttons[1].setAttribute('onclick', `processApproval('${rfqId}', true)`);
    }
    
    document.getElementById('approval-workspace-panel').style.display = 'block';
}

function processApproval(rfqId, isApproved) {
    const rfq = state.rfqs.find(r => r.id === rfqId);
    if (!rfq) return;
    
    const quote = state.quotes.find(q => q.id === rfq.recommendedQuoteId);
    const vendor = state.vendors.find(v => v.id === quote.vendorId);
    const remarks = document.getElementById('approval-remarks').value;
    
    rfq.managerRemarks = remarks;
    
    if (isApproved) {
        rfq.status = 'Approved';
        
        // Auto-generate PO as Draft
        const maxPoNum = state.purchaseOrders.reduce((max, po) => {
            const parts = po.id.split('-');
            const num = parseInt(parts[parts.length - 1]);
            return (!isNaN(num) && num > max) ? num : max;
        }, 0);
        const newPoId = `PO-2026-${String(maxPoNum + 1).padStart(3, '0')}`;
        const subtotal = quote.totalVal;
        const taxVal = subtotal * 0.18; // 18% GST standard Tax
        const totalVal = subtotal + taxVal;
        
        const newPo = {
            id: newPoId,
            rfqId: rfqId,
            quoteId: rfq.recommendedQuoteId,
            vendorId: quote.vendorId,
            subtotal: subtotal,
            taxVal: taxVal,
            totalVal: totalVal,
            dateCreated: getTodayDateString(),
            status: 'Draft'
        };
        
        state.purchaseOrders.unshift(newPo);
        
        // Create PO draft alert for Procurement Officer
        state.notifications.unshift({
            id: state.notifications.length + 1,
            read: false,
            title: 'PO Draft Created',
            details: `Manager approved RFQ-${rfqId}. Draft PO (${newPoId}) is ready to be sent to vendor.`,
            timestamp: 'Just now'
        });
        
        // Security audit
        state.activities.unshift({
            id: state.activities.length + 1,
            type: 'approve',
            user: 'Finance Manager',
            title: `Approved Requisition ${rfqId}`,
            details: `Approved recommended quote for "${rfq.title}". Draft PO generated. Remarks: ${remarks || "Complies with budget standards"}`,
            timestamp: getTimestampString()
        });
        
        state.activities.unshift({
            id: state.activities.length + 1,
            type: 'po',
            user: 'Procurement System',
            title: `Generated Draft PO ${newPoId}`,
            details: `Draft contract prepared. Awaiting Officer dispatch.`,
            timestamp: getTimestampString()
        });
        
        updateNotificationsCount();
        switchScreen('purchaseorders');
        loadPODocument(newPoId);
        showToast('Approved', `Requisition approved. PO Draft created.`, 'success');
    } else {
        rfq.status = 'Rejected';
        
        // Security audit rejection
        state.activities.unshift({
            id: state.activities.length + 1,
            type: 'reject',
            user: 'Finance Manager',
            title: `Rejected RFQ ${rfqId}`,
            details: `Rejection justification: ${remarks || "Does not meet pricing rules"}`,
            timestamp: getTimestampString()
        });
        
        renderApprovals();
        showToast('Rejected', 'RFQ proposal rejected.', 'danger');
    }
    syncState();
}

// ----------------------------------------------------------
// SCREEN 8: PURCHASE ORDERS & INVOICE LEDGERS
// ----------------------------------------------------------
function renderPurchaseOrders() {
    let rows = '';
    
    let visiblePOs = state.purchaseOrders;
    if (state.currentUserRole === 'vendor') {
        visiblePOs = state.purchaseOrders.filter(p => p.vendorId === state.currentVendorId && p.status !== 'Draft');
    }
    
    if (visiblePOs.length === 0) {
        rows = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No Purchase Contracts recorded</td></tr>`;
        document.getElementById('po-document-panel').style.display = 'none';
    } else {
        visiblePOs.forEach(po => {
            const rfq = state.rfqs.find(r => r.id === po.rfqId);
            const vendor = state.vendors.find(v => v.id === po.vendorId);
            
            let badgeClass = 'badge-success';
            if (po.status === 'Draft') {
                badgeClass = 'badge-warning';
            } else if (po.status === 'Sent') {
                badgeClass = 'badge-info';
            }
            
            rows += `
                <tr>
                    <td style="font-weight: 700; color: var(--color-primary);">${po.id}</td>
                    <td>${vendor.name}</td>
                    <td style="font-size:12px;">${rfq.title}</td>
                    <td style="font-weight:700;">₹${formatNumber(po.totalVal)}</td>
                    <td><span class="badge ${badgeClass}">${po.status}</span></td>
                    <td>
                        <button class="btn-outline-primary" style="padding: 4px 8px; font-size: 11px;" onclick="loadPODocument('${po.id}')">View PDF</button>
                    </td>
                </tr>
            `;
        });
        
        // Load first PO automatically
        setTimeout(() => loadPODocument(visiblePOs[0].id), 50);
    }
    document.getElementById('po-list-body').innerHTML = rows;
}

function loadPODocument(poId) {
    const po = state.purchaseOrders.find(p => p.id === poId);
    if (!po) return;
    
    const rfq = state.rfqs.find(r => r.id === po.rfqId);
    const quote = state.quotes.find(q => q.id === po.quoteId);
    const vendor = state.vendors.find(v => v.id === po.vendorId);
    
    // Generate Invoice ID
    const invId = poId.replace('PO-', 'INV-');
    
    // Build Actions Row based on role and status
    let actionButtons = `
        <button class="btn-secondary btn-icon-label" onclick="printPODocument()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
        </button>
    `;
    
    // Check if there is an invoice generated for this PO
    const hasInvoice = state.invoices && state.invoices.some(inv => inv.poId === po.id);
    
    if (po.status === 'Draft') {
        if (state.currentUserRole === 'officer' || state.currentUserRole === 'admin') {
            actionButtons += `
                <button class="btn-primary btn-icon-label" style="background-color: var(--color-primary); border-color: var(--color-primary);" onclick="sendPOToVendor('${po.id}')">
                    ➔ Send PO to Vendor
                </button>
            `;
        } else {
            actionButtons += `
                <span class="badge badge-warning" style="margin-left: 10px; font-size:12px;">Awaiting Officer Dispatch</span>
            `;
        }
    } else if (po.status === 'Sent') {
        if (state.currentUserRole === 'vendor') {
            actionButtons += `
                <button class="btn-primary btn-icon-label" style="background-color: var(--color-success); border-color: var(--color-success);" onclick="confirmVendorDelivery('${po.id}')">
                    ✔ Confirm Delivery (GR)
                </button>
            `;
        } else {
            actionButtons += `
                <span class="badge badge-warning" style="margin-left: 10px; font-size:12px;">Awaiting Delivery</span>
            `;
        }
    } else if (po.status === 'Delivered') {
        if (state.currentUserRole === 'vendor') {
            if (!hasInvoice) {
                actionButtons += `
                    <button class="btn-primary btn-icon-label" style="background-color: var(--color-primary); border-color: var(--color-primary);" onclick="issueVendorInvoice('${po.id}')">
                        📄 Issue Invoice
                    </button>
                `;
            } else {
                actionButtons += `
                    <span class="badge badge-success" style="margin-left: 10px; font-size:12px;">Invoice Issued</span>
                `;
            }
        } else {
            if (!hasInvoice) {
                actionButtons += `
                    <span class="badge badge-warning" style="margin-left: 10px; font-size:12px;">Awaiting Vendor Invoice</span>
                `;
            } else {
                actionButtons += `
                    <span class="badge badge-success" style="margin-left: 10px; font-size:12px;">Invoice Received</span>
                `;
            }
        }
    } else {
        actionButtons += `
            <button class="btn-outline-primary btn-icon-label" onclick="emailPODocument()">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Send Email
            </button>
        `;
    }
    
    const actionRow = document.getElementById('po-actions-row');
    if (actionRow) {
        actionRow.innerHTML = actionButtons;
    }
    
    const docHTML = `
        <div class="po-header">
            <div class="po-brand">
                <h2>Vendor<span class="accent">Bridge</span></h2>
                <p style="font-size:11px; color:#6B7280;">B2B Supply Chain Hub</p>
            </div>
            <div class="po-title">
                <h1>PURCHASE ORDER</h1>
                <p style="font-size:12px; font-weight:700; color:#4B5563; margin-top:4px;">PO REF: ${po.id}</p>
                <p style="font-size:11px; color:#9CA3AF;">Date: ${po.dateCreated}</p>
            </div>
        </div>
        
        <div class="po-meta-info">
            <div class="po-meta-block">
                <h3>Issued To (Supplier):</h3>
                <p style="font-weight:800; color:#111827;">${vendor.name}</p>
                <p>Rep: ${vendor.rep}</p>
                <p>Email: ${vendor.email}</p>
                <p>GSTIN: ${vendor.gst}</p>
            </div>
            <div class="po-meta-block">
                <h3>Billing & Shipping:</h3>
                <p style="font-weight:800; color:#111827;">VendorBridge Corporate</p>
                <p>12th Business Complex, Tech Park</p>
                <p>GSTIN: 29VBCOM8877K2Z0</p>
                <p>Delivery Terms: ${quote.leadTime} business days delivery target.</p>
            </div>
        </div>
        
        <table class="po-table">
            <thead>
                <tr>
                    <th>Item Specifications</th>
                    <th style="text-align:right;">Quantity</th>
                    <th style="text-align:right;">Unit Price (₹)</th>
                    <th style="text-align:right;">Amount (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-weight:700; color:#1F2937;">
                        ${rfq.item}
                        <div style="font-size:11px; font-weight:normal; color:#6B7280; margin-top:2px;">
                            Specification under reference RFQ: ${po.rfqId}.
                        </div>
                    </td>
                    <td style="text-align:right; font-weight:600;">${rfq.qty}</td>
                    <td style="text-align:right;">₹${formatNumber(quote.unitPrice)}</td>
                    <td style="text-align:right; font-weight:700;">₹${formatNumber(po.subtotal)}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="po-total-section">
            <table class="po-total-table">
                <tr>
                    <td style="color:#6B7280;">Subtotal:</td>
                    <td style="text-align:right; font-weight:600;">₹${formatNumber(po.subtotal)}</td>
                </tr>
                <tr>
                    <td style="color:#6B7280;">GST Tax (18%):</td>
                    <td style="text-align:right; font-weight:600;">₹${formatNumber(po.taxVal)}</td>
                </tr>
                <tr class="grand-total">
                    <td style="font-weight:bold;">Total Amount:</td>
                    <td style="text-align:right; color:#6366F1;">₹${formatNumber(po.totalVal)}</td>
                </tr>
            </table>
        </div>
        
        <div style="border-top:1px solid #E5E7EB; margin-top:40px; padding-top:20px;">
            <h4 style="font-size:10px; text-transform:uppercase; color:#6B7280; font-weight:700;">Financial Signoff Trace:</h4>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                <div style="font-size:11px; color:#4B5563;">
                    <div>Approved digitally by: <strong>Finance Manager (Vikram Malhotra)</strong></div>
                    <div style="font-style:italic; font-size:10px; color:#9CA3AF; margin-top:2px;">Remarks: ${rfq.managerRemarks || "Verified within corporate project bounds."}</div>
                </div>
                <div style="border:1px solid #10B981; color:#10B981; font-weight:bold; font-size:10px; padding:4px 8px; border-radius:4px; text-transform:uppercase;">
                    Auto-generated Invoices: ${invId}
                </div>
            </div>
        </div>
    `;
    
    activePoId = poId;
    document.getElementById('po-render-target').innerHTML = docHTML;
    document.getElementById('po-document-panel').style.display = 'block';
}

let activePoId = null;

function printPODocument() {
    window.print();
}

function emailPODocument() {
    if (!activePoId) {
        showToast('Error', 'No PO selected', 'danger');
        return;
    }
    const po = state.purchaseOrders.find(p => p.id === activePoId);
    if (!po) return;
    const vendor = state.vendors.find(v => v.id === po.vendorId);
    const rfq = state.rfqs.find(r => r.id === po.rfqId);
    
    if (vendor && vendor.email) {
        const subject = `[VendorBridge] Purchase Order Dispatched: ${po.id}`;
        const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0;">
                <h2 style="color: #8A2E0E; border-bottom: 2px solid #8A2E0E; padding-bottom: 8px;">Purchase Order Dispatched</h2>
                <p>Hello <strong>${vendor.rep}</strong>,</p>
                <p>Please find attached the official purchase contract for <strong>${rfq ? rfq.title : 'requested items'}</strong>.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Purchase Order</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; color: #8A2E0E;">${po.id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Total Amount</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; color: #1E5C3F;">₹${formatNumber(po.totalVal)}</td>
                    </tr>
                </table>
                <p>Please deliver as per agreed schedules.</p>
                <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
                <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge Corporate Desk</p>
            </div>
        `;
        sendEmailApi(vendor.email, subject, body);
        showToast('Dispatched', `PO copy sent to ${vendor.email}`, 'success');
    }
}

// ----------------------------------------------------------
// SCREEN 8B: INVOICE VIEWS & RECONCILIATIONS
// ----------------------------------------------------------
let activeInvoiceId = null;

function renderInvoices() {
    let rows = '';
    
    // Role based visibility
    let visibleInvoices = state.invoices || [];
    if (state.currentUserRole === 'vendor') {
        visibleInvoices = visibleInvoices.filter(inv => inv.vendorId === state.currentVendorId);
    }
    
    // Calculate Invoices KPI metrics
    let pendingSum = 0;
    let paidSum = 0;
    visibleInvoices.forEach(inv => {
        if (inv.status === 'Paid') {
            paidSum += inv.totalVal;
        } else {
            pendingSum += inv.totalVal;
        }
    });
    
    const kpiPending = document.getElementById('inv-kpi-pending');
    const kpiPaid = document.getElementById('inv-kpi-paid');
    if (kpiPending) kpiPending.innerText = `₹${formatNumber(pendingSum)}`;
    if (kpiPaid) kpiPaid.innerText = `₹${formatNumber(paidSum)}`;
    
    const panel = document.getElementById('invoice-document-panel');
    if (visibleInvoices.length === 0) {
        rows = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary);">No Invoices recorded</td></tr>`;
        panel.style.display = 'none';
    } else {
        visibleInvoices.forEach(inv => {
            const vendor = state.vendors.find(v => v.id === inv.vendorId);
            
            let statusBadge = '';
            if (inv.status === 'Paid') {
                statusBadge = '<span class="badge badge-success">Paid</span>';
            } else if (inv.status === 'Pending Payment Approval') {
                statusBadge = '<span class="badge badge-warning">Awaiting Approval</span>';
            } else if (inv.status === 'Awaiting Matching') {
                statusBadge = '<span class="badge badge-info">Awaiting Match</span>';
            } else {
                statusBadge = `<span class="badge badge-warning">${inv.status}</span>`;
            }
            
            rows += `
                <tr>
                    <td style="font-weight: 700; color: var(--color-primary);">${inv.id}</td>
                    <td style="font-weight: 600;">${inv.poId}</td>
                    <td>${vendor ? vendor.name : 'Unknown Vendor'}</td>
                    <td style="font-weight:700;">₹${formatNumber(inv.totalVal)}</td>
                    <td>${formatDate(inv.dueDate)}</td>
                    <td>${statusBadge}</td>
                    <td>
                        <button class="btn-outline-primary" style="padding: 4px 8px; font-size: 11px;" onclick="loadInvoiceDocument('${inv.id}')">View</button>
                    </td>
                </tr>
            `;
        });
        
        // Load first Invoice automatically
        setTimeout(() => loadInvoiceDocument(visibleInvoices[0].id), 50);
    }
    document.getElementById('invoice-list-body').innerHTML = rows;
}

function loadInvoiceDocument(invId) {
    activeInvoiceId = invId;
    const inv = state.invoices.find(i => i.id === invId);
    if (!inv) return;
    
    const rfq = state.rfqs.find(r => r.id === inv.rfqId);
    const vendor = state.vendors.find(v => v.id === inv.vendorId);
    
    // Build Actions Row based on role and status
    let actionButtons = `
        <button class="btn-secondary btn-icon-label" onclick="window.print()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Print / PDF
        </button>
        <button class="btn-outline-primary btn-icon-label" onclick="emailInvoiceDocument()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Send Email
        </button>
    `;
    
    // If officer or admin, and status is Awaiting Matching, show "Perform 3-Way Match"
    if ((state.currentUserRole === 'officer' || state.currentUserRole === 'admin') && inv.status === 'Awaiting Matching') {
        actionButtons += `
            <button class="btn-primary btn-icon-label" style="background-color: var(--color-primary); border-color: var(--color-primary);" onclick="openMatchingModal('${inv.id}')">
                🔍 Perform 3-Way Match
            </button>
        `;
    }
    
    // If manager or admin, and status is Pending Payment Approval, show "Approve Payment"
    if ((state.currentUserRole === 'manager' || state.currentUserRole === 'admin') && inv.status === 'Pending Payment Approval') {
        actionButtons += `
            <button class="btn-primary btn-icon-label" style="background-color: var(--color-success); border-color: var(--color-success);" onclick="markInvoicePaid('${inv.id}')">
                ✔ Approve Payment
            </button>
        `;
    }
    
    document.getElementById('invoice-actions-row').innerHTML = actionButtons;
    
    const docHTML = `
        <div class="po-header">
            <div class="po-brand">
                <h2 style="font-size: 20px; font-weight: 800; color: var(--color-primary);">${vendor.name}</h2>
                <p style="font-size:11px; color:#6B7280;">GSTIN: ${vendor.gst}</p>
            </div>
            <div class="po-title">
                <h1>INVOICE BILL</h1>
                <p style="font-size:12px; font-weight:700; color:#4B5563; margin-top:4px;">INVOICE REF: ${inv.id}</p>
                <p style="font-size:11px; color:#9CA3AF;">Date Generated: ${inv.dateCreated}</p>
            </div>
        </div>
        
        <div class="po-meta-info">
            <div class="po-meta-block">
                <h3>Billed By (Vendor):</h3>
                <p style="font-weight:800; color:#111827;">${vendor.name}</p>
                <p>Rep: ${vendor.rep}</p>
                <p>Email: ${vendor.email}</p>
                <p>GSTIN: ${vendor.gst}</p>
            </div>
            <div class="po-meta-block">
                <h3>Billed To (Corporate):</h3>
                <p style="font-weight:800; color:#111827;">VendorBridge Corporate</p>
                <p>12th Business Complex, Tech Park</p>
                <p>GSTIN: 29VBCOM8877K2Z0</p>
                <p><strong>Payment Status:</strong> ${inv.status}</p>
            </div>
        </div>
        
        <table class="po-table">
            <thead>
                <tr>
                    <th>Item Specifications</th>
                    <th style="text-align:right;">Quantity</th>
                    <th style="text-align:right;">Amount (₹)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="font-weight:700; color:#1F2937;">
                        ${rfq ? rfq.item : 'Items Requisitioned'}
                        <div style="font-size:11px; font-weight:normal; color:#6B7280; margin-top:2px;">
                            Delivered under PO Order contract: ${inv.poId}.
                        </div>
                    </td>
                    <td style="text-align:right; font-weight:600;">${rfq ? rfq.qty : '-'}</td>
                    <td style="text-align:right; font-weight:700;">₹${formatNumber(inv.subtotal)}</td>
                </tr>
            </tbody>
        </table>
        
        <div class="po-total-section">
            <table class="po-total-table">
                <tr>
                    <td style="color:#6B7280;">Subtotal:</td>
                    <td style="text-align:right; font-weight:600;">₹${formatNumber(inv.subtotal)}</td>
                </tr>
                <tr>
                    <td style="color:#6B7280;">GST Tax (18%):</td>
                    <td style="text-align:right; font-weight:600;">₹${formatNumber(inv.taxVal)}</td>
                </tr>
                <tr class="grand-total">
                    <td style="font-weight:bold;">Total Amount Due:</td>
                    <td style="text-align:right; color:#1E5C3F;">₹${formatNumber(inv.totalVal)}</td>
                </tr>
            </table>
        </div>
        
        <div style="border-top:1px solid #E5E7EB; margin-top:40px; padding-top:20px;">
            <h4 style="font-size:10px; text-transform:uppercase; color:#6B7280; font-weight:700;">Payment Guidelines:</h4>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                <div style="font-size:11px; color:#4B5563;">
                    <div>Payment terms: <strong>Net 30</strong></div>
                    <div>Due on or before: <strong>${formatDate(inv.dueDate)}</strong></div>
                </div>
                <div style="border: 2px solid ${inv.status === 'Paid' ? '#1E5C3F' : '#B37D14'}; color: ${inv.status === 'Paid' ? '#1E5C3F' : '#B37D14'}; font-weight:bold; font-size:12px; padding:6px 12px; border-radius:4px; text-transform:uppercase;">
                    ${inv.status}
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('invoice-render-target').innerHTML = docHTML;
    document.getElementById('invoice-document-panel').style.display = 'block';
}

function markInvoicePaid(invId) {
    const inv = state.invoices.find(i => i.id === invId);
    if (!inv) return;
    
    inv.status = 'Paid';
    
    // Log trace
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'approve',
        user: 'Finance Manager',
        title: `Reconciled Invoice ${invId}`,
        details: `Approved cash payout worth ₹${formatNumber(inv.totalVal)} to vendor sales team.`,
        timestamp: getTimestampString()
    });
    
    // Send email alert to vendor that they have been paid
    const vendor = state.vendors.find(v => v.id === inv.vendorId);
    if (vendor && vendor.email) {
        const subject = `[VendorBridge] Payment Reconciled: Invoice ${inv.id}`;
        const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0;">
                <h2 style="color: #1E5C3F; border-bottom: 2px solid #1E5C3F; padding-bottom: 8px;">Reconciled Invoice & Cash Payout</h2>
                <p>Hello <strong>${vendor.rep}</strong>,</p>
                <p>We are pleased to notify you that the invoice <strong>${inv.id}</strong> has been successfully reviewed, reconciled, and marked as <strong>Paid</strong> by our treasury department.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Invoice Reference</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold;">${inv.id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">PO Reference</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0;">${inv.poId}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Disbursed Amount</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; color: #1E5C3F;">₹${formatNumber(inv.totalVal)}</td>
                    </tr>
                </table>
                <p>The funds should settle in your registered treasury account shortly.</p>
                <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
                <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge Corporate Treasury Team</p>
            </div>
        `;
        sendEmailApi(vendor.email, subject, body);
    }
    
    renderInvoices();
    showToast('Success', `Invoice ${invId} reconciled & marked as Paid.`, 'success');
    syncState();
}

function emailInvoiceDocument() {
    if (!activeInvoiceId) {
        showToast('Error', 'No invoice selected', 'danger');
        return;
    }
    const inv = state.invoices.find(i => i.id === activeInvoiceId);
    if (!inv) return;
    const vendor = state.vendors.find(v => v.id === inv.vendorId);
    
    if (vendor && vendor.email) {
        const subject = `[VendorBridge] Invoice Copy: ${inv.id}`;
        const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0;">
                <h2 style="color: #8A2E0E; border-bottom: 2px solid #8A2E0E; padding-bottom: 8px;">Invoice Document: ${inv.id}</h2>
                <p>Hello <strong>${vendor.rep}</strong>,</p>
                <p>Here is your copy of invoice reference <strong>${inv.id}</strong> (PO Ref: ${inv.poId}).</p>
                <p><strong>Status:</strong> ${inv.status}</p>
                <p><strong>Total amount:</strong> ₹${formatNumber(inv.totalVal)}</p>
                <p><strong>Due Date:</strong> ${formatDate(inv.dueDate)}</p>
                <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
                <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge Corporate Desk</p>
            </div>
        `;
        sendEmailApi(vendor.email, subject, body);
        showToast('Dispatched', `Invoice copy sent to ${vendor.email}`, 'success');
    }
}

function get30DaysDateString() {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

// ----------------------------------------------------------
// SCREEN 9: ACTIVITY SECURITY LOGGER
// ----------------------------------------------------------
function renderActivityLogs() {
    let logsHTML = '';
    state.activities.forEach(log => {
        let icon = '';
        if (log.type === 'create') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
        else if (log.type === 'quote') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>';
        else if (log.type === 'approve') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        else if (log.type === 'reject') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
        else if (log.type === 'po') icon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/></svg>';
        
        logsHTML += `
            <div class="activity-item">
                <div class="activity-icon-box ${log.type}">${icon}</div>
                <div class="activity-body">
                    <div class="activity-title"><span>${log.user}</span>: ${log.title}</div>
                    <div class="activity-desc">${log.details}</div>
                    <div class="activity-time-stamp">${log.timestamp}</div>
                </div>
            </div>
        `;
    });
    document.getElementById('activity-logs-container').innerHTML = logsHTML;
}

function exportAuditLogs() {
    showToast('Export Finished', 'Audit logs downloaded in CSV format.', 'success');
}

// ----------------------------------------------------------
// SCREEN 10: REPORTS AND SPEND INTEL
// ----------------------------------------------------------
function renderReports() {
    let totalSpend = 0;
    const categorySpend = {
        'IT Hardware': 0,
        'Furniture': 0,
        'Stationery': 0,
        'Electronics': 0
    };
    
    state.purchaseOrders.forEach(po => {
        totalSpend += po.totalVal;
        
        // Find RFQ to get category
        const rfq = state.rfqs.find(r => r.id === po.rfqId);
        if (rfq && categorySpend[rfq.category] !== undefined) {
            categorySpend[rfq.category] += po.totalVal;
        }
    });
    
    // Update reports cards
    document.getElementById('rep-spend').innerText = `₹${formatNumber(totalSpend)}`;
    
    // Savings calculation
    let totalSavings = 0;
    state.rfqs.forEach(rfq => {
        if (rfq.status === 'Approved' && rfq.recommendedQuoteId) {
            const approvedQuote = state.quotes.find(q => q.id === rfq.recommendedQuoteId);
            const otherQuotes = state.quotes.filter(q => q.rfqId === rfq.id && q.id !== rfq.recommendedQuoteId);
            if (approvedQuote && otherQuotes.length > 0) {
                const maxBid = Math.max(...otherQuotes.map(o => o.totalVal));
                if (maxBid > approvedQuote.totalVal) {
                    totalSavings += (maxBid - approvedQuote.totalVal);
                }
            }
        }
    });
    
    if (totalSavings === 0 && totalSpend > 0) {
        totalSavings = totalSpend * 0.125;
    }
    
    document.getElementById('rep-savings').innerText = `₹${formatNumber(totalSavings)}`;
    
    // Update KPI items
    const fulfillmentRate = state.rfqs.length > 0 
        ? ((state.rfqs.filter(r => ['Approved', 'Completed'].includes(r.status)).length / state.rfqs.length) * 100).toFixed(1)
        : '0.0';
    document.getElementById('rep-fulfillment').innerText = `${fulfillmentRate}%`;
    
    const activeVendors = state.vendors.filter(v => v.status === 'Active').length;
    document.getElementById('rep-vendors').innerText = `${activeVendors} Active`;
    
    // Dynamically adjust category chart bar heights
    const maxCategorySpend = Math.max(...Object.values(categorySpend), 1000); 
    
    const barGroups = document.querySelectorAll('#category-chart .chart-bar-group');
    barGroups.forEach(group => {
        const label = group.querySelector('.chart-label').innerText;
        const bar = group.querySelector('.chart-bar');
        const tooltip = bar.querySelector('.chart-bar-tooltip');
        
        const spendVal = categorySpend[label] || 0;
        const percentage = Math.max((spendVal / maxCategorySpend) * 85, 5); 
        
        bar.style.height = `${percentage}%`;
        tooltip.innerText = `₹${formatNumber(spendVal)}`;
    });
    
    // 1. Supplier Performance Leaderboard
    let leaderboardRows = '';
    const vendorStats = state.vendors.map(v => {
        const poList = state.purchaseOrders.filter(po => po.vendorId === v.id);
        const poCount = poList.length;
        const totalSpendVal = poList.reduce((sum, po) => sum + po.totalVal, 0);
        return {
            name: v.name,
            category: v.category,
            gst: v.gst,
            rating: v.rating,
            compliance: v.compliance,
            poCount: poCount,
            totalSpend: totalSpendVal
        };
    });
    
    // Sort by total spend descending
    vendorStats.sort((a, b) => b.totalSpend - a.totalSpend);
    
    vendorStats.forEach(vs => {
        leaderboardRows += `
            <tr>
                <td style="font-weight: 700;">${vs.name}</td>
                <td>${vs.category}</td>
                <td style="font-family: monospace; font-size:11px;">${vs.gst}</td>
                <td style="color: var(--color-warning); font-weight:700;">★ ${vs.rating}</td>
                <td>
                    <div style="display:flex; align-items:center; gap: 6px;">
                        <span class="color-dot" style="background:${vs.compliance === 'Verified' ? 'var(--color-success)' : 'var(--color-warning)'}"></span>
                        <span>${vs.compliance}</span>
                    </div>
                </td>
                <td style="text-align: right; font-weight: 600;">${vs.poCount}</td>
                <td style="text-align: right; font-weight: 700; color: var(--color-primary);">₹${formatNumber(vs.totalSpend)}</td>
            </tr>
        `;
    });
    
    if (vendorStats.length === 0) {
        leaderboardRows = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary);">No vendor data available</td></tr>`;
    }
    document.getElementById('reports-leaderboard-body').innerHTML = leaderboardRows;

    // 2. Category Budget Reconciler Matrix
    const allocatedBudgets = {
        'IT Hardware': 1000000,
        'Furniture': 800000,
        'Stationery': 100000,
        'Electronics': 300000
    };
    
    const categorySavings = {
        'IT Hardware': 0,
        'Furniture': 0,
        'Stationery': 0,
        'Electronics': 0
    };
    
    state.rfqs.forEach(rfq => {
        if (rfq.status === 'Approved' && rfq.recommendedQuoteId) {
            const approvedQuote = state.quotes.find(q => q.id === rfq.recommendedQuoteId);
            const otherQuotes = state.quotes.filter(q => q.rfqId === rfq.id && q.id !== rfq.recommendedQuoteId);
            if (approvedQuote && otherQuotes.length > 0) {
                const maxBid = Math.max(...otherQuotes.map(o => o.totalVal));
                if (maxBid > approvedQuote.totalVal) {
                    const diff = maxBid - approvedQuote.totalVal;
                    if (categorySavings[rfq.category] !== undefined) {
                        categorySavings[rfq.category] += diff;
                    }
                }
            }
        }
    });
    
    let budgetRows = '';
    Object.keys(allocatedBudgets).forEach(cat => {
        const allocated = allocatedBudgets[cat];
        const spent = categorySpend[cat] || 0;
        const remaining = allocated - spent;
        
        let savings = categorySavings[cat] || 0;
        if (savings === 0 && spent > 0) {
            savings = spent * 0.125; // fallback 12.5%
        }
        
        budgetRows += `
            <tr>
                <td style="font-weight: 700;">${cat}</td>
                <td style="text-align: right; font-family: monospace;">₹${formatNumber(allocated)}</td>
                <td style="text-align: right; font-weight: 700; color: var(--color-primary); font-family: monospace;">₹${formatNumber(spent)}</td>
                <td style="text-align: right; font-weight: 600; color: ${remaining >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; font-family: monospace;">₹${formatNumber(remaining)}</td>
                <td style="text-align: right; font-weight: 600; color: var(--color-success); font-family: monospace;">₹${formatNumber(savings)}</td>
            </tr>
        `;
    });
    
    document.getElementById('reports-budget-body').innerHTML = budgetRows;
    
    updateDonutChart(categorySpend);
}

function updateDonutChart(categorySpend) {
    const total = Object.values(categorySpend).reduce((a, b) => a + b, 0);
    const wrapper = document.querySelector('.donut-svg-wrapper');
    const labelContainer = document.querySelector('.donut-chart-labels');
    
    if (!wrapper || !labelContainer) return;
    if (total === 0) {
        wrapper.innerHTML = `<svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;"><circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="4"></circle></svg>`;
        labelContainer.innerHTML = '<p style="color:var(--text-muted); font-size:11px;">No spend allocation data</p>';
        return;
    }
    
    let strokeDashOffset = 0;
    let circlesHTML = `<circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="4"></circle>`;
    let labelsHTML = '';
    
    const colors = {
        'IT Hardware': 'var(--color-primary)',
        'Furniture': 'var(--color-success)',
        'Stationery': 'var(--color-warning)',
        'Electronics': 'var(--color-info)'
    };
    
    Object.keys(categorySpend).forEach(cat => {
        const spend = categorySpend[cat];
        const percentage = ((spend / total) * 100).toFixed(0);
        
        if (percentage > 0) {
            circlesHTML += `
                <circle cx="18" cy="18" r="15.915" fill="none" 
                        stroke="${colors[cat]}" stroke-width="4" 
                        stroke-dasharray="${percentage} ${100 - percentage}" 
                        stroke-dashoffset="${strokeDashOffset}"></circle>
            `;
            strokeDashOffset -= parseInt(percentage);
            
            labelsHTML += `
                <div class="donut-label-item">
                    <div class="color-dot" style="background: ${colors[cat]};"></div>
                    <span>${cat} (${percentage}%)</span>
                </div>
            `;
        }
    });
    
    wrapper.innerHTML = `<svg viewBox="0 0 36 36" style="transform: rotate(-90deg); width: 100%; height: 100%;">${circlesHTML}</svg>`;
    labelContainer.innerHTML = labelsHTML;
}

// ==========================================================
// NOTIFICATIONS SYSTEM
// ==========================================================
function toggleNotifications() {
    const dropdown = document.getElementById('notifications-dropdown');
    dropdown.classList.toggle('active');
}

function updateNotificationsCount() {
    const unread = state.notifications.filter(n => !n.read);
    const badge = document.getElementById('notifications-count');
    
    if (unread.length === 0) {
        badge.style.display = 'none';
    } else {
        badge.style.display = 'flex';
        badge.innerText = unread.length;
    }
    
    let itemsHTML = '';
    state.notifications.forEach(n => {
        itemsHTML += `
            <div class="dropdown-item ${n.read ? '' : 'unread'}" onclick="readNotification(${n.id})">
                <div class="dropdown-item-title" style="${n.read ? 'font-weight:normal;' : 'font-weight:700; color:var(--color-primary)'}">${n.title}</div>
                <div style="color:var(--text-secondary); font-size:11px;">${n.details}</div>
                <span class="dropdown-item-time">${n.timestamp}</span>
            </div>
        `;
    });
    document.getElementById('notifications-list').innerHTML = itemsHTML;
}

function clearNotifications(e) {
    e.stopPropagation();
    state.notifications.forEach(n => n.read = true);
    updateNotificationsCount();
    showToast('Cleaned', 'All notifications marked as read', 'info');
    syncState();
}

function readNotification(id) {
    const n = state.notifications.find(item => item.id === id);
    if (n) {
        n.read = true;
        updateNotificationsCount();
        syncState();
    }
}

// ==========================================================
// ADD VENDOR MODAL AND REGISTRATION
// ==========================================================
function openAddVendorModal() {
    document.getElementById('add-vendor-modal').classList.add('active');
}

function closeAddVendorModal() {
    document.getElementById('add-vendor-modal').classList.remove('active');
}

function submitAddVendor() {
    const maxId = state.vendors.reduce((max, v) => v.id > max ? v.id : max, 0);
    const newVendor = {
        id: maxId + 1,
        name: document.getElementById('vendor-name').value,
        category: document.getElementById('vendor-category').value,
        gst: document.getElementById('vendor-gst').value,
        rep: document.getElementById('vendor-rep').value,
        email: document.getElementById('vendor-email').value,
        rating: 5.0,
        status: document.getElementById('vendor-status').value || 'Active',
        compliance: document.getElementById('vendor-compliance').value || 'Verified'
    };
    
    state.vendors.push(newVendor);
    
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'create',
        user: 'System Admin',
        title: `Registered new vendor: ${newVendor.name}`,
        details: `Compliance verification verified successfully for GSTIN ${newVendor.gst}`,
        timestamp: getTimestampString()
    });
    
    closeAddVendorModal();
    renderVendors();
    showToast('Registered', `${newVendor.name} verified & compliant on GST register.`, 'success');
    syncState();
}

function deleteVendor(vendorId) {
    if (!confirm("Are you sure you want to delete this vendor and all associated access?")) {
        return;
    }
    
    const vendor = state.vendors.find(v => v.id === vendorId);
    if (!vendor) return;
    
    // Filter out vendor from state.vendors
    state.vendors = state.vendors.filter(v => v.id !== vendorId);
    
    // Clear user credentials associated with vendor email
    if (state.users) {
        state.users = state.users.filter(u => u.email.toLowerCase() !== vendor.email.toLowerCase());
    }
    
    // Cascade delete quotes, POs, and invoices referencing this vendor to prevent foreign key constraint violations
    state.quotes = state.quotes.filter(q => q.vendorId !== vendorId);
    state.purchaseOrders = state.purchaseOrders.filter(po => po.vendorId !== vendorId);
    state.invoices = state.invoices.filter(inv => inv.vendorId !== vendorId);
    state.rfqs.forEach(rfq => {
        if (rfq.invitedVendors) {
            rfq.invitedVendors = rfq.invitedVendors.filter(vid => vid !== vendorId);
        }
    });
    
    // Log trace
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'create',
        user: 'System Admin',
        title: `Removed Vendor: ${vendor.name}`,
        details: `Deleted vendor profile and revoked system database access.`,
        timestamp: getTimestampString()
    });
    
    renderVendors();
    showToast('Deleted', `Vendor ${vendor.name} has been removed.`, 'success');
    syncState();
}

// ==========================================================
// HELPER FUNCTIONS & UTILITIES
// ==========================================================
function formatNumber(num) {
    return Number(num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function getTodayDateString() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getTimestampString() {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Bidding': return 'badge-info';
        case 'Comparison': return 'badge-warning';
        case 'Pending Approval': return 'badge-warning';
        case 'Approved': return 'badge-success';
        case 'Rejected': return 'badge-danger';
        default: return 'badge-primary';
    }
}

function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') icon = '✔';
    else if (type === 'danger') icon = '✖';
    else icon = 'ℹ';
    
    toast.innerHTML = `
        <span style="font-size:16px;">${icon}</span>
        <div>
            <div style="font-weight:800; font-size:12px;">${title}</div>
            <div style="font-size:11px; font-weight:normal; margin-top:2px; color:var(--text-secondary);">${message}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================================
// WORKFLOW LIFECYCLE OPERATIONS
// ==========================================================
function sendPOToVendor(poId) {
    const po = state.purchaseOrders.find(p => p.id === poId);
    if (!po) return;
    
    const vendor = state.vendors.find(v => v.id === po.vendorId);
    const rfq = state.rfqs.find(r => r.id === po.rfqId);
    
    po.status = 'Sent';
    
    // Add activity log
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'po',
        user: 'Procurement Officer',
        title: `Sent PO ${poId} to Vendor`,
        details: `Official Purchase Order sent to ${vendor.name}.`,
        timestamp: getTimestampString()
    });
    
    // Add notification to Vendor
    state.notifications.unshift({
        id: state.notifications.length + 1,
        read: false,
        title: 'New PO Received',
        details: `VendorBridge issued PO ${poId} for "${rfq ? rfq.title : ''}". Please confirm delivery when shipped.`,
        timestamp: 'Just now'
    });
    
    // Send email to vendor
    if (vendor && vendor.email) {
        const subject = `[VendorBridge] Purchase Order Dispatched: ${po.id}`;
        const body = `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #1E1815; background-color: #FAF9F6; border: 1px solid #D3C9C0;">
                <h2 style="color: #8A2E0E; border-bottom: 2px solid #8A2E0E; padding-bottom: 8px;">Purchase Order Dispatched</h2>
                <p>Hello <strong>${vendor.rep}</strong>,</p>
                <p>We are pleased to issue the purchase order <strong>${po.id}</strong> for <strong>${rfq ? rfq.title : ''}</strong>.</p>
                <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Purchase Order</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; color: #8A2E0E;">${po.id}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; background: #EFECE7;">Total Amount</td>
                        <td style="padding: 8px; border: 1px solid #D3C9C0; font-weight: bold; color: #1E5C3F;">₹${formatNumber(po.totalVal)}</td>
                    </tr>
                </table>
                <p>Please deliver as per agreed schedules and confirm delivery in the system to issue your invoice.</p>
                <hr style="border: 0; border-top: 1px solid #D3C9C0; margin-top: 20px;" />
                <p style="font-size: 11px; color: #6B5E55;">Regards,<br/>VendorBridge Corporate Desk</p>
            </div>
        `;
        sendEmailApi(vendor.email, subject, body);
    }
    
    updateNotificationsCount();
    renderPurchaseOrders();
    loadPODocument(poId);
    showToast('Sent', `PO sent to ${vendor.name}`, 'success');
    syncState();
}

function confirmVendorDelivery(poId) {
    const po = state.purchaseOrders.find(p => p.id === poId);
    if (!po) return;
    
    po.status = 'Delivered';
    
    // Add activity log
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'po',
        user: 'Vendor (' + (state.vendors.find(v => v.id === po.vendorId)?.name || 'Supplier') + ')',
        title: `Goods Delivered for PO ${poId}`,
        details: `Vendor confirmed delivery. Goods Receipt (GR) logged.`,
        timestamp: getTimestampString()
    });
    
    // Add notification to Procurement Officer
    state.notifications.unshift({
        id: state.notifications.length + 1,
        read: false,
        title: 'Goods Delivered & GR Logged',
        details: `Vendor confirmed delivery for PO ${poId}. Awaiting matching and invoice.`,
        timestamp: 'Just now'
    });
    
    updateNotificationsCount();
    renderPurchaseOrders();
    loadPODocument(poId);
    showToast('Success', 'Delivery confirmed. Goods Receipt generated.', 'success');
    syncState();
}

function issueVendorInvoice(poId) {
    const po = state.purchaseOrders.find(p => p.id === poId);
    if (!po) return;
    
    const rfq = state.rfqs.find(r => r.id === po.rfqId);
    const vendor = state.vendors.find(v => v.id === po.vendorId);
    
    // Create new Invoice
    const maxInvNum = state.invoices.reduce((max, inv) => {
        const parts = inv.id.split('-');
        const num = parseInt(parts[parts.length - 1]);
        return (!isNaN(num) && num > max) ? num : max;
    }, 0);
    const newInvId = `INV-2026-${String(maxInvNum + 1).padStart(3, '0')}`;
    const newInvoice = {
        id: newInvId,
        poId: po.id,
        rfqId: po.rfqId,
        vendorId: po.vendorId,
        subtotal: po.subtotal,
        taxVal: po.taxVal,
        totalVal: po.totalVal,
        dateCreated: getTodayDateString(),
        dueDate: get30DaysDateString(),
        status: 'Awaiting Matching'
    };
    
    state.invoices.unshift(newInvoice);
    
    // Add activity log
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'quote',
        user: vendor.name,
        title: `Issued Invoice ${newInvId}`,
        details: `Generated invoice bill for PO contract ${po.id}.`,
        timestamp: getTimestampString()
    });
    
    // Add notification to Procurement Officer
    state.notifications.unshift({
        id: state.notifications.length + 1,
        read: false,
        title: 'New Vendor Invoice Received',
        details: `Invoice ${newInvId} received for PO ${po.id}. Ready for Accounts Payable 3-way match.`,
        timestamp: 'Just now'
    });
    
    updateNotificationsCount();
    renderPurchaseOrders();
    loadPODocument(poId);
    showToast('Success', `Invoice ${newInvId} generated and sent.`, 'success');
    syncState();
}

function openMatchingModal(invId) {
    const inv = state.invoices.find(i => i.id === invId);
    if (!inv) return;
    
    activeInvoiceId = invId;
    
    const rfq = state.rfqs.find(r => r.id === inv.rfqId);
    const vendor = state.vendors.find(v => v.id === inv.vendorId);
    const po = state.purchaseOrders.find(p => p.id === inv.poId);
    
    document.getElementById('match-invoice-id').innerText = inv.id;
    document.getElementById('match-po-ref').innerText = inv.poId;
    document.getElementById('match-rfq-category').innerText = rfq ? rfq.category : '-';
    document.getElementById('match-vendor-name').innerText = vendor ? vendor.name : '-';
    
    document.getElementById('match-po-amount').innerText = `₹${formatNumber(po ? po.totalVal : 0)}`;
    document.getElementById('match-gr-status').innerText = po && po.status === 'Delivered' ? 'Delivered (GR Match)' : 'Awaiting Delivery';
    document.getElementById('match-invoice-amount').innerText = `₹${formatNumber(inv.totalVal)}`;
    
    // Reset checkboxes
    document.getElementById('check-po-match').checked = false;
    document.getElementById('check-gr-match').checked = false;
    document.getElementById('check-inv-match').checked = false;
    
    document.getElementById('matching-reconciler-modal').classList.add('active');
}

function closeMatchingModal() {
    document.getElementById('matching-reconciler-modal').classList.remove('active');
}

function submitPaymentReconciliation() {
    if (!activeInvoiceId) return;
    
    const inv = state.invoices.find(i => i.id === activeInvoiceId);
    if (!inv) return;
    
    inv.status = 'Pending Payment Approval';
    
    // Add activity log
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'approve',
        user: 'Procurement Officer (AP)',
        title: `Reconciled Invoice ${inv.id}`,
        details: `3-Way Match verified (PO + GR + Invoice). Forwarded to Finance Manager for approval.`,
        timestamp: getTimestampString()
    });
    
    // Add notification to Manager
    state.notifications.unshift({
        id: state.notifications.length + 1,
        read: false,
        title: 'Invoice Payout Approval Needed',
        details: `AP reconciled Invoice ${inv.id}. Awaiting Manager payout signoff.`,
        timestamp: 'Just now'
    });
    
    closeMatchingModal();
    renderInvoices();
    showToast('Reconciled', `3-Way Match completed. Sent to Manager for payment approval.`, 'success');
    syncState();
}

function adminManageUsers() {
    const modal = document.getElementById('admin-users-modal');
    renderUsers();
    modal.classList.add('active');
}

function closeAdminUsersModal() {
    document.getElementById('admin-users-modal').classList.remove('active');
}

function renderUsers() {
    let rows = '';
    const users = state.users || [];
    users.forEach(u => {
        let deleteBtn = '';
        // Don't let admin delete themselves
        if (u.email !== 'admin@vendorbridge.com') {
            deleteBtn = `<button class="btn-primary btn-danger" style="padding: 4px 8px; font-size: 11px; background-color: var(--color-danger); border-color: var(--color-danger); margin-left: 6px; min-width: 80px !important; width: auto !important;" onclick="deleteUser('${u.email}')">Delete</button>`;
        }
        rows += `
            <tr>
                <td style="font-weight: 700;">${u.name}</td>
                <td>${u.email}</td>
                <td><span class="badge badge-primary">${getRoleLabel(u.role)}</span></td>
                <td>${deleteBtn}</td>
            </tr>
        `;
    });
    if (users.length === 0) {
        rows = `<tr><td colspan="4" style="text-align: center; color: var(--text-secondary);">No registered users</td></tr>`;
    }
    document.getElementById('admin-users-list-body').innerHTML = rows;
}

function deleteUser(email) {
    if (!confirm(`Are you sure you want to delete user ${email}?`)) {
        return;
    }
    const user = state.users.find(u => u.email === email);
    if (!user) return;
    
    state.users = state.users.filter(u => u.email !== email);
    
    // Log activity
    state.activities.unshift({
        id: state.activities.length + 1,
        type: 'create',
        user: 'System Admin',
        title: `Deleted User: ${user.name}`,
        details: `Removed user account associated with ${email}.`,
        timestamp: getTimestampString()
    });
    
    renderUsers();
    showToast('Deleted', `User ${user.name} has been removed.`, 'success');
    syncState();
}

async function loadSmtpConfig() {
    try {
        const res = await fetch('/api/config/smtp');
        if (res.ok) {
            const data = await res.json();
            document.getElementById('smtp-host').value = data.host || '';
            document.getElementById('smtp-port').value = data.port || '587';
            document.getElementById('smtp-user').value = data.user || '';
            document.getElementById('smtp-from').value = data.from || 'noreply@vendorbridge.com';
            
            const passInput = document.getElementById('smtp-pass');
            if (passInput) {
                if (data.has_password) {
                    passInput.placeholder = '•••••••• (Saved. Leave empty to keep)';
                } else {
                    passInput.placeholder = 'Enter SMTP Password / API Key';
                }
                passInput.value = '';
            }
        }
    } catch (e) {
        console.error("Failed to load SMTP configuration", e);
    }
}

async function saveSmtpConfig() {
    const host = document.getElementById('smtp-host').value.trim();
    const port = document.getElementById('smtp-port').value.trim();
    const user = document.getElementById('smtp-user').value.trim();
    const password = document.getElementById('smtp-pass').value;
    const from = document.getElementById('smtp-from').value.trim();
    
    try {
        const res = await fetch('/api/config/smtp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ host, port, user, password, from })
        });
        
        if (res.ok) {
            const result = await res.json();
            if (result.success) {
                showToast('SMTP Configuration', 'SMTP server settings updated successfully.', 'success');
                loadSmtpConfig();
            } else {
                showToast('SMTP Save Failed', result.error || 'Server error saving settings.', 'danger');
            }
        } else {
            showToast('SMTP Save Failed', 'HTTP failure updating configurations.', 'danger');
        }
    } catch (e) {
        console.error("Error saving SMTP settings", e);
        showToast('Network Error', 'Failed to save SMTP configuration.', 'danger');
    }
}

async function sendTestEmail() {
    const to = document.getElementById('smtp-test-target').value.trim();
    if (!to) {
        showToast('Input Required', 'Please enter a recipient email address.', 'warning');
        return;
    }
    
    showToast('Sending Test', 'Attempting connection and dispatch...', 'info');
    try {
        const res = await fetch('/api/send-test-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify({ to })
        });
        
        let result = null;
        try {
            result = await res.json();
        } catch (jsonErr) {}
        
        if (res.ok) {
            if (result && result.success) {
                showToast('Success', `SMTP Test Email sent successfully to ${to}!`, 'success');
            } else {
                showToast('SMTP Error', (result && result.error) || 'SMTP dispatch failed.', 'danger');
            }
        } else {
            showToast('SMTP Error', (result && result.error) || 'HTTP failure checking SMTP connection.', 'danger');
        }
    } catch (e) {
        console.error("Error sending SMTP test email", e);
        showToast('Network Error', 'SMTP test connection timed out.', 'danger');
    }
}

// Initial count trigger
document.getElementById('toast-container') && updateNotificationsCount();

function toggleSignupVendorCategory(role) {
    const group = document.getElementById('signup-vendor-category-group');
    if (group) {
        group.style.display = (role === 'vendor') ? 'block' : 'none';
    }
}

function approveVendor(vendorId) {
    const vendor = state.vendors.find(v => v.id === vendorId);
    if (vendor) {
        vendor.status = 'Active';
        vendor.compliance = 'Verified';
        
        // Log trace
        state.activities.unshift({
            id: state.activities.length + 1,
            type: 'approve',
            user: getRoleLabel(state.currentUserRole),
            title: `Approved Vendor: ${vendor.name}`,
            details: `Approved compliance and marked vendor status as active.`,
            timestamp: getTimestampString()
        });
        
        renderVendors();
        showToast('Approved', `Vendor ${vendor.name} has been approved and is now Active.`, 'success');
        syncState();
    }
}
