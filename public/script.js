const API = "http://localhost:3000";

// REGISTRO
async function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
}

// LOGIN
async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch(`${API}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (res.status === 200) {
        localStorage.setItem('user', email);
        window.location.href = "dashboard.html";
    } else {
        const data = await res.json();
        alert(data.message);
    }
}

// PROTEGER DASHBOARD
function checkAuth() {
    const user = localStorage.getItem('user');
    if (!user) {
        window.location.href = "login.html";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem('user');
    window.location.href = "login.html";
}