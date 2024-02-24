import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button/Button";

import styles from "./Home.module.css";

export const Home = () => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  useEffect(() => {
    if (params["*"]) navigate("/");
  }, [navigate, params]);
  return (
    <div className={styles.wrapper}>
      <Button handleClick={() => navigate("/tweets")} text={"Tweets Page"} />
      <p>
        Hi it`s home page you will be redirected here if you try visit
        non-existent page
      </p>
    </div>
  );
};
