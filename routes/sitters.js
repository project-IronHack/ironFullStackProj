const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
var multer  = require('multer');
var upload = multer({ dest: `./public/uploads/` });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
