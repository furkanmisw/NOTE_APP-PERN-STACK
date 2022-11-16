import React from "react";
import { useEffect } from "react";
import api from "../api";

const Notes = ({
  filderedNotes,
  setFocusNote,
  focusNote,
  setNotes,
  setFocusCategory,
}) => {
  useEffect(() => {
    if (filderedNotes.length === 0) {
      setFocusCategory();
    }
  }, [focusNote]);

  return (
    <ul className="notes">
      {filderedNotes.map((note) => {
        return (
          <li
            key={note.id}
            onClick={() =>
              setFocusNote({
                type: "update",
                ...note,
              })
            }
            className={note.id === focusNote?.id && "active"}
          >
            <p className="title">{note.title}</p>
            <p className="body">{note.body}</p>
            <button
              className="close"
              onClick={(e) => {
                e.stopPropagation();
                setFocusNote();
              }}
            >
              <img src="/icons/close.svg" alt="close" />
            </button>
            <button
              className="delete"
              onClick={() => _delete(note.id, setNotes, setFocusNote)}
            >
              <img src="/icons/bin.svg" alt="bin" />
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Notes;

const _delete = (id, setNotes, setFocusNote) => {
  api("/notes/" + id, "DELETE").then((res) => {
    if (res.status === 200) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
      setFocusNote();
    }
  });
};
