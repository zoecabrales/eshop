// hooks
import { useState } from "react";

// assets
import loginImg from "../../assets/login.png";

// navigation
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaGoogle } from "react-icons/fa";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

// notification
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Card from "../../components/card/Card";

// firebase utils
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/config";

// css
import styles from "./auth.module.scss";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        toast.success("Login successful...");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400px" />
        </div>
        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={loginUser}>
              <input
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

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

              <button type="submit" className="--btn --btn-primary --btn-block">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
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
    </>
  );
};

export default Login;
