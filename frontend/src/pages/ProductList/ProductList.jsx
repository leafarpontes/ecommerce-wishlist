import styles from './ProductList.module.css';
import { useEffect, useState } from "react";
import { fetchProducts } from "../../services/api";
import { Message } from "../../components/Message/Message";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { Link } from 'react-router';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      // await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate network delay
      const result = await fetchProducts();

      if (result.success) {
        setProducts(result.data);
        setError(null);
      } else {
        setError(result.error);
        setProducts([]);
      }

      setLoading(false);
    };

    loadProducts();
  }, []);

  return (
    <main className={styles['main-container']}>
      <Breadcrumb>
        <Link to="/">Home</Link>
      </Breadcrumb>

      {loading && (
        <div className={styles['loading-container']}>
          <LoadingSpinner /> Carregando...
        </div>
      )}

      {error && !loading && (
        <Message variant="error">
          Houve um problema ao buscar os itens da loja. Verifique sua conexão ou tente novamente em instantes
        </Message>
      )}

      {!loading && !error && products.length === 0 && (
        <Message variant="info">
          Nenhum produto disponível no momento.
        </Message>
      )}

      {!loading && !error && products.length > 0 && (
        <div className={styles['products-grid']}>
          {products.map(product => (
            <ProductCard key={product.code} product={product} origin="ProductList" />
          ))}
        </div>
      )}
    </main>
  )
};
