const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sitterSchema = new Schema(
    {
        displayName: String,
        username:String,
        password:String,
        email: String,
        facebookID: String,
        googleID: String

    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

module.exports = mongoose.model("Sitter", sitterSchema);