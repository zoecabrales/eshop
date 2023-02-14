// hooks
import { useState } from "react";

// navigation
import { Link } from "react-router-dom";

// assets
import registerImg from "../../assets/register.png";

// components
import Card from "../../components/card/Card";

// icons
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

// css
import styles from "./auth.module.scss";

const Register = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Sign Up</h2>
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

            <input type="password" placeholder="Confirm Password" required />
            <button className="--btn --btn-primary --btn-block">Sign Up</button>
          </form>
          <span className={styles.register}>
            <p>Already have an account?</p>
            <Link to="/login">&nbsp;Login</Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Login" width="450px" />
      </div>
    </section>
  );
};

export default Register;
