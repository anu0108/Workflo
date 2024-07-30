const { Card, getCards, order } = require("../controllers/cardControllers");

const router = require("express").Router();

router.post("/create", Card);
router.get('/', getCards);
router.post('/reorder', order);


module.exports = router;
