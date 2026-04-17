const API = 'http://localhost:3000';

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.userId) {
    localStorage.setItem('userId', data.userId);
    window.location.href = 'tasks.html';
  } else {
    alert('Login inválido');
  }
}

async function loadTasks() {
  const userId = localStorage.getItem('userId');
  const res = await fetch(`${API}/tasks/${userId}`);
  const tasks = await res.json();

  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerText = task.title;
    list.appendChild(li);
  });
}

async function addTask() {
  const userId = localStorage.getItem('userId');
  const title = document.getElementById('taskInput').value;

  await fetch(`${API}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, userId })
  });

  loadTasks();
}

if (window.location.pathname.includes('tasks.html')) {
  loadTasks();
}