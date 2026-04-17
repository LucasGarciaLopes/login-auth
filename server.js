const express = require('express');
const cors = require('cors');
const db = require('./database');
db.get("SELECT name FROM sqlite_master WHERE type='table'", [], () => {});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

/* =========================
   REGISTRO DE USUÁRIO
========================= */
app.post('/register', (req, res, next) => {
  try {
    const { email, password } = req.body;

    db.run(
      `INSERT INTO users (email, password) VALUES (?, ?)`,
      [email, password],
      function (err) {
        if (err) return next(err);

        res.json({ message: 'Usuário criado', userId: this.lastID });
      }
    );
  } catch (e) {
    next(e);
  }
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
  const { title, user_id } = req.body;

  db.run(
    `INSERT INTO tasks (title, completed, user_id) VALUES (?, 0, ?)`,
    [title, user_id],
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
   ATUALIZAR TASK (CONCLUIR)
========================= */
app.put('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  db.run(
    `UPDATE tasks SET completed = ? WHERE id = ?`,
    [completed ? 1 : 0, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({ message: 'Task atualizada' });
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
// CAPTURA QUALQUER ERRO DO EXPRESS
app.use((err, req, res, next) => {
  console.error('ERRO GLOBAL:', err.stack);
  res.status(500).json({ error: err.message });
});
/* =========================
   SERVER
========================= */
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});