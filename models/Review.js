const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: {type: String, required: [true, "Review can't be empty"]},
    user_id: {type: Schema.Types.ObjectId, ref: "User"},
    },
    { timestamps: { 
        createdAt: "created_at", 
        updatedAt: "updated_at" 
    },
    rating: {type: Number},
});

module.exports = mongoose.model("Review", reviewSchema);