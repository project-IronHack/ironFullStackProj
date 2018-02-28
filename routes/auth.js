const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

//ensure login
const ensureLogin = require("connect-ensure-login");

//passport
const passport = require("passport");


//facebook login
router.get("/auth/facebook", passport.authenticate("facebook", {scope: 'email'}));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/login"
}));
//facebook login

//google login
router.get("/auth/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
    "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));
router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile"
}));
//google login

//instagram login
router.get("/auth/instagram", passport.authenticate("instagram"));
router.get("/auth/instagram/callback", passport.authenticate("instagram", {
    successRedirect: "/profile",
    failureRedirect: '/'
  }));
//instagram login

//profile page
router.get("/profile",
    ensureLogin.ensureLoggedIn(),
    (req, res)=>{

    console.log(req.user);
    res.render("profile", {user:req.user});

});


//login
router.get("/login", (req,res)=>{
   res.render("auth/login", {"message":req.flash("error")});
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
}));

//logout
router.get("/logout", (req,res)=>{
   req.logout();
   res.redirect("/login");
});


router.get("/signup", (req,res, next)=>{
    res.render("auth/signup");
})

.post("/signup", upload.single('img'),(req,res,next)=>{
    console.log(req.body)
    console.log(req.file)
    const username = req.body.username,
          password = req.body.password;
          img = req.file.path;
    if(username === "" || password === ""){
        res.render("auth/signup", {message: "Indicate username and password"});
        return;
    }

    User.findOne({username}, "username", (err, user)=>{
       if (user !== null){
           res.render("auth/signup", {message:"The username already exists"});
           return;
       }

       const hashPass = bcrypt.hashSync(password, salt);

       const newUser = new User({
          username,
          password: hashPass,
          imgUrl: img,
       });

       newUser.save(err=>{
           if (err) return res.render("auth/signup", { message: "Something went wrong" });
            res.redirect("/profile");
       });

    });
});

module.exports = router;