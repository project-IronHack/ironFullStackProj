const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Sitter = require("../models/Sitter");
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
    console.log( req.body)
    console.log(req.file)
    const username = req.body.username,
          password = req.body.password;
          displayName = req.body.displayName;
          phone = req.body.phone;
          address = req.body.address;
          img = req.file.path;
          email = req.body.email;
          cpassword = req.body.cpassword;

    if(username === "" || password === ""){
        res.render("auth/signup", {message: "Indicate username and password"});
        return;
    }

    User.findOne({username}, "username", (err, user)=>{
       if (user !== null){
           res.render("auth/signup", {message:"The username already exists"});
           return;
    }

    if(password !== cpassword){
        res.render("auth/signup", {message:"Passwords do not match"});
    }

       const hashPass = bcrypt.hashSync(password, salt);

       const newUser = new User({
          username: username,
          password: hashPass,
          email,
          phone,
          address,
          imgUrl: img,
       });
       newUser.save(err=>{
           if (err) return res.render("auth/signup", { message: "Something went wrong" });
            res.redirect("/profile");
       });

    });
});



router.post("/sitterSignup", upload.fields([{
    name: 'img', maxCount: 1
  }, {
    name: 'officialID', maxCount: 1
  }]),(req,res,next)=>{
  //upload.single('img'), upload.single('officialID'), upload.single('criminalRecord'), upload.single('residenceProof'), upload.single('reference1'),  upload.single('reference2'), (req,res,next)=>{
    //router.post("/sitterSignup", (req,res,next)=>{
    //console.log(req.body)
    console.log("bliss", req.files)
    const displayName = req.body.displayName;
          username = req.body.username,
          email = req.body.email;
          password = req.body.password;
          cpassword = req.body.cpassword;
          //img = req.file.path;

    if(username === "" || password === ""){
        res.render("auth/sitterSignup", {message: "Indicate username and password"});
        return;
    }

    User.findOne({username}, "username", (err, user)=>{
       if (user !== null){
           res.render("auth/sitterSignup", {message:"The username already exists"});
           return;
    }

    if(password !== cpassword){
        res.render("auth/sitterSignup", {message:"Passwords do not match"});
    }

       const hashPass = bcrypt.hashSync(password, salt);

       const newSitter = new Sitter({
          displayName: 
          username,
          password: hashPass,
          email,
          phone,
          address,
          imgUrl: img,
       });
       newSitter.save(err=>{
           if (err) return res.render("auth/sitterSignup", { message: "Something went wrong" });
            res.redirect("/profile");
       });

    });
});

router.get("/sitterSignup", (req,res, next)=>{
    res.render("auth/sitterSignup");
});

module.exports = router;