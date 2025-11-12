import styles from "./Wishlist.module.css";
import { Link } from "react-router";
import { Header } from "../../components/Header/Header";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";

export const Wishlist = () => {
  return (
    <div>
      <Header />
      <main className={styles['main-container']}>
        <Breadcrumb>
          <Link to="/">Home</Link>
          <Link to="/wishlist">Wishlist</Link>
        </Breadcrumb>
        <hr />
      </main>
    </div>
  )
};
