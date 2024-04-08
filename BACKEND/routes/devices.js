const Router = require("express").Router();
const multer = require('multer');
let path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './frontend/src/images');
  },
  filename: function(req, file, cb) {   
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

const { getDevices, getDevice, addDevice, deleteDevice } = require("../controllers/devices");

Router.get("/", getDevices);
Router.get("/device/:id", getDevice);
Router.post("/add/:id", upload.single("image"), addDevice);
Router.delete("/delete/:id/:locationId", deleteDevice);

module.exports = Router;
