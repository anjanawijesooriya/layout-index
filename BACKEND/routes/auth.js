const router = require("express").Router();

const { register, login, getUsers, getProfile } = require("../controllers/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/users", getUsers);
router.get("/profile/:id", getProfile);

module.exports = router;