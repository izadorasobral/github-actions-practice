const express = require('express');
const session = require('express-session');
const passport = require('./auth'); // Certifique-se de que está importando corretamente
const flash = require('connect-flash');
const { writeData, readData } = require('./data');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const portfinder = require('portfinder'); // Adiciona portfinder

const app = express();
app.set('view engine', 'ejs'); // Define EJS como o motor de visualização

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Rota para registro de usuários com validação
app.get('/register', (req, res) => {
  res.render('register'); // Renderize o arquivo register.ejs
});

app.post('/register', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorArray = errors.array();
    errorArray.forEach(error => req.flash('error_msg', error.msg));
    return res.redirect('/register');
  }

  const { username, password } = req.body;
  const users = readData();
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    req.flash('error_msg', 'User already exists');
    return res.redirect('/register');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ id: users.length + 1, username, password: hashedPassword });
  writeData(users);
  req.flash('success_msg', 'User registered successfully');
  res.redirect('/login'); // Redirecione para a página de login após o registro
});

// Rota para login de usuários
app.post('/login', passport.authenticate('local', {
  successRedirect: '/', // Redireciona para a página principal após o login bem-sucedido
  failureRedirect: '/login', // Redireciona de volta para a página de login em caso de falha
  failureFlash: true // Ativa mensagens de erro em caso de falha de autenticação
}));


// Rota GET para a página de login
app.get('/login', (req, res) => {
  res.render('login'); // Renderize o arquivo login.ejs
});

// Rota de Logout
app.get('/logout', (req, res) => {
  req.logout(() => {
    req.flash('success_msg', 'You have logged out successfully');
    res.redirect('/login');
  });
});

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Hello World, Izadora HERE!');
  } else {
    res.send('You are not authenticated. Please log in.');
  }
});

// Encontrar uma porta disponível e iniciar o servidor
portfinder.getPortPromise()
  .then((port) => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
