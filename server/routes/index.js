const router = require("express").Router();

const authRoutes = require("./authRoutes");
const cardRoutes = require("./cardRoutes");

router.use("/", authRoutes);
router.use("/card", cardRoutes)

module.exports = router;
