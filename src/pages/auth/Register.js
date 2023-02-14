// hooks
import { useState } from "react";

// navigation
import { Link, useNavigate } from "react-router-dom";

// assets
import registerImg from "../../assets/register.png";

// notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";

// firebase utils
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

// icons
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

// css
import styles from "./auth.module.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }
    setIsLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setIsLoading(false);
        toast.success("Registration successful...");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Sign Up</h2>

            <form onSubmit={registerUser}>
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cPassword}
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
              />
              <button type="submit" className="--btn --btn-primary --btn-block">
                Sign Up
              </button>
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
    </>
  );
};

export default Register;
