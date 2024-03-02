import { FC, useState } from "react";

import styles from "./Dropdown.module.css";
import { DropdownProps } from "../../interfaces/Dropdown.interface";

export const Dropdown: FC<DropdownProps> = ({ filter, setFilter }) => {
  const [showList, setShowList] = useState(false);

  const data = [
    { id: 1, name: "all", value: "all" },
    { id: 2, name: "followings", value: "followings" },
    { id: 3, name: "follow", value: "follow" },
  ];

  const current = data.filter((el) => {
    if (el.value === filter) return el;
  })[0].name;

  const handleChange = (val:string) => {
    setFilter(val);
    setShowList(false);
  };

  return (
    <div className={styles.customSelectContainer}>
      <div
        className={
          showList
            ? `${styles.selectedText} ${styles.active}`
            : styles.selectedText
        }
        onClick={() => setShowList((prevState) => !prevState)}
      >
        {current}
      </div>
      {showList && (
        <ul className={styles.selectOptions}>
          {data.map((option) => {
            return (
              <li
                className={
                  filter === option.value
                    ? `${styles.customSelectOption} ${styles.active}`
                    : styles.customSelectOption
                }
                data-name={option.name}
                key={option.id}
                value={option.value}
                onClick={() => handleChange(option.value)}
              >
                {option.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
