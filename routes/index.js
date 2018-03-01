const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('payment'); //REMEMBER TO MODIFY THIS ROUTE...JUST USING FOR TEST
});

module.exports = router;
