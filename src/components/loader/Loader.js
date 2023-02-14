import ReactDom from "react-dom";

// css
import styles from "./Loader.module.scss";

// asset
import loaderImg from "../../assets/loader.gif";

const Loader = () => {
  return ReactDom.createPortal(
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,

    // created another dom portal just for the loader to prevent future bugs with loading
    document.getElementById("loader")
  );
};

export default Loader;
