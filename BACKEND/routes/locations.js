const Router = require("express").Router();

const { getLocations, getLocation, addLocation, deleteLocation } = require("../controllers/locations");

Router.get("/", getLocations);
Router.get("/view/:id", getLocation);
Router.post("/add", addLocation);
Router.delete("/delete/:id", deleteLocation);

module.exports = Router;
