const Device = require("../models/devices");
const Location = require("../models/locations");

exports.getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    return res.status(200).json({
      success: true,
      data: devices,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: device,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addDevice = async (req, res) => {

  try {
    // Extracting filename from req.file
    const image = req.file.filename;

    // Creating device object with req.body and the extracted filename
    const device = await Device.create({ ...req.body, image });
    device.save().then((device) => {
      return Location.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { devices: device._id } }
      );
    });
    return res.status(201).json({
      success: true,
      data: device,
    });
  
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id).then(
      async (location) =>
        await Location.findByIdAndUpdate(req.params.locationId, {
          $pull: { devices: req.params.id },
        })
    );
    if (!device) {
      return res.status(404).json({
        success: false,
        error: "Device not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
