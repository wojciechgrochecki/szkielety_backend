const mongoose = require("mongoose")
const Joi = require("joi")

const promotionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    promotionUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    oldPrice: {
        type: Number,
        required: true
    },
    newPrice: {
        type: Number,
        required: true
    },
});

const Promotion = mongoose.model("Promotion", promotionSchema)

//TODO: zmienić to:
const validatePromotion = (data) => {
    const schema = Joi.object({
        promotionUrl: Joi.string().required().label("Link"),
        title: Joi.string().required().label("Title"),
        description: Joi.string().required().label("Description"),
        newPrice: Joi.number().required().label("New price"),
        oldPrice: Joi.number().required().label("Old price"),
        startDate: Joi.date().required().label("Start date"),
        endDate: Joi.date().label("End date"),
    });

    return schema.validate(data);
};

module.exports = { Promotion, validatePromotion }