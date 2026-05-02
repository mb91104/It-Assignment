const AUTH_TOKEN_KEY = 'ipl_auth_token';
const USERNAME_KEY = 'ipl_username';

function setAuthToken(token, username) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);
}

function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

function getUsername() {
    return localStorage.getItem(USERNAME_KEY);
}

function logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    window.location.href = 'login.html';
}

async function fetchWithAuth(url, options = {}) {
    const token = getAuthToken();
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
        logout();
        return;
    }

    return response;
}

function updateNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;

    const username = getUsername();
    const existingLogout = document.getElementById('logout-btn');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');

    if (username) {
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        
        if (!existingLogout) {
            const logoutA = document.createElement('a');
            logoutA.id = 'logout-btn';
            logoutA.href = '#';
            logoutA.innerText = 'Logout';
            logoutA.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
            
            nav.appendChild(logoutA);
        }
    } else {
        if (existingLogout) existingLogout.remove();
        
        if (loginLink) loginLink.style.display = 'inline-block';
        if (registerLink) registerLink.style.display = 'inline-block';
    }
}

document.addEventListener('DOMContentLoaded', updateNav);
