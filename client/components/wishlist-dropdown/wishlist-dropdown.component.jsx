import React from 'react';
import styles from './WishlistDropdown.module.scss';
import WishlistProduct from '../wishlist-product/wishlist-product.component';
import { motion } from 'framer-motion';

const WishlistDropdown = ({ wishlistProducts, setShowWishlist }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={styles.wishlist_dropdown_container}
    >
      <div className={styles.wishlist_products}>
        {wishlistProducts &&
          wishlistProducts.map((product) => (
            <WishlistProduct
              setShowWishlist={setShowWishlist}
              key={product.id}
              product={product}
            />
          ))}
        {wishlistProducts.length === 0 && (
          <p className={styles.empty_message}>your wishlist is empty</p>
        )}
      </div>
    </motion.div>
  );
};

export default WishlistDropdown;
