import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import axios from 'axios';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import WishlistDropdown from '../wishlist-dropdown/wishlist-dropdown.component';

const Navbar = ({ currentUser, wishlistProducts }) => {
  const [showWishlist, setShowWishlist] = useState(false);

  const { doRequest, errors } = useRequest({
    url: '/api/auth/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  return (
    <div className={styles.navbar}>
      <div className={styles.links_wrapper}>
        {currentUser ? (
          <div className={styles.links_container}>
            <Link href="/signout">
              <a onClick={() => doRequest()}>Sign out</a>
            </Link>
            <Link href="/products/create">
              <a>Sell Product</a>
            </Link>
            {showWishlist && (
              <WishlistDropdown
                setShowWishlist={setShowWishlist}
                wishlistProducts={wishlistProducts}
              />
            )}
            <a onClick={() => setShowWishlist(!showWishlist)}>
              My Wishlist
              <sup style={{ color: 'red' }}>
                {wishlistProducts && wishlistProducts.length > 0
                  ? wishlistProducts.length
                  : null}
              </sup>
            </a>
            <Link href="/profile">
              <a>My Profile</a>
            </Link>
          </div>
        ) : (
          <Link href="/auth">
            <a href="">Sign in</a>
          </Link>
        )}
      </div>
      <div className={styles.logo}>
        <Link href="/">
          <a>
            Luxury <span className={styles.store}>Store</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
