// 1. Firebase Initialization (Configuration is now in index.html for auth check)
// Get the initialized app from index.html's script block
const db = firebase.firestore();

// --- 2. Navigation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // This code only runs if the auth check in index.html passed
    const navButtons = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state for nav buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/hide content pages
            const targetPage = button.getAttribute('data-page');
            pages.forEach(page => page.classList.remove('active-page'));
            
            const pageElement = document.getElementById(targetPage);
            if (pageElement) {
                pageElement.classList.add('active-page');
            }

            // Load data when page changes
            if (targetPage === 'home') {
                loadDashboardMetrics();
                loadRecentMembers();
            } else if (targetPage === 'members') {
                loadFullCollection('members', 'member-full-table');
            } else if (targetPage === 'coaches') {
                loadFullCollection('coaches', 'coaches-full-table');
            } else if (targetPage === 'receptionists') {
                loadFullCollection('receptionists', 'receptionists-full-table');
            }
        });
    });

    // Load initial dashboard data now that we know the user is logged in
    loadDashboardMetrics();
    loadRecentMembers();
    
    // Set 'home' as the default active page
    const homePage = document.getElementById('home');
    if (homePage) {
        // Ensure the home page is visible when the dashboard loads
        homePage.classList.add('active-page');
    }
});

// --- 3. Firestore Functions ---

async function loadDashboardMetrics() {
    try {
        const membersSnapshot = await db.collection('members').get();
        const coachesSnapshot = await db.collection('coaches').get();
        const receptionistsSnapshot = await db.collection('receptionists').get();
        
        document.getElementById('total-members-count').textContent = membersSnapshot.size;
        
        const activeCoaches = coachesSnapshot.docs.filter(doc => doc.data().status === 'Active').length;
        document.getElementById('active-coaches-count').textContent = activeCoaches;

        document.getElementById('receptionists-count').textContent = receptionistsSnapshot.size;

        const pendingPayments = membersSnapshot.docs.filter(doc => doc.data().status === 'Pending').length;
        document.getElementById('pending-payments-count').textContent = pendingPayments;

    } catch (error) {
        console.error("Error loading dashboard metrics: ", error);
    }
}

async function loadRecentMembers() {
    const tableBody = document.querySelector('#recent-members-table tbody');
    if (!tableBody) return; 

    tableBody.innerHTML = ''; 

    try {
        // Fetch last 5 members. If 'created_at' index is missing, this will throw an error.
        const snapshot = await db.collection('members').orderBy('created_at', 'desc').limit(5).get();

        snapshot.forEach(doc => {
            const data = doc.data();
            const row = tableBody.insertRow();
            const status = data.status || 'Active';

            row.innerHTML = `
                <td>${data.name || 'N/A'}</td>
                <td>${data.membership || 'Standard'}</td>
                <td class="status-${status.toLowerCase()}">${status}</td>
            `;
        });
    } catch (error) {
        console.error("Error loading recent members (check index existence): ", error);
        // In a real app, you would create the necessary Firestore index
    }
}

function addDocument(collectionName) {
    let docData = {};
    let requiredFields = [];
    let formId;
    
    if (collectionName === 'members') {
        docData = {
            name: document.getElementById('member-name').value,
            email: document.getElementById('member-email').value,
            membership: document.getElementById('member-membership').value,
            status: 'Active',
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        };
        requiredFields = [docData.name, docData.email];
        formId = 'add-member-form';

    } else if (collectionName === 'coaches') {
        docData = { 
            name: document.getElementById('coach-name').value,
            specialization: document.getElementById('coach-specialization').value,
            email: document.getElementById('coach-email').value,
            status: 'Active',
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        };
        requiredFields = [docData.name, docData.specialization];
        formId = 'add-coach-form';
        
    } else if (collectionName === 'receptionists') {
        docData = { 
            name: document.getElementById('receptionist-name').value,
            shift: document.getElementById('receptionist-shift').value,
            email: document.getElementById('receptionist-email').value,
            status: 'Active',
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        };
        requiredFields = [docData.name, docData.shift];
        formId = 'add-receptionist-form';
    }
    
    if (requiredFields.some(field => !field)) {
        alert('Please fill out all required fields.');
        return;
    }

    db.collection(collectionName).add(docData)
        .then(() => {
            alert(`${collectionName.slice(0, -1)} added successfully!`);
            loadFullCollection(collectionName, `${collectionName}-full-table`);
            
            const formElement = document.getElementById(formId);
            if (formElement) {
                formElement.style.display = 'none';
            }
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
            alert("Failed to add document. Check the console for errors.");
        });
}

async function loadFullCollection(collectionName, tableId) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    if (!tableBody) return;

    tableBody.innerHTML = ''; 

    try {
        const snapshot = await db.collection(collectionName).get();

        snapshot.forEach(doc => {
            const data = doc.data();
            const docId = doc.id;
            const row = tableBody.insertRow();
            
            if (collectionName === 'members') {
                row.innerHTML = `
                    <td>${data.name || 'N/A'}</td>
                    <td>${data.email || 'N/A'}</td>
                    <td>${data.membership || 'N/A'}</td>
                    <td><button onclick="deleteDocument('${collectionName}', '${docId}')">Delete</button></td>
                `;
            } else if (collectionName === 'coaches') {
                 row.innerHTML = `
                    <td>${data.name || 'N/A'}</td>
                    <td>${data.specialization || 'N/A'}</td>
                    <td>${data.email || 'N/A'}</td>
                    <td><button onclick="deleteDocument('${collectionName}', '${docId}')">Delete</button></td>
                `;
            } else if (collectionName === 'receptionists') {
                 row.innerHTML = `
                    <td>${data.name || 'N/A'}</td>
                    <td>${data.shift || 'N/A'}</td>
                    <td>${data.email || 'N/A'}</td>
                    <td><button onclick="deleteDocument('${collectionName}', '${docId}')">Delete</button></td>
                `;
            }
        });
    } catch (error) {
        console.error(`Error loading ${collectionName}: `, error);
    }
}

function deleteDocument(collectionName, docId) {
    if (confirm(`Are you sure you want to delete this ${collectionName.slice(0, -1)}?`)) {
        db.collection(collectionName).doc(docId).delete()
            .then(() => {
                alert("Document successfully deleted!");
                loadFullCollection(collectionName, `${collectionName}-full-table`);
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }
}