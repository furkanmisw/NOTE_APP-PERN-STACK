import React, { useState } from "react";
import Categories from "./categories";
import Notes from "./notes";
import TextArea from "./textarea";
import api from "../api";
import { useEffect } from "react";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [focusCategory, setFocusCategory] = useState();
  const [focusNote, setFocusNote] = useState();
  useEffect(() => {
    _getNotes((x) => {
      setNotes(x);
      setFocusCategory(x[0].category);
    });
  }, []);
  const categoriesProps = {
    notes,
    focusCategory,
    setFocusCategory,
    setFocusNote,
  };
  const filderedNotes = notes.filter((note) => note.category === focusCategory);
  const notesProps = {
    filderedNotes,
    setFocusNote,
    focusNote,
    setNotes,
    setFocusCategory,
  };
  const textAreaProps = {
    setNotes,
    focusNote,
    setFocusNote,
    focusCategory,
    setFocusCategory,
  };
  return (
    <div className="home">
      <Categories {...categoriesProps} />
      {focusCategory && <Notes {...notesProps} />}
      <TextArea {...textAreaProps} />
    </div>
  );
};

export default Home;

const _getNotes = (setNotes) =>
  api("/notes").then((res) => res.status === 200 && setNotes(res.data));
