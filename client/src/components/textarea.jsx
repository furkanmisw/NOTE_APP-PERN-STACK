import React, { useState, useEffect } from "react";
import api from "../api";

const TextArea = ({
  setNotes,
  focusNote,
  setFocusNote,
  focusCategory,
  setFocusCategory,
}) => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    if (focusNote?.type === "update") {
      setCategory(focusNote.category);
      setTitle(focusNote.title);
      setBody(focusNote.body);
    } else {
      setCategory(focusCategory || "#General");
      setTitle("");
      setBody("");
    }
  }, [focusNote]);

  return (
    <div className="text-area">
      <div className="header">
        <h1>{focusNote?.type === "update" ? "Update Note" : "Create Note"}</h1>
        <div className="r">
          <input
            maxLength={50}
            type="text"
            placeholder="category enter (#General)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button
            onClick={() =>
              _done(
                focusNote,
                title,
                body,
                category,
                setNotes,
                setFocusNote,
                setFocusCategory
              )
            }
          >
            <img src="/icons/tick.svg" alt="tick" />
          </button>
          {focusNote && (
            <button onClick={() => setFocusNote()}>
              <img src="/icons/close.svg" alt="close" />
            </button>
          )}
        </div>
      </div>
      <div className="content">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          maxLength={100}
        />
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          maxLength={5000}
          placeholder="Enter body"
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;

const _done = (
  focusNote,
  title,
  body,
  category,
  setNotes,
  setFocusNote,
  setFocusCategory
) => {
  if (focusNote?.type === "update") {
    api("/notes/" + focusNote.id, "PATCH", { title, body, category }).then(
      (res) => {
        if (res.status === 200) {
          delete focusNote.type;
          setNotes((prev) => [
            { ...focusNote, title, body, category },
            ...prev.filter((note) => note.id !== focusNote.id),
          ]);
          setFocusCategory(category);
          setFocusNote();
        }
      }
    );
  } else {
    // create note
    api("/notes", "POST", { title, body, category }).then((res) => {
      if (res.status === 200) {
        setNotes((prev) => [res.data, ...prev]);
        setFocusCategory(res.data.category);
        setFocusNote();
      }
    });
  }
};
