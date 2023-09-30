"use client";

import styles from "./checklist.module.css";
import { useState, useRef, useEffect } from "react";
import { AiFillMinusCircle } from "react-icons/ai";

export default function Checklist({ initialChecklists, completed, onSave, onClose }) {
  const addItemTitleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checklists, setChecklists] = useState(initialChecklists);
  const [addItemTitle, setAddItemTitle] = useState("");

  useEffect(() => setChecklists(initialChecklists), [initialChecklists]);

  return (
    <div
      className={styles["modal-overlay"]}
      onClick={onClose}
    >
      <div className={styles["modal"]} onClick={e => e.stopPropagation()}>
        <div className={styles["modal-content"]}>
          <div className={styles["tabs"]}>
            {checklists.map((checklist, index) => (
              <div
                key={index}
                className={`${styles["tab"]} ${index === activeIndex ? styles["active-tab"] : ""}`}
                onClick={() => setActiveIndex(index)}
              >
                {checklist.title}
              </div>
            ))}
          </div>
          <ul className={styles["checklist"]}>
            {checklists[activeIndex].items.map(item => (
              <li key={`item-${activeIndex}-${item.title}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {
                      if (completed) {
                        return;
                      }

                      setChecklists(checklists.map((checklist, checklistIndex) =>
                        checklistIndex === activeIndex
                          ? {
                            title: checklist.title,
                            items: checklist.items.map(cItem => cItem.title === item.title
                              ? { title: item.title, checked: !item.checked } : cItem)
                          }
                          : checklist
                      ));
                    }}
                  /> {item.title}
                </label>
                {!completed && <AiFillMinusCircle
                  className={styles["delete"]}
                  onClick={() =>
                    setChecklists(checklists.map((checklist, checklistIndex) =>
                      checklistIndex === activeIndex
                        ? {
                          title: checklist.title,
                          items: checklist.items.filter(cItem => cItem.title !== item.title)
                        }
                        : checklist
                    ))
                  }
                />}
              </li>
            ))}
          </ul>
          {!completed && (
            <>
              <div className={styles["add-container"]}>
                <input
                  ref={addItemTitleRef}
                  type="text"
                  value={addItemTitle}
                  onChange={e => {
                    setAddItemTitle(e.target.value);
                    e.target.setCustomValidity("");
                    e.target.reportValidity();
                  }}
                />
                <button onClick={() => {
                  if (addItemTitle.length === 0) {
                    addItemTitleRef.current.setCustomValidity("Item cannot be empty.");
                    addItemTitleRef.current.reportValidity();
                    return;
                  }

                  if (checklists[activeIndex].items.some(item => item.title === addItemTitle)) {
                    addItemTitleRef.current.setCustomValidity("Item already exists.");
                    addItemTitleRef.current.reportValidity();
                    return;
                  }

                  setChecklists(checklists.map((checklist, checklistIndex) =>
                    checklistIndex === activeIndex
                      ? {
                        title: checklist.title,
                        items: [...checklist.items, { title: addItemTitle, checked: false }]
                      }
                      : checklist
                  ));
                  setAddItemTitle("");
                }}>+</button>
              </div>
              <button
                className={`module-button ${styles["save-btn"]}`}
                onClick={() => {
                  onSave(checklists);
                }}
              >Save</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}