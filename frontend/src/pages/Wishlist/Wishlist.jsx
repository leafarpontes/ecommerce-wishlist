import styles from "./Wishlist.module.css";
import { Link } from "react-router";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { wishlistService } from "../../services/wishlistService";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Message } from "../../components/Message/Message";
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate network delay
    const result = await wishlistService.getWishlist();
    setProducts(result);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <main className={styles['main-container']}>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <Link to="/wishlist">Wishlist</Link>
      </Breadcrumb>

      {loading && (
        <div className={styles['loading-container']}>
          <LoadingSpinner /> Carregando...
        </div>
      )}

      {!loading && products.length === 0 && (
        <Message variant="info">
          Você ainda não possui itens salvos na sua Lista de Desejos.
        </Message>
      )}

      {!loading && products.length > 0 && (
        <div className={styles['products-grid']}>
          {products.map(product => (
            <ProductCard key={product.code} product={product} origin="Wishlist" onWishlistChange={loadWishlist} />
          ))}
        </div>
      )}
    </main>
  )
};