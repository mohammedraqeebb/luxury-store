import React, { useState } from 'react';
import styles from './ProductDetailsFull.module.scss';
import Router from 'next/router';
import Link from 'next/link';
import useRequest from '../../hooks/use-request';
import Button from '../button/button.component';
import { motion, AnimatePresence } from 'framer-motion';
import { stagger, fadeInUp } from '../../utils/animation';

const ProductDetailsFull = ({
  product,
  currentUser,
  wishlistProducts,
  productOwnerName,
}) => {
  console.log('w products', wishlistProducts);
  const [addWislistLoading, setAddWislistLoading] = useState(false);
  const {
    id,
    name,
    originalPrice,
    price,
    images,
    description,
    gender,
    status,
    userId,
  } = product;
  const handleEdit = () => {
    Router.push('/products/[productId]/edit', `/products/${id}/edit`);
  };
  const isProductInWishlist =
    currentUser &&
    wishlistProducts &&
    wishlistProducts.find(
      (wishlistProduct) => wishlistProduct.id === product.id
    );
  const isLoggedIn = currentUser && currentUser !== null;
  const isProductOwner = currentUser && currentUser.id === product.userId;

  const { doRequest: createOrder, errors: orderErrors } = useRequest({
    url: '/api/orders/create',
    method: 'post',
    body: {
      productId: currentUser && id,
    },
    onSuccess: (data) => {
      const { order } = data;
      Router.push('/orders/[orderId]', `/orders/${order.id}`);
    },
  });
  const { doRequest: deleteProduct, errors: deleteErrors } = useRequest({
    url: `/api/products/${id}/delete`,
    method: 'post',
    body: {},
    onSuccess: () => {
      Router.push('/profile');
    },
  });
  const { doRequest: addToWishlist, errors: wishlistErrors } = useRequest({
    url: `/api/products/wishlist/create`,
    method: 'post',
    body: {
      productId: product.id,
    },
    onSuccess: () => {
      setAddWislistLoading(false);
      Router.push('/products/[productId]', `/products/${id}`);
    },
  });
  const { doRequest: deleteWishlistProduct, errors: deleteWishlistErrors } =
    useRequest({
      url: '/api/products/wishlist/product/delete',
      method: 'post',
      body: {
        productId: product.id,
      },
      onSuccess: () => Router.reload(),
    });
  const deleteHandler = (event) => {
    event.stopPropagation();
    doRequest();
  };
  return (
    <AnimatePresence exitBeforeEnter>
      <div className={styles.product_details_full_wrapper}>
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.product_details_full_section}
          >
            <div className={styles.product_details}>
              <motion.div
                className={styles.image}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img src={images[0]} alt={name} />
              </motion.div>
              <span>
                Description <br />
              </span>

              <p className={styles.description}>{description}</p>
            </div>
            <motion.div
              className={styles.product_purchase}
              initial="hidden"
              exit="exit"
              animate="animate"
              variants={stagger}
            >
              <Link href="/">
                <a>Back</a>
              </Link>
              {productOwnerName && (
                <p
                  style={{
                    textAlign: 'end',
                    fontSize: '8px',
                    textTransform: 'Capitalize',
                    color: 'gray',
                    marginTop: '8px',
                  }}
                >
                  Posted by : {productOwnerName}
                </p>
              )}
              <motion.p
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className={styles.name}
              >
                {name}
              </motion.p>
              <motion.p
                initial="initial"
                animate="animate"
                variants={fadeInUp}
                className={styles.price}
              >
                ${price}
              </motion.p>
              <p className={styles.original_price}>
                Original Price: ${originalPrice}{' '}
              </p>
              <span>
                you save{' '}
                {Math.floor(((originalPrice - price) / originalPrice) * 100)} %
              </span>
              <p className={styles.gender}>For {gender}</p>
              <h3 className={styles.status}>status : {status}</h3>
              <div className={styles.edit_delete_section}>
                {isProductOwner && <Button onClick={handleEdit}>Edit</Button>}
                <div className="errors"></div>
                {isProductOwner && (
                  <Button onClick={() => deleteProduct()}>Delete</Button>
                )}
              </div>
              <div className="errors">{deleteErrors}</div>
              <div className={styles.wishlist_button}>
                {isLoggedIn && !isProductOwner && !isProductInWishlist && (
                  <Button
                    onClick={() => {
                      setAddWislistLoading(true);
                      addToWishlist();
                    }}
                  >
                    {addWislistLoading ? 'adding...' : 'wishlist+'}
                  </Button>
                )}
                {isLoggedIn && !isProductOwner && isProductInWishlist && (
                  <Button onClick={() => deleteWishlistProduct()}>
                    Remove -
                  </Button>
                )}
              </div>
              <div className="errors">{deleteWishlistErrors}</div>
              <div className="errors">{wishlistErrors}</div>

              {isLoggedIn && !isProductOwner && (
                <button
                  className={styles.purchase_button}
                  onClick={() => createOrder()}
                >
                  Purchase Now
                </button>
              )}

              <div className="errors"> {orderErrors}</div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default ProductDetailsFull;
