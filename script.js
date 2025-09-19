// Sari2Wear Website - JavaScript
// IT Student Project - Simple functionality implementation

// ===== USER DATA MANAGEMENT =====
function initializeUsers() {
    if (!localStorage.getItem('sari2wearUsers')) {
        const defaultUsers = [
            { username: 'customer', password: 'password123' },
            { username: 'admin', password: 'admin123' }
        ];
        localStorage.setItem('sari2wearUsers', JSON.stringify(defaultUsers));
    }
}

function getAllUsers() {
    initializeUsers();
    return JSON.parse(localStorage.getItem('sari2wearUsers'));
}

function addUser(username, password) {
    const users = getAllUsers();
    users.push({ username, password });
    localStorage.setItem('sari2wearUsers', JSON.stringify(users));
}

function userExists(username) {
    const users = getAllUsers();
    return users.find(u => u.username === username);
}

function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
}

function clearCurrentUser() {
    localStorage.removeItem('currentUser');
}

// ===== LOGIN FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessage = document.getElementById('error-message');
            
            if (!username || !password) {
                showError('Please fill in all fields');
                return;
            }
            
            const users = getAllUsers();
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                setCurrentUser(username);
                updateNavigation();
                showSuccess('Login successful! Redirecting...');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showError('Invalid username or password');
            }
        });
    }
});

// ===== REGISTER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('newUsername').value.trim();
            const password = document.getElementById('newPassword').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            
            if (!username || !password || !confirmPassword) {
                showRegisterMessage('Please fill in all fields', 'error');
                return;
            }
            if (password !== confirmPassword) {
                showRegisterMessage('Passwords do not match', 'error');
                return;
            }
            if (userExists(username)) {
                showRegisterMessage('Username already exists', 'error');
                return;
            }
            
            addUser(username, password);
            showRegisterMessage('Registration successful! Redirecting...', 'success');
            
            registerForm.reset();
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});

// ===== LOGOUT FUNCTIONALITY =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        clearCurrentUser();
        updateNavigation();
        alert('You have been logged out successfully');
        window.location.href = 'index.html';
    }
}

// ===== NAVIGATION =====
function updateNavigation() {
    const loginButton = document.querySelector('.login-btn');
    const currentUser = getCurrentUser();
    
    if (loginButton) {
        if (currentUser) {
            loginButton.textContent = 'Logout';
            loginButton.href = '#';
            loginButton.onclick = logout;
        } else {
            loginButton.textContent = 'Login';
            loginButton.href = 'login.html';
            loginButton.onclick = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateNavigation();
});

// ===== MESSAGE HANDLERS =====
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 4000);
    }
}

function showSuccess(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.className = 'success-message';
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
            errorDiv.className = 'error-message';
        }, 4000);
    }
}

function showRegisterMessage(message, type) {
    const messageDiv = document.getElementById('register-message');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
        messageDiv.style.display = 'block';
        setTimeout(() => messageDiv.style.display = 'none', 4000);
    }
}

console.log('🛍️ Sari2Wear eCommerce Loaded!');
console.log('Demo accounts: customer/password123 | admin/admin123');
