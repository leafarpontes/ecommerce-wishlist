import styles from './Header.module.css';
import { CircleUserRound, Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/logo.svg" alt="Logo" />
      <div className={styles['header-options']}>
        <div className={styles.wishlist}>
          <Heart color="white" size={22} />
          <span className={styles['wishlist-text']}>Wishlist</span>
        </div>
        <div className={styles['dropdown']} >
          <CircleUserRound color="white" size={22} />
          <div className={styles['dropdown-content']}>
            <a href="#">Entrar</a>
            <a href="#">Minha Conta</a>
            <a href="#">Endereços</a>
            <a href="#">Minha Netshoes</a>
          </div>
        </div>
      </div>
    </header>
  )
}
