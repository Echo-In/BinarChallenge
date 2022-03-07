const express = require("express");
const app = express();
const port = 3000;
const morgan = require('morgan');
const router = require("./errorhandling");


app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(morgan('dev'));
app.set("view engine", "ejs");



const user = require('./db/user.json')
let isLogin = false;
let userName = "";
let userEmail = "";
let userPassword = "";

// Middleware
app.use((req, res, next) => {
  if (req.url === '/game' && !isLogin) {
    res.redirect('/login');
  }
  next();
});


// Homepage
app.get("/", (req, res) => {
    userName = user.name;
    res.render("homepage",{isLogin,userName});
});

// Game
app.get("/game", (req, res) => {
    if(isLogin){
        res.render("game", {userName});
    }
    else {
        res.render("login", {
            error: '',
          });
    }
});

// Login
app.get("/login", (req, res) => {
  if (!isLogin) {
    res.render("login", {
        error: '',
      });
  }
});

//Log out
app.get("/logout", (req, res) => {
    isLogin = false;
    res.render("homepage", {isLogin});
});


// Login Authentification
app.post("/login/auth", (req, res) => {
//   userName = user.find((item) => item.email == req.body.uEmail);

//   userPassword = user.find((item) => item.password == req.body.uPassword);

  if (user.email === req.body.uEmail && user.password === req.body.uPassword) {
//   if (!user.email && userPassword === req.body.uPassword) {    
    isLogin = true;
    res.redirect("/game");
  } else {
    res.render("login", {
      error: 'Your password and email was wrong',
    });
  }
});



//Error Handling
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(500).json({
    status: "fail",
    errors: err.message,
  });
});

// Non found page handling
app.use((req, res, next) => {
  res.render("errorhandling");
  // res.status(404).json({
  //   status: "fail",
  //   errors: "are you lost?",
  // });
});


app.listen(port, () => console.log("Server Running ..."));
