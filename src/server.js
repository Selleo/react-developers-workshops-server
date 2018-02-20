const jsonServer = require('json-server');
const db = require('./db');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const validate = require('express-validation');
const validations = require('./validations');
const lodash = require('lodash');

const jwtSecret = 'JWT_SECRET';

const user = {
  email: 'todo@example.com',
  password: 'secret',
};

const authenticate = (req, res, next) => {
  const body = req.body;
  if (!body.email || !body.password) {
    res.status(400).end('Must provide email and password');
  } else if (body.email !== user.email || body.password !== user.password) {
    res.status(401).end('Email or password incorrect');
  } else {
    next();
  }
};

const app = jsonServer.create();
const router = jsonServer.router(lodash.cloneDeep(db));
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(bodyParser.json());

// const expressJwt = require('express-jwt');
// app.use(expressJwt({secret: jwtSecret}).unless({path: ['/login']}));

app.post('/login', authenticate, function(req, res) {
  const token = jwt.sign({email: user.email}, jwtSecret);
  res.send({token: token, user: user});
});

app.post('/todos', validate(validations.todo), function(req, res, next) {
  next();
});

app.put('/todos/:id', validate(validations.todo), function(req, res, next) {
  next();
});

app.get('/me', function(req, res) {
  res.send(req.user);
});

app.get('/reset', function(req, res, next) {
  router.db.setState(lodash.cloneDeep(db));
  next();
});

app.use(router);
app.use(middlewares);

// default errorhandler for express-validation
app.use(function(err, req, res, next) {
  res.status(400).json(err);
});

module.exports = app;
