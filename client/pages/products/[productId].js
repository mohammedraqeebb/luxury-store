import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductDetailsFull from '../../components/product-details-full/product-details-full.component';
import Comments from '../../components/comments/comments.component';
import styles from '../../styles/ProductDetails.module.scss';

const ProductDetails = ({ wishlistProducts, product, currentUser, productOwnerName, comments }) => {


   return (
      <>
         <div className={styles.product_details_full_wrapper}>
            <ProductDetailsFull productOwnerName={productOwnerName} wishlistProducts={wishlistProducts} product={product} currentUser={currentUser} />
            <Comments productOwnerName={productOwnerName} currentUser={currentUser} product={product} comments={comments} />
         </div>
      </>
   )
}

ProductDetails.getInitialProps = async (context, client, currentUser) => {


   const { productId } = context.query;
   const { data: productData } = await client.get(`/api/products/${productId}`)
   console.log('userId', productData.product.userId);



   const [{ data: productOwnerData }, { data: commentsData }] = await Promise.all([client.post('/api/auth/profile/name', { userId: productData.product.userId }), client.get(`/api/products/${productData.product.id}/comments`)])



   return { product: productData.product, currentUser, comments: commentsData.comments, productOwnerName: productOwnerData.name }
}

export default ProductDetails;