const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        displayName: String,
        username:{ type:String, trim:true },
        password:String,
        email: String,
        imgUrl: { type: String, default: "http://cdn.onlinewebfonts.com/svg/img_518099.png" },
        facebookID: String,
        googleID: String,
        instagramID: String,

    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

module.exports = mongoose.model("User", userSchema);