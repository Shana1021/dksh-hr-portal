"use client";

import styles from "./popup.module.css";
import { useState, useRef } from "react";

export default function Checklist({ checklists, onSave, onClose }) {
  const addItemTitleRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checked, setChecked] = useState(
    checklists.map(checklist => checklist.items.map(item => item.checked))
  );
  const [addedItems, setAddedItems] = useState(Array.from({length: checklists.length}, () => []));
  const [addItemTitle, setAddItemTitle] = useState("");
  const [saving, setSaving] = useState(false);

  return (
    <div
      className={styles["modal-overlay"]}
      onClick={() => {
        if (saving) {
          return;
        }
        
        onClose();
      }}
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
            {checklists[activeIndex].items.map((item, index) => (
              <li key={`item-${activeIndex}-${index}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={checked[activeIndex][index]}
                    onChange={() => {
                      if (saving) {
                        return;
                      }

                      setChecked(checked.map((checklist, checklistIndex) =>
                        checklistIndex === activeIndex
                          ? checklist.map((c, cIndex) => cIndex === index ? !checked[activeIndex][index] : c)
                          : checklist
                      ));
                    }}
                  /> {item._id}
                </label>
              </li>
            ))}
            {addedItems[activeIndex].map((item, index) => (
              <li key={`addedItem-${activeIndex}-${index}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {
                      if (saving) {
                        return;
                      }

                      setAddedItems(addedItems.map((checklist, checklistIndex) =>
                        checklistIndex === activeIndex
                          ? checklist.map((i, iIndex) => iIndex === index ? {...item, checked: !item.checked} : i)
                          : checklist
                      ));
                    }}
                  /> {item._id}
                </label>
              </li>
            ))}
          </ul>
          <div className={styles["add-container"]}>
            <input
              ref={addItemTitleRef}
              type="text"
              value={addItemTitle}
              onChange={e => {
                if (saving) {
                  return;
                }
                
                setAddItemTitle(e.target.value);
                e.target.setCustomValidity("");
                e.target.reportValidity();
              }}
            />
            <button onClick={() => {
              if (saving) {
                return;
              }

              if (addItemTitle.length === 0) {
                addItemTitleRef.current.setCustomValidity("Item cannot be empty.");
                addItemTitleRef.current.reportValidity();
                return;
              }

              if (checklists[activeIndex].items.some(item => item._id === addItemTitle)) {
                addItemTitleRef.current.setCustomValidity("Item already exists.");
                addItemTitleRef.current.reportValidity();
                return;
              }

              setAddedItems(addedItems.map((checklist, checklistIndex) =>
                checklistIndex === activeIndex
                  ? [...checklist, { _id: addItemTitle, checked: false }]
                  : checklist
              ));
              setAddItemTitle("");
            }}>+</button>
          </div>
          <button
            className={`module-button ${styles["save-btn"]}`}
            onClick={() => {
              if (saving) {
                return;
              }

              setSaving(true);
              onSave(checked, addedItems);
            }}
          >{saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
    </div>
  );
}