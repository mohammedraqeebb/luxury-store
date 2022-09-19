import React from 'react';
import styles from './Product.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Product = ({ product }) => {
  const { id, images, name, price, originalPrice } = product;
  return (
    <Link href="/products/[productId]" as={`/products/${id}`}>
      <a>
        <div className={styles.product_card_container}>
          {/* <Image src={images[0]} alt={name} layout="fill" /> */}
          <img src={images[0]} alt={name} />
          <div className={styles.footer}>
            <p className={styles.name}>{name}</p>
            <div className={styles.prices}>
              <p className={styles.originalPrice}>${originalPrice}</p>
              <p className={styles.price}>${price}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Product;
