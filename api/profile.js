const db = require("../db/pool");
const { GET_PROFILE } = require("../db/strings");
const { asyncErrorWrapper } = require("../mw/error");
const router = require("express").Router();

const getProfile = asyncErrorWrapper(async (req, res) => {
  const { id } = req;
  const profile = await db.query(GET_PROFILE, [id]);
  res.json(profile.rows[0]);
});

router.route("/").get(getProfile);

module.exports = router;
