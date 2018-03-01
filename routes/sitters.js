const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
var multer  = require('multer');
var upload = multer({ dest: `./public/uploads/` });


router.route('/:sitter_id')
	.get((req, res, next) => {
		Sitter.findById(req.params.sitter_id, (error, sitter) => {
			if (error) {
				next(error);
			} else {
				res.render('sitters/show', {sitter});
			}
		})
	})
	.post((req, res, next) => {

		Sitter.findById(req.params.sitter_id, (error, sitter) => {
			if (error) {
				next(error);
			} else {
				console.log(req.body);
				let coord = [req.body.longitude, req.body.latitude];
				console.log(req.body)
				
				restaurant.name        = req.body.name;
				restaurant.description = req.body.description;
				restaurant.location.type='Point';
				restaurant.location.coordinates=coord;
				restaurant.save((error) => {
		  		if (error) {
		  			next(error);
		  		} else {
		  			res.redirect('/');
		  		}
		  	})
			}
		})
	});

router.route('/:restaurant_id/edit')
	.get((req, res, next) => {
		Restaurant.findById(req.params.restaurant_id, (error, restaurant) => {
			if (error) {
				next(error);
			} else {
				res.render('restaurants/update', { restaurant });
			}
		})
	});

router.route('/:restaurant_id/delete')
	.get((req, res, next) => {
		Restaurant.remove({ _id: req.params.restaurant_id }, function(error, restaurant) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/')
	    }
    });
	});

module.exports = router;

