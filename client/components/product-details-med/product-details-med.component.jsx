import React from 'react';
import styles from './ProductDetailsMed.module.scss';
import Router from 'next/router';

const ProductDetailsMed = ({ product }) => {
  const { images, id, name, price, status } = product;
  return (
    <div
      onClick={() => Router.push('/products/[productId]', `/products/${id}`)}
      className={styles.product_details_med_section}
    >
      <div className={styles.product_image}>
        <img src={images[0]} alt={name} />
      </div>
      <div className={styles.product_details}>
        <p className={styles.name}>{name}</p>
        <p className={styles.price}>${price}</p>
        <p className={styles.status}>Status : {status}</p>
      </div>
    </div>
  );
};

export default ProductDetailsMed;
