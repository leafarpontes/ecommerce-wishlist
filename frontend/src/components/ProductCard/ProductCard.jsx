import style from './ProductCard.module.css';

export const ProductCard = ({ product }) => {
  const { code, name, available, visible, details, priceInCents, salePriceInCents, rating, image, stockAvailable } = product;
  return (
    <div className={style.card}>
      <img src={image} alt={name} className={style.image} />
      <p className={style.description}>{name}</p>
    </div>
  )
};
