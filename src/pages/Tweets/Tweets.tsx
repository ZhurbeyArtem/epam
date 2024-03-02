import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

import styles from "./Tweets.module.css";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { getUsers } from "../../services/user.service";
import { useInView } from "react-intersection-observer";
import { IUserGet, UserData } from "../../interfaces/User.interface";


export const Tweets = () => {
  const navigate = useNavigate();
  const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      initialPageParam: 1,
      getNextPageParam: (currentData, _, currentPage) => {
        if (currentData instanceof Error) {
          return undefined;
        }

        const max = currentData?.maxPages;

        if (currentPage === max) {
          return undefined
        }
        return currentPage + 1
      },
    });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (
      inView &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, hasNextPage]);

  const [filter, setFilter] = useState("all");
  const tweets = data?.pages.flatMap((page) => (page as IUserGet).tweets) ?? [];

  function filteredCards() {
    return tweets?.filter((tweet) => {
      if (filter === "all") return true;
      if (filter === "followings") {
        return tweet.isFollowing === true;
      }
      if (filter === "follow") return tweet.isFollowing === false;
      return false;
    });
  }

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className={styles.wrapper}>
      <Button
        propStyles={styles.backBtn}
        handleClick={() => navigate("/")}
        text={"Back"}
      />
      <Dropdown filter={filter} setFilter={setFilter} />
      <ul className={styles.list}>
        {filteredCards().map((el) => (
          <Card key={el.id} card={el} />
        ))}
      </ul>
      <div
        className={styles.ref}
        ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};
