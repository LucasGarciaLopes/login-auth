const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const USERS_FILE = 'users.json';

// Registrar usuário
app.post('/register', (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const { email, password } = req.body;

    const userExists = users.find(u => u.email === email);
    if (userExists) return res.status(400).json({ message: 'Usuário já existe' });

    users.push({ email, password });
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    res.json({ message: 'Usuário criado com sucesso' });
});

// Login
app.post('/login', (req, res) => {
    const users = JSON.parse(fs.readFileSync(USERS_FILE));
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    res.json({ message: 'Login sucesso' });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));