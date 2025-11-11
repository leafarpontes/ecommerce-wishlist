import styles from './Message.module.css';

export const Message = ({ variant, children }) => {
  return (
    <div className={styles[`${variant}-container`]}>
      <p>
        {children}
      </p>
    </div>
  )
}
