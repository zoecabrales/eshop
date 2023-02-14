// hooks
import { useState } from "react";

// assets
import loginImg from "../../assets/login.png";

// navigation
import { Link } from "react-router-dom";

// icons
import { FaGoogle } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

// components
import Card from "../../components/card/Card";

// css
import styles from "./auth.module.scss";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400px" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form>
            <input type="text" placeholder="Email" required />

            <div className={styles["password-wrapper"]}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <span
                className={styles["password-toggle"]}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <RiEyeCloseLine size={22} />
                ) : (
                  <RiEyeLine size={22} />
                )}
              </span>
            </div>

            <button className="--btn --btn-primary --btn-block">Login</button>
            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button className="--btn --btn-danger --btn-block">
            <FaGoogle size={20} />
            &nbsp;Login with Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">&nbsp;Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
