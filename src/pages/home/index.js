import React from "react";
import { useDispatch } from "react-redux";
import { listUserAction } from "store/user";
import logo from "assets/images/logo.svg";
import styles from "./home.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const fetchUser = () => {
    dispatch(listUserAction.request({ userId: 2 }));
  };

  return (
    <div className={styles.App}>
      <header className={styles.appHeader}>
        <img src={logo} className={styles.App_logo} alt='logo' />
        <div>
          <p className={styles.title}>
            Boilerplate for redux-saga and map status of fetching as a meta key
            in redux store
          </p>
          <ul className={styles.list}>
            <li className={styles.description}>Open redux devtools</li>
            <li className={styles.description}>Press 'Fetch User'</li>
            <li className={styles.description}>See how redux structure is</li>
          </ul>
          <button onClick={fetchUser}>Fetch User</button>
        </div>
      </header>
    </div>
  );
}
