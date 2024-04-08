const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    serialNumber : {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
    },

    image : {
        type: String,
        required: true,
    },

    status : {
        type: String,
        required: true,
    },
});

const Device = mongoose.model("device", deviceSchema);
module.exports = Device;