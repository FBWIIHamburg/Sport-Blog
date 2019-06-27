const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const port =process.env.PORT||4000
const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const registerRouter = require('./src/routes/register');
const siginRouter = require('./src/routes/signin');
const verificationRouter=require('./src/controllers/verification')

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
app.route('/').post((req,res)=>{
res.send(req.body)
})


app.use('/register', registerRouter);
app.use('/signin', siginRouter);
app.use('/verification', verificationRouter);


app.use('/users', usersRouter);
app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});

