const express = require("express");
const router = express.Router();
const Sitter = require("../models/Sitter");
var multer  = require('multer');
var upload = multer({ dest: `./public/uploads/` });

router.route('/:id/edit')
	.get((req, res, next) => {
		Sitter.findById(req.params.id, (error, sitter) => {
			if (error) {
				next(error);
			} else {
				res.render('sitter/update', { sitter });
			}
		})
  });

router.post('/:id/edit', upload.single("img"), (req, res, next) => {
    const updates = {
      displayName: req.body.displayName,
      imgUrl: `/uploads/${req.file.filename}`,
    };
    console.log(req.body);
    console.log(req.file);
    Sitter.findByIdAndUpdate(req.params.id, updates, (err, sitter) => {
      if (err) {
        return res.render('profile', {
          sitter
        });
      }
      if (!sitter) {
        return next(new Error('404'));
      }
      return res.redirect(`/profile`);
    });
  });

  
  router.route('/:id/delete')
	.get((req, res, next) => {
		Sitter.remove({ _id:req.params.id}, function(error, sitter) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/')
	    }
    });
  });
  
module.exports = router;
