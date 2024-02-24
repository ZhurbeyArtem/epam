import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../hooks/useUser";

import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

import styles from "./Tweets.module.css";


export const Tweets = () => {
  const { isLoading, data: cards } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const cardsPerPage = 6;

  const indexOfLastCard = currentPage * cardsPerPage;
  const currentCards = cards?.slice(0, indexOfLastCard);

  const paginate = () => setCurrentPage((prevState) => prevState + 1);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.wrapper}>
      <Button
        propStyles={styles.backBtn}
        handleClick={() => navigate("/")}
        text={"Back"}
      />

      <ul className={styles.list}>
        {currentCards.map((el) => (
          <Card key={el.id} card={el} />
        ))}
      </ul>
      {currentCards.length !== cards.length && (
        <Button
          propStyles={styles.loadMoreBtn}
          handleClick={paginate}
          text={"Load More"}
        />
      )}
    </div>
  );
};
