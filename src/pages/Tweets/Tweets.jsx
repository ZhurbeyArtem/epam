import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../hooks/useUser";

import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

import styles from "./Tweets.module.css";
import { Dropdown } from "../../components/Dropdown/Dropdown";

export const Tweets = () => {
  const { isLoading, data: cards } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const cardsPerPage = 6;
  const [filter, setFilter] = useState("all");
  const indexOfLastCard = currentPage * cardsPerPage;


  function filteredCards() {
    return cards?.filter((card) => {
      if (filter === "all") return true;
      if (filter === "followings") {
        return card.isFollowing === true;
      }
      if (filter === "follow") return card.isFollowing === false;
      return false;
    });
  }

  const currentCards = filteredCards()?.slice(0, indexOfLastCard);

  const maxCurrenCards = filteredCards()?.length;

  const paginate = () => setCurrentPage((prevState) => prevState + 1);

  const handleFilterChange = (newFilter) => {
    setCurrentPage(1);
    setFilter(newFilter);
  };

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.wrapper}>
      <Button
        propStyles={styles.backBtn}
        handleClick={() => navigate("/")}
        text={"Back"}
      />
      <Dropdown filter={filter} setFilter={handleFilterChange} />
      <ul className={styles.list}>
        {currentCards.map((el) => (
          <Card key={el.id} card={el} />
        ))}
      </ul>
      {currentCards.length !== maxCurrenCards && (
        <Button
          propStyles={styles.loadMoreBtn}
          handleClick={paginate}
          text={"Load More"}
        />
      )}
    </div>
  );
};
