const express = require("express");
//const app = express();
//const port = 3000;
const morgan = require('morgan');
const router = express.Router();

router.use(express.urlencoded());
router.use(express.static('assets'));
router.use(morgan('dev'));
//router.set("view engine", "ejs");


const user = require('./db/user.json')
let isLogin = false;
let userName = "";
let userEmail = "";
let userPassword = "";

// Middleware
router.use((req, res, next) => {
  if (req.url === '/game' && !isLogin) {
    res.redirect('/login');
  }
  next();
});


// Homepage
router.get("/", (req, res) => {
    userName = user.name;
    res.render("homepage",{isLogin,userName});
});

// Game
router.get("/game", (req, res) => {
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
router.get("/login", (req, res) => {
  if (!isLogin) {
    res.render("login", {
        error: '',
      });
  }
});

//Log out
router.get("/logout", (req, res) => {
    isLogin = false;
    res.render("homepage", {isLogin});
});


// Login Authentification
router.post("/login/auth", (req, res) => {
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

module.exports = router;

