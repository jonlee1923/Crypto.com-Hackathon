const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const organisationSchema = new Schema({
    contractAddress: {type: String, required: true},
    email: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    // logoImage: { type: String, required: true },
    bannerImage: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

//'Place here determines the name in mongodb
module.exports = mongoose.model("Organisation", organisationSchema);

