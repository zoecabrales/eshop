// navigation
import { Link, NavLink, useNavigate } from "react-router-dom";

// icons
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

// hooks
import { useEffect, useState } from "react";

// firebase utils
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";

// notif
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// state management
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";

// css
import styles from "./Header.module.scss";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Store</span>.
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      Cart
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : ``);

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("You have logged out.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // monitor ACTIVE user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        if (user.displayName === null) {
          const curUser = user.email.substring(0, user.email.indexOf("@"));
          const uName = curUser.charAt(0).toUpperCase() + curUser.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, []);

  return (
    <header>
      <div className={styles.header}>
        {logo}
        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={20} onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>
                Sign In
              </NavLink>
              <a href="#home">
                <FaUserCircle size={16} />
                hi, {displayName}
              </a>
              <NavLink to="/register" className={activeLink}>
                Sign Up
              </NavLink>
              <NavLink to="/order-history" className={activeLink}>
                My Orders
              </NavLink>
              <NavLink to="/" onClick={logoutUser}>
                Logout
              </NavLink>
            </span>
            {cart}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
