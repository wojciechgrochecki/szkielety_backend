const router = require("express").Router()
const { User } = require("../models/user")
const { authentication } = require('../middleware/authentication')
const { Promotion, validatePromotion } = require('../models/promotion')

router.use(authentication);


router.post("/", async (req, res) => {
    try {
        const { error } = validatePromotion(req.body);

        if (error)
            return res.status(400).send({ message: error.details[0].message })

        const newPromotion = new Promotion({
            userId: req.user._id,
            promotionUrl: req.body.promotionUrl,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            oldPrice: req.body.oldPrice,
            newPrice: req.body.newPrice,
        })

        newPromotion.save();
        return res.status(201).send({ message: "Promotion created successfully" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" })

    }
})

router.get("/", async (req, res) => {
    try {
        const promotions = await Promotion.find({});
        res.status(200).send(promotions);
    }
    catch (error) {
        console.log(error)
        res.status(400).send({ error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const promotion = await Promotion.find({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!promotion) {
            res.status(404).send('Promotion not found');
            return;
        }

        res.send(promotion);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const promotion = await Promotion.findOneAndRemove({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!promotion) {
            res.status(404).send('Promotion not found');
            return;
        }

        res.send(promotion);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const update = {
            promotionUrl: req.body.promotionUrl,
            title: req.body.title,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            oldPrice: req.body.oldPrice,
            newPrice: req.body.newPrice,
        }

        const promotion = await Promotion.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id
        }, update);

        if (!promotion) {
            res.status(404).send('Promotion not found');
            return;
        }
        const updatedPromotion = await Promotion.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        res.send(updatedPromotion);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
})



module.exports = router