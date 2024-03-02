import { FC } from "react";

import styles from './Button.module.css'
import { ButtonProps } from "../../interfaces/Button.interface";



export const Button: FC<ButtonProps> = ({ propStyles = "", handleClick, text }) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${propStyles}`}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
};
1