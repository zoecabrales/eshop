// icons
import { FaUserCircle } from "react-icons/fa";

// redux
import { useSelector } from "react-redux";
import { selectUserName } from "../../../redux/slice/authSlice";

// navigation
import { NavLink } from "react-router-dom";

// css
import styles from "./Navbar.module.scss";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : ``);

const Navbar = () => {
  const userName = useSelector(selectUserName);

  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h3 style={{ marginTop: "20px" }}>{userName}</h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/home" className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/all-products" className={activeLink}>
              All Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/add-product/ADD" className={activeLink}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" className={activeLink}>
              Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
