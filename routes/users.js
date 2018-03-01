const express = require('express');
const router  = express.Router();

router.get('/edit', (req, res, next) => {
  res.render('editUser');
});

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
