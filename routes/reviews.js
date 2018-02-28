const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");

//ensure login
const ensureLogin = require("connect-ensure-login");

//passport
const passport = require("passport");

router.get("/", (req,res)=>{
    Review.find({}, (err,docs)=>{
        if(err) return res.send(err);
        res.render("reviewsPage", {reviews:docs});
    });
});

router.get("/new", ensureLogin.ensureLoggedIn(),(req, res)=>{
    console.log(req.user);
    res.render("reviewForm", {user:req.user});
    console.log(req.user)
});

router.post("/new", (req,res)=>{   
    const review = new Review({
        body: req.body.reviewText,
        user_id: req.session.currentUser._id,
        user_name: req.session.currentUser.username,
        rating: req.body.rating,
    });
   review.save((err, result)=>{
    if(err) return res.send(err);
    res.redirect("/");
   }); 
});



module.exports = router;
