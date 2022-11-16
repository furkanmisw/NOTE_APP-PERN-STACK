import React from "react";
import Header from "./header";

const Categories = ({
  notes,
  focusCategory,
  setFocusCategory,
  setFocusNote,
}) => {
  const categories = () => {
    let categories = notes.map((note) => note.category);
    categories = categories.sort();
    return [...new Set(categories)];
  };
  return (
    <div className="categories">
      <Header />
      <ul>
        {categories().map((category) => {
          return (
            <li
              onClick={() => setFocusCategory(category)}
              className={focusCategory === category && "active"}
              key={category}
            >
              <FolderIcon />
              <p>{category}</p>
              <div className="count">
                {notes.filter((note) => note.category === category).length}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("delete category");
                  setFocusCategory();
                  setFocusNote();
                }}
              >
                <img src="/icons/closewhite.svg" alt="close-icon" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#ebc44c"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    />
  </svg>
);
