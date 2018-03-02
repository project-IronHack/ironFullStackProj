const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sitterSchema = new Schema(
    {
        displayName: String,
        username:{ type:String, trim:true },
        password:String,
        email: String,
        phone: String,
        address: Object,
        imgUrl: { type: String, default: "http://cdn.onlinewebfonts.com/svg/img_518099.png" },
        facebookID: String,
        googleID: String,
        instagramID: String,
        accountNum: String,
        officialID: String,
        criminalRecord: String,
        residenceProof: String,
        reference1: String,
        reference2: String,
        reviews: Array,
    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );
    sitterSchema.index({ location: '2dsphere' });

module.exports = mongoose.model("Sitter", sitterSchema);