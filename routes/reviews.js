const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

router.get("/", (req,res)=>{
    Review.find({}, (err,docs)=>{
        if(err) return res.send(err);
        res.render("home", {review:docs});
    });
});

router.get("/new", (req,res)=>{
    if(!req.session.currentUser) return res.redirect("/users/login");
    res.render("review_form", {
        user:req.session.currentUser,
        errorMessage:null
    });
});

router.post("/new", (req,res)=>{
    
    const review = new Review({
        body: req.body.reviewText,
        user_id: req.session.currentUser._id,
        user_name: req.session.currentUser.username,
    });
   review.save((err, result)=>{
    if(err) return res.send(err);
    res.redirect("/");
   }); 
});

module.exports = router;
