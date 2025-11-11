import styles from './ProductList.module.css';
import { useEffect, useState } from "react";
import { Header } from "../../components/Header/Header";
import { fetchProducts } from "../../services/api";
import { Message } from "../../components/Message/Message";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

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
    <div>
      <Header />
      <h1>Product List</h1>

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
        <ul>
          {products.map(product => (
            <li key={product.code}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
};
