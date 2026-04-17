const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   REGISTRO DE USUÁRIO
========================= */
app.post('/register', (req, res) => {
  const { email, password } = req.body;

  db.run(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ error: 'Usuário já existe' });
      }
      res.json({ message: 'Usuário criado com sucesso' });
    }
  );
});

/* =========================
   LOGIN
========================= */
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM users WHERE email = ? AND password = ?`,
    [email, password],
    (err, user) => {
      if (err) return res.status(500).json(err);

      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      res.json({ message: 'Login OK', userId: user.id });
    }
  );
});

/* =========================
   CRIAR TASK
========================= */
app.post('/tasks', (req, res) => {
  const { title, userId } = req.body;

  db.run(
    `INSERT INTO tasks (title, completed, user_id) VALUES (?, 0, ?)`,
    [title, userId],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({ id: this.lastID, title });
    }
  );
});

/* =========================
   LISTAR TASKS DO USUÁRIO
========================= */
app.get('/tasks/:userId', (req, res) => {
  const userId = req.params.userId;

  db.all(
    `SELECT * FROM tasks WHERE user_id = ?`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      res.json(rows);
    }
  );
});

/* =========================
   DELETAR TASK
========================= */
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;

  db.run(`DELETE FROM tasks WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: 'Task deletada' });
  });
});

/* =========================
   SERVER
========================= */
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});