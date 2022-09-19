import React, { useState } from 'react'
import styles from '../styles/Profile.module.scss';
import ProductDetailsMed from '../components/product-details-med/product-details-med.component';
import Link from 'next/link';
import UserName from '../components/user-name/user-name.component';
import { motion } from 'framer-motion';
import OrderDetails from '../components/order-details/order-details.component';
import { parentVariants, childProductVariants } from '../utils/animation'

const Profile = ({ products, orders, currentUser }) => {
   const [showProducts, setShowProducts] = useState(true);
   console.log(products, orders);

   return (
      <div className={styles.profile_wrapper}>
         <motion.div className={styles.profile_section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

         >
            <div className={styles.profile_sidebar}>
               <UserName currentUser={currentUser} />
               <p className={styles.name}>{currentUser.name}</p>
               <ul className={styles.profile_list}>
                  <li onClick={() => setShowProducts(true)}>My Products</li>
                  <li onClick={() => setShowProducts(false)}>My Orders</li>
               </ul>
            </div>
            <div className={styles.profile_details} >
               <Link href="/"><a ><span className={styles.back_button}>Back</span></a></Link>

               {showProducts && <motion.div
               >

                  <h2>Your Products</h2>
                  <div className={styles.profile_products}
                     initial="hidden"
                     animate="show"
                     exit="exit"
                     variants={parentVariants}>
                     {products && products.map(product =>
                        <motion.div variants={childProductVariants}>
                           <ProductDetailsMed key={product.id} product={product} />
                        </motion.div>)
                     }
                  </div>
                  {products.length === 0 && <h1 className={styles.empty_list}>You do not have any products listed for sale</h1>}
               </motion.div>}

               {!showProducts && <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}>
                  <h2>Your Orders</h2>
                  <motion.div className={styles.profile_orders}
                     initial="hidden"
                     animate="show"
                     exit="exit"
                     variants={parentVariants}>
                     {orders &&
                        orders.map(order =>
                           <motion.div variants={childProductVariants}><OrderDetails key={order.id} order={order} />
                           </motion.div>)
                     }
                  </motion.div>
                  {orders.length === 0 && <h1 className={styles.empty_list}>You do not have any orders</h1>}
               </motion.div>}
            </div>
         </motion.div>
      </div>
   )
}

Profile.getInitialProps = async (context, client, currentUser) => {
   const [{ data: productsData }, { data: ordersData }] = await Promise.all([client.get('/api/products'), client.get('/api/orders')])
   return { products: productsData.products, orders: ordersData.orders }
}

export default Profile;