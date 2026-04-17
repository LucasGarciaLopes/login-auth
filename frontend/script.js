const page = window.location.pathname;

/* =========================
   PROTEÇÃO DO DASHBOARD
========================= */
if (page.includes('dashboard.html')) {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = 'login.html';
  } else {
    window.onload = () => loadTasks(userId);
  }
}

/* =========================
   REGISTER
========================= */
async function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  alert(data.message || data.error);

  if (data.userId) {
    window.location.href = 'login.html';
  }
}

/* =========================
   LOGIN
========================= */
async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.userId) {
    localStorage.setItem('userId', data.userId);
    window.location.href = 'dashboard.html';
  } else {
    alert(data.error);
  }
}

/* =========================
   TASKS (SÓ DASHBOARD)
========================= */
async function loadTasks(userId) {
  const res = await fetch(`http://localhost:3000/tasks/${userId}`);
  const tasks = await res.json();

  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">
        ${task.title}
      </span>
      <button onclick="deleteTask(${task.id})">🗑</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const userId = localStorage.getItem('userId');
  const title = document.getElementById('taskTitle').value;

  await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, userId })
  });

  document.getElementById('taskTitle').value = '';
  loadTasks(userId);
}

async function deleteTask(id) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: 'DELETE'
  });

  const userId = localStorage.getItem('userId');
  loadTasks(userId);
}