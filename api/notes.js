const { asyncErrorWrapper } = require("../mw/error");
const router = require("express").Router();
const db = require("../db/pool");
const {
  CREATE_NOTE,
  GET_NOTES,
  UPDATE_NOTE,
  DELETE_NOTE,
} = require("../db/strings");

const getNotes = asyncErrorWrapper(async (req, res) => {
  const { id } = req;
  const notes = await db.query(GET_NOTES, [id]);
  res.json(notes.rows);
});

const createNote = asyncErrorWrapper(async (req, res) => {
  const { title, body, category } = req.body;
  const { id } = req;
  const note = await db.query(CREATE_NOTE, [
    id,
    title || "Untitled",
    body || "No content",
    category || "#General",
  ]);
  res.json(note.rows[0]);
});

const updateNote = asyncErrorWrapper(async (req, res) => {
  const { title, body, category } = req.body;
  const { id } = req;
  const { noteid } = req.params;
  await db.query(UPDATE_NOTE, [
    id,
    noteid,
    title || "Untitled",
    body || "No content",
    category || "#General",
  ]);
  res.json({ message: "Note updated" });
});

const deleteNote = asyncErrorWrapper(async (req, res) => {
  const { id } = req;
  const { noteid } = req.params;
  await db.query(DELETE_NOTE, [id, noteid]);
  res.json({ message: "Note deleted" });
});

router.route("/").get(getNotes).post(createNote);
router.route("/:noteid").patch(updateNote).delete(deleteNote);
module.exports = router;
