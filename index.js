const express = require("express");
const app = express();
const port = 3000;
const morgan = require('morgan');
const router = require("./router");


app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(morgan('dev'));
app.set("view engine", "ejs");


app.use(router);

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
