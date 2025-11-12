import { useEffect } from 'react';
import { Heart, X } from 'lucide-react';
import styles from './Toast.module.css';

export default function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const renderIcon = () => {
    if (type === 'add') {
      return <Heart size={20} color="var(--primary-color)" fill="var(--primary-color)" />;
    } else if (type === 'remove') {
      return <X size={20} color="#ff0000" />;
    }
    return null;
  };

  return (
    <div className={styles.toast}>
      {renderIcon() && <span className={styles.icon}>{renderIcon()}</span>}
      <span className={styles.message}>{message}</span>
    </div>
  );
}
