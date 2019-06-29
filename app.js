const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port =process.env.PORT||5000
const indexRouter = require('./src/routes/index.js');
const usersRouter = require('./src/routes/users');
const registerRouter = require('./src/routes/register');
const siginRouter = require('./src/routes/signin');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter.router);
app.use('/login', siginRouter);
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

