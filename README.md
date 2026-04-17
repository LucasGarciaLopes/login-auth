# 🔐 Login + Dashboard de Tarefas (Full Stack)

Sistema completo de autenticação de usuários com dashboard de tarefas, desenvolvido com Node.js, Express, SQLite e JavaScript puro no frontend.

Este projeto simula um sistema real onde usuários podem se registrar, fazer login e gerenciar suas próprias tarefas de forma individual e persistente.

---

## 🚀 Funcionalidades

- Registro de usuário com senha criptografada (bcrypt)
- Login validando hash da senha
- Sessão salva no navegador com localStorage
- CRUD completo de tarefas por usuário
- Banco de dados SQLite persistente
- Frontend servido pelo próprio Express
- Estrutura organizada em padrão profissional

---

## 🛠️ Tecnologias utilizadas

- Node.js
- Express
- SQLite
- Bcrypt
- HTML5
- CSS3
- JavaScript (Vanilla)

---

## 📁 Estrutura do projeto


login-auth-system/
├── frontend/
│ ├── login.html
│ ├── register.html
│ ├── dashboard.html
│ ├── style.css
│ └── script.js
├── database.js
├── server.js
├── database.sqlite
├── package.json
└── README.md


---

## ▶️ Como rodar o projeto localmente

```bash
git clone https://github.com/LucasGarciaLopes/login-auth
cd login-auth
npm install
node server.js

Acesse: http://localhost:3000/login.html

🧠 Como funciona o sistema
O usuário cria uma conta com email e senha
A senha é criptografada com bcrypt antes de ser salva
No login, a senha digitada é comparada com o hash salvo
O ID do usuário é salvo no localStorage
Todas as tarefas são vinculadas ao usuário pelo user_id
O dashboard busca apenas as tarefas daquele usuário
👨‍💻 Autor

Lucas Garcia Lopes
São José do Rio Preto – SP
LinkedIn: https://www.linkedin.com/in/lucas-garcia-lopes-a26718377/

Projeto desenvolvido para fins de aprendizado e portfólio profissional.