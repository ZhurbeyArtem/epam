import styles from "./Button.module.css";

export const Button = ({ propStyles = "", handleClick, text }) => {
  console.log(propStyles);
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
