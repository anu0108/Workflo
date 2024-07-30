const { Login, Register, Logout } = require("../controllers/authControllers");

const router = require("express").Router();

router.post("/login", Login);
router.post("/register", Register);
router.post("/logout", Logout);


module.exports = router;
