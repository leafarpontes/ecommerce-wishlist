import styles from './ProductCard.module.css';
import { Star, StarHalf, Heart, X } from "lucide-react";

export const ProductCard = ({ product, origin }) => {
  const { name, priceInCents, salePriceInCents, rating, image } = product;

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  const displayPriceInBrl = (priceInCents) => {
    return (priceInCents / 100).toFixed(2).replace('.', ',');
  };

  return (
    <div className={styles.card}>
      <div className={styles['button-container']}>
        {origin === "ProductList" ? (
          <Heart color='white' className={styles['add-button']} size={22} />
        ) : (
          <X className={styles['remove-button']} size={22} />
        )}
      </div>
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.description}>{name}</p>
      <div className={styles['rating-container']}>
        <div className={styles['star-rating']}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, () => (
              <Star fill="#dbdbdc" strokeWidth={0} />
            ))}
          </div>
          <div className={`${styles['stars']} ${styles['rating']}`}>
            {Array.from({ length: fullStars }, () => (
              <Star fill="#e79400" strokeWidth={0} />
            ))}
            {halfStar && <StarHalf fill="#e79400" strokeWidth={0} />}
          </div>
        </div>
        <span className={styles['rating-number']}>{rating}</span>
      </div>
      <p className={styles.price}>R$ {displayPriceInBrl(priceInCents)}</p>
      <p className={styles['sale-price']}>R$ {displayPriceInBrl(salePriceInCents)}</p>
    </div>
  )
};
