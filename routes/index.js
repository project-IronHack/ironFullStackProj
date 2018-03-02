const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {logged: req.user}); 
});

router.get('/payment', (req, res, next) => {
  res.render('payment', {logged: req.user}); 
});
module.exports = router;
