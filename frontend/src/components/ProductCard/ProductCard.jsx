import { useState, useEffect } from 'react';
import { wishlistService } from '../../services/wishlistService';
import { useToast } from '../../contexts/ToastContext';
import styles from './ProductCard.module.css';
import { Star, StarHalf, Heart, X } from "lucide-react";

export const ProductCard = ({ product, origin, onWishlistChange }) => {
  const { name, priceInCents, salePriceInCents, rating, image, code } = product;
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { showToast } = useToast();

  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  useEffect(() => {
    setIsInWishlist(wishlistService.isInWishlist(code));
  }, [code]);

  const displayPriceInBrl = (priceInCents) => {
    return (priceInCents / 100).toFixed(2).replace('.', ',');
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      const result = wishlistService.removeFromWishlist(code);
      if (result.success) {
        setIsInWishlist(false);
        showToast('Produto removido da lista de desejos!', 'remove');
      } else {
        console.log('Failed to remove from wishlist');
      }
    } else {
      const result = wishlistService.addToWishlist(product);
      if (result.success) {
        setIsInWishlist(true);
        showToast('Produto adicionado à lista de desejos!', 'add');
      } else {
        console.log(result.message || 'Failed to add to wishlist');
      }
    }
  };

  const handleRemoveFromWishlist = () => {
    const result = wishlistService.removeFromWishlist(code);
    if (result.success) {
      if (onWishlistChange) {
        onWishlistChange();
        showToast('Produto removido da lista de desejos!', 'remove');
      }
    } else {
      console.log('Failed to remove from wishlist');
    }
  };

  const getButtonClass = () => {
    if (origin === "Wishlist") return styles['wishlist-remove'];
    if (isInWishlist) return styles['wishlist-active'];
    return '';
  };

  return (
    <div className={styles.card}>
      <div className={`${styles['button-container']} ${getButtonClass()}`}>
        {origin === "ProductList" ? (
          <Heart 
            color='white' 
            className={styles['add-button']} 
            size={22} 
            onClick={handleToggleWishlist} 
          />
        ) : (
          <X 
            color='black'
            className={styles['remove-button']} 
            size={22} 
            onClick={handleRemoveFromWishlist}
          />
        )}
      </div>
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.description}>{name}</p>
      <div className={styles['rating-container']}>
        <div className={styles['star-rating']}>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} fill="#dbdbdc" strokeWidth={0} />
            ))}
          </div>
          <div className={`${styles['stars']} ${styles['rating']}`}>
            {Array.from({ length: fullStars }, (_, index) => (
              <Star key={index} fill="#e79400" data-testid="full-filled-star" strokeWidth={0} />
            ))}
            {halfStar && <StarHalf fill="#e79400" data-testid="half-filled-star" strokeWidth={0} />}
          </div>
        </div>
        <span className={styles['rating-number']}>{rating}</span>
      </div>
      <p className={styles.price}>R$ {displayPriceInBrl(priceInCents)}</p>
      <p className={styles['sale-price']}>R$ {displayPriceInBrl(salePriceInCents)}</p>
    </div>
  )
};
