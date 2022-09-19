import React, { Fragment, useRef, useState, useEffect } from 'react';
import styles from './Products.module.scss';
import Product from '../product/product.component';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { parentVariants, childProductVariants } from '../../utils/animation';
import InfiniteScroll from 'react-infinite-scroll';

const Products = ({ products, setPageNumber, hasMoreProducts, pageNumber }) => {
  // const { ref, inView, entry } = useInView({
  //   threshold: 0,
  // });

  // useEffect(() => {
  //   if (hasMoreProducts) {
  //     return;
  //   }

  //   setPageNumber((pageNumber) => pageNumber + 1);

  //   console.log('Element is in view: ', inView);
  // }, [inView]);

  return (
    <Fragment>
      <div className={styles.products_wrapper}>
        <AnimatePresence exitBeforeEnter={true}>
          <motion.div
            variants={parentVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={styles.products_container}
          >
            {products &&
              products.map((product) => {
                return (
                  <motion.div variants={childProductVariants}>
                    <Product key={product.id} product={product} />
                  </motion.div>
                );
              })}
          </motion.div>
        </AnimatePresence>
      </div>
    </Fragment>
  );
};

export default Products;
