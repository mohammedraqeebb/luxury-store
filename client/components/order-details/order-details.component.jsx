import Router from 'next/router';
import React from 'react';
import styles from './OrderDetails.module.scss';

const OrderDetails = ({ order }) => {
  const { product, status } = order;
  const { images, name, price } = product;
  return (
    <div
      onClick={() =>
        Router.push('/products/[productId]', `/products/${order.product.id}`)
      }
    >
      <div className={styles.order_details_section}>
        <div className={styles.order_image}>
          <img src={images[0]} alt={name} />
        </div>
        <div className={styles.order_details}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>${price}</p>
          <p className={styles.status}>Order Status : {status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
