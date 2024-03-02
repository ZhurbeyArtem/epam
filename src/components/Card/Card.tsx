import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";

import { Button } from "../Button/Button";

import { updateUser } from "../../services/user.service";
import { CardProps } from "../../interfaces/Card.interface";


import Logo from "../../assets/Logo.svg?react";
import image from "../../assets/cardHeader.png";
import styles from "./Card.module.css";



export const Card: FC<CardProps> = ({ card }) => {
  const client = useQueryClient();

  const { mutate: follow } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
    },
  });

  function addCommasToNumber(number: number): string {
    const numberString = number.toString();
    const regex = /(\d)(?=(\d{3})+(?!\d))/g;
    return numberString.replace(regex, "$1,");
  }

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <Logo className={styles.logo} />
        <img className={styles.image} src={image} alt="quiz" />
      </div>
      <div className={styles.content}>
        <div className={styles.userContent}>
          <hr className={styles.strip} />
          <div className={styles.user}>
            <img
              className={styles.userImage}
              src={card.avatar}
              alt="user image"
            />
          </div>
        </div>
        <div className={styles.userInfo}>
          <p>{card.tweets} TWEETS</p>
          <p>{addCommasToNumber(card.followers)} FOLLOWERS</p>
        </div>
        <Button
          propStyles={
            card.isFollowing
              ? `${styles.btn} ${styles.following}`
              : `${styles.btn}`
          }
          handleClick={() => follow(card)}
          text={card.isFollowing ? "FOLLOWING" : "FOLLOW"}
        />
      </div>
    </li>
  );
};
