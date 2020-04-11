import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUserAction } from "store/user";
import { userSelectors } from "store/user";
import isPlainObject from "lodash/isPlainObject";
import logo from "assets/images/logo.svg";
import styles from "./home.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  const users = useSelector(userSelectors.listUsersData);
  const usersStatus = useSelector(userSelectors.listUsersMeta);

  const fetchUser = ({ userId }) => {
    dispatch(listUserAction.request({ userId }));
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
          <button onClick={fetchUser}>Fetch list users</button>
          <button onClick={() => fetchUser({ userId: 2 })}>Fetch user</button>
          <ul className={styles.list}>
            {usersStatus.isRequesting ? (
              <p>Loading...</p>
            ) : usersStatus.isSuccess ? (
              isPlainObject(users) ? (
                <li>{users.email}</li>
              ) : (
                users.map((user, i) => <li key={i}>{user.email}</li>)
              )
            ) : (
              <li>Fetch Error</li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
}
