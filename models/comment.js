const mongoose = require("mongoose")
const Joi = require("joi")

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    promotionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model("Comment", commentSchema)

//TODO: zmienić to:
const validateComment = (data) => {
    const schema = Joi.object({
        userId: Joi.string().required().label("userId"),
        promotionId: Joi.string().required().label("promotionId"),
        content: Joi.string().email().required().label("content")
    })
    return schema.validate(data)
}
module.exports = { Comment, validateComment }