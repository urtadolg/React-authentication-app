import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./MainNavigation.module.css";
import Button from "../UI/Button";
import { AuthActions } from "../../store/authSlicer";

const MainNavigation = () => {
  const dispatch = useDispatch();

  const idToken = useSelector((state) => state.auth.idToken);
  const isLoggedIn = !!idToken;

  const onLogoutHandler = () => {
    dispatch(AuthActions.logout());
  };

  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} to="/home">
        React Auth
      </Link>
      <ul className={styles.navBtnContainer}>
        {!isLoggedIn && (
          <li>
            <NavLink
              className={styles.navBtn}
              activeClassName={styles.navBtnActive}
              to="/auth"
            >
              Login
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <NavLink
              className={styles.navBtn}
              activeClassName={styles.navBtnActive}
              to="/profile"
            >
              Profile
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Button onClick={onLogoutHandler}>Logout</Button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MainNavigation;
