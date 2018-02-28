const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const User = require("../models/User");

//ensure login
const ensureLogin = require("connect-ensure-login");

//passport
const passport = require("passport");

router.get("/", (req,res)=>{
    Review.find()
        .populate("user_id")
        .then(docs => {
            console.log(docs)
            res.render("reviewsPage", {reviews:docs})
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



module.exports = router;
