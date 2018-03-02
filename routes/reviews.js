const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");
const Sitter = require("../models/Sitter");

//ensure login
const ensureLogin = require("connect-ensure-login");

//passport
const passport = require("passport");

router.get("/", (req,res)=>{
    // Review.find()
    //     .populate("user_id")
    //     .then(docs => {
    //         res.render("booking", {reviews:docs})
    //     })
    //     .catch(err => console.log(err)); 
    Sitter.find()
        .then(docs => {
            console.log(docs)
            res.render("booking", {sitters:docs, logged: req.user})
        })
        .catch(err => console.log(err)); 
});

router.get("/new", ensureLogin.ensureLoggedIn(),(req, res)=>{
    res.render("reviewForm", {user:req.user});
});

router.post("/new", (req,res)=>{   
    console.log(req.body)
    const review = new Review({
        body: req.body.reviewText,
        rating: req.body.rating,
        user_id: req.user._id,
    });
    console.log(review)
   review.save((err, result)=>{
    if(err) return res.send(err);
    res.redirect("/");
   }); 
});

router.route('/:id')
	.get((req, res, next) => {
		User.findById(req.params.user_id, (error, user) => {
			if (error) {
				next(error);
			} else {
				res.render('publicProfile', {user});
			}
		})
	})
	.post((req, res, next) => {

		User.findById(req.params.id, (error, user) => {
			if (error) {
				next(error);
			} else {
				// console.log("8==========D")
				// console.log(req.body);
				// let coord = [req.body.longitude, req.body.latitude];
				// console.log(req.body)
				
				// restaurant.name        = req.body.name;
				// restaurant.description = req.body.description;
				// restaurant.location.type='Point';
				// restaurant.location.coordinates=coord;
				user.save((error) => {
		  		if (error) {
		  			next(error);
		  		} else {
		  			res.redirect('/');
		  		}
		  	})
			}
		})
	});

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

router.route('/:id/delete')
	.get((req, res, next) => {
		User.remove({ _id: req.params.id }, function(error, user) {
	    if (error) {
	    	next(error)
	    } else {
	    	res.redirect('/profile')
	    }
    });
	});



module.exports = router;
