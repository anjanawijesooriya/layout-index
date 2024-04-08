const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    address: {
        type: String,
    },

    phone: {
        type: String,
    },

    devices : [{
        type: Schema.Types.ObjectId,
        ref: "device",
    }],
});

const Location = mongoose.model("location", locationSchema);
module.exports = Location;