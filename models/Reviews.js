const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
item: {
    user: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    review: String
},
image: String,
});

const Reviews = model("Reviews", reviewSchema);

module.exports = Reviews;