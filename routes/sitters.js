const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
var multer  = require('multer');
var upload = multer({ dest: `./public/uploads/` });

// router.get("/background", (req,res, next)=>{
//     res.render("sitterFiles");
// })

// .post("/background", upload.array(backgroundCheck[]),(req,res,next)=>{
//     console.log(req.body)
//     console.log(req.file)
//     const userID = req.body.username,
//           password = req.body.password;
//           img = req.file.path;
//           body: req.body.reviewText,
//         user_id: req.session.currentUser._id,
//         user_name: req.session.currentUser.username,
    

//     User.findOne({username}, "username", (err, user)=>{
//        const newUser = new User({
//           username,
//           password: hashPass,
//           imgUrl: img,
//        });

//        newUser.save(err=>{
//            if (err) return res.render("auth/signup", { message: "Something went wrong" });
//             res.redirect("/");
//        });

//     });
// });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
