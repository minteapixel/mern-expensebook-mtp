const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passportService = require('./services/passport');
const passport = require('passport');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

const keys = require('./config/keys');
const indexRoutes = require('./routes/index');
const expenseRoutes = require('./routes/expenses');
const authRoutes = require('./routes/auth');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// passport + cookie setup
app.use(
  cookieSession({
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// backend routes
app.use('/', indexRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

// handling error middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});