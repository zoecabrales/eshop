import React from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";

const Login = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" />
      </div>
      <div className={styles.form}>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
        </form>
      </div>
    </section>
  );
};

export default Login;
