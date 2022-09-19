import React from 'react';
import styles from './WishlistProduct.module.scss';
import Router from 'next/router';
import { FiTrash } from 'react-icons/fi';
import useRequest from '../../hooks/use-request';
const WishlistProduct = ({ product, setShowWishlist }) => {
  const { id, name, price, images } = product;
  const { doRequest, errors } = useRequest({
    url: '/api/products/wishlist/delete',
    method: 'post',
    body: {
      productId: id,
    },
    onSuccess: () => Router.reload(),
  });
  const deleteHandler = (event) => {
    event.stopPropagation();
    doRequest();
  };

  return (
    <div>
      <div
        onClick={() => {
          Router.push('/products/[productId]', `/products/${id}`);
          setShowWishlist(false);
        }}
        className={styles.product_container}
      >
        <img src={images[0]} alt={`${name}`} />
        <div className={styles.product_details}>
          <span className={styles.name}>{name.substring(0, 10)}</span>
          <span className={styles.price}>${price}</span>
        </div>

        <FiTrash
          onClick={(event) => deleteHandler(event)}
          size={25}
          style={{
            margin: 'auto',
            // border: '1px solid #171717',
          }}
        />
      </div>
      <div>{errors}</div>
    </div>
  );
};

export default WishlistProduct;
