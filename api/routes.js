const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use(require("../mw/tokenauth"));
router.use("/profile", require("./profile"));
router.use("/notes", require("./notes"));

module.exports = router;
