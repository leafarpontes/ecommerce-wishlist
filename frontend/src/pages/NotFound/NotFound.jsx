import { Link } from 'react-router';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { Message } from '../../components/Message/Message';
import styles from './NotFound.module.css';

export const NotFound = () => {
  return (
    <main className={styles['main-container']}>
      <Breadcrumb>
        <Link to="/">Home</Link>
        <span>404</span>
      </Breadcrumb>
      
      <div className={styles['not-found-content']}>
        <h1 className={styles['error-code']}>404</h1>
        <Message variant="error">
          Página não encontrada. O endereço que você está tentando acessar não existe.
        </Message>
        <Link to="/" className={styles['back-button']}>
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
};
