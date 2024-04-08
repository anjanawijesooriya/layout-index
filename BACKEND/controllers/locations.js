const Location = require("../models/locations");
const Device = require("../models/devices");

exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.find().populate("devices").exec();
    return res.status(200).json({
      success: true,
      data: locations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
      .populate("devices")
      .exec();
    return res.status(200).json({
      success: true,
      data: location,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    return res.status(201).json({
      success: true,
      data: location,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    // Find the location by ID and populate devices
    const location = await Location.findById(req.params.id).populate("devices").exec();
    
    if (!location) {
      return res.status(404).json({
        success: false,
        error: "Location not found",
      });
    }

    // Extract device IDs associated with the location
    const deviceIds = location.devices.map(device => device._id);

    // Delete devices associated with the location
    await Device.deleteMany({ _id: { $in: deviceIds } });

    // Delete the location
    await Location.findByIdAndDelete(req.params.id);

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
