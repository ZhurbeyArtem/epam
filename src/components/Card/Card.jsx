import styles from "./Card.module.css";
import Logo from "../../assets/Logo.svg?react";
import image from "../../assets/cardHeader.png";

export const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
        <img className={styles.image} src={image} alt="quiz" />
      </div>
      <div className={styles.content}>
        <div className={styles.userContent}>
          <hr className={styles.strip} />
          <div className={styles.user}>
            <img className={styles.userImage} src="" alt="user image" />
          </div>
        </div>
        <div className={styles.userInfo}>
          <p>777 TWEETS</p>
          <p>100,500 FOLLOWERS</p>
        </div>
        <button className={styles.btn} type="button">FOLLOW</button>
      </div>
    </div>
  );
};
