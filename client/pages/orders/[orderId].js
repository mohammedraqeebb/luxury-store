import React, { useState, useEffect } from 'react'
import ProductDetailsMed from '../../components/product-details-med/product-details-med.component'
import useRequest from '../../hooks/use-request';
import StripeCheckOut from 'react-stripe-checkout';
import Router from 'next/router';
import styles from '../../styles/OrderDetails.module.scss'

const OrderDetails = ({ order, currentUser }) => {
   console.log(order);
   const [timeLeft, setTimeLeft] = useState(null);
   const { product } = order;
   const { doRequest, errors } = useRequest({
      url: '/api/payments',
      method: 'post',
      body: {
         orderId: order.id
      },
      onSuccess: () => Router.push('/')
   })
   useEffect(() => {
      const findTimeLeft = () => {
         const msLeft = new Date(order.expiresAt) - new Date();
         setTimeLeft(Math.round(msLeft / 1000));
      };
      findTimeLeft();
      const timerId = setInterval(findTimeLeft, 1000);

      return () => {
         clearInterval(timerId);
      }
   }, [])

   if (timeLeft < 0) {
      Router.push('/')
      return <h3>time expired to place the order</h3>
   }
   return (
      <div className={styles.order_details_wrapper}>
         <div className={styles.order_details_section}>
            <h1> Order Details</h1>

            <ProductDetailsMed product={product} />
            <p>You have <span>{timeLeft} </span>seconds to place the order</p>
            <div className={styles.pay_button}>
               <StripeCheckOut
                  token={({ id }) => doRequest({ token: id })}
                  stripeKey="pk_test_51LYb3bSHEZ2ipbEo13NA03DqSXeM2WOPTnezbosj3b1KRHlT6giiNJH4nI35miS30FTGF5S2i4bg3cNI0xNMD1Hu00ezlA7Esx"
                  amount={order.product.price * 100}
                  email={currentUser.email}
               />
            </div>
            {errors}
         </div>
      </div>
   )
}

OrderDetails.getInitialProps = async (context, client) => {
   const { orderId } = context.query;
   console.log(orderId);
   const { data } = await client.get(`/api/orders/${orderId}`);
   return { order: data };
}

export default OrderDetails;
