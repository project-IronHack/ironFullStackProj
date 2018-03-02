const express = require('express');
const router  = express.Router();
const User = require("../models/User");
var multer  = require('multer');
var upload = multer({ dest: `./public/uploads/` });


router.route('/:id/edit')
	.get((req, res, next) => {
		User.findById(req.params.id, (error, user) => {
			if (error) {
				next(error);
			} else {
				res.render('user/update', { user });
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
    User.findByIdAndUpdate(req.params.id, updates, (err, user) => {
      if (err) {
        return res.render('profile', {
          user
        });
      }
      if (!user) {
        return next(new Error('404'));
      }
      return res.redirect(`/profile`);
    });
  });

  
  router.route('/:id/delete')
	.get((req, res, next) => {
		User.remove({ _id:req.params.id}, function(error, user) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/')
	    }
    });
  });
  

module.exports = router;
