const mongoose = require("mongoose")
module.exports = () => {
    try {
        mongoose.connect('mongodb+srv://Flugzeug:Flugzeug12345@discounthaven.nyivteq.mongodb.net/')
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("Could not connect database!")
    }
}