import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

import styles from "./Tweets.module.css";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { getUsers } from "../../services/user.service";
import { useInView } from "react-intersection-observer";

export const Tweets = () => {
  const navigate = useNavigate();
  const { isLoading, data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: getUsers,
      initialPageParam: 1,
      getNextPageParam: (_, pages) => pages.length + 1,
    });

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (
      inView &&
      !isFetchingNextPage &&
      hasNextPage &&
      data?.pageParams.length !== data?.pages[0].maxPages
    ) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, fetchNextPage, hasNextPage, data]);

  const [filter, setFilter] = useState("all");
  const tweets = data?.pages.flatMap((page) => page.tweets) ?? [];

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
      <div ref={ref}>{isFetchingNextPage && "Loading..."}</div>
    </div>
  );
};
