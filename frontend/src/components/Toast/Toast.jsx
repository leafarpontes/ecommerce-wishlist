import { useEffect } from 'react';
import { Heart, HeartOff } from 'lucide-react';
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
      return <HeartOff size={20} color="var(--primary-color)" />;
    }
    return null;
  };

  const icon = renderIcon();

  return (
    <div className={styles.toast}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.message}>{message}</span>
    </div>
  );
}
