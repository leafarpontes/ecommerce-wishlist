import styles from './Breadcrumb.module.css';
import React from 'react';

export const Breadcrumb = ({ children }) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      <div className={styles['breadcrumb-container']}>
        {childrenArray.map((child, index) => (
          <React.Fragment key={index}>
            {child}
            {index < childrenArray.length - 1 && (
              <span className={styles['breadcrumb-separator']}>/</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <hr />
    </>
  );
};
