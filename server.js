const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');

const mongoose = require("mongoose");
// require('./models').connect(config.dbUri);

const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
// pass the passport middleware
app.use(passport.initialize());
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/inventorysys");

app.all("/*", function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

// load passport strategies
const localSignupStrategy = require('./passport/local-signup');
const localLoginStrategy = require('./passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const inventoryRoutes = require('./routes/inventory');
const transactionsRoutes = require('./routes/transactions');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.use('/inventory', inventoryRoutes);
app.use('/transactions', transactionsRoutes);


// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
