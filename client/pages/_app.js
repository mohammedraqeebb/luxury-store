import axios from 'axios';
import '../styles/globals.scss'
import Head from 'next/head';
import { useState, useEffect } from 'react';


import useWindowSize from '../hooks/use-window-size';
import useMediaQuery from '../hooks/use-media-query';
import Navbar from '../components/navbar/navbar.component.jsx';

import { GoogleOAuthProvider } from '@react-oauth/google'

import buildClient from '../api/build-client';

const AppComponent = ({ Component, pageProps, wishlistProducts, currentUser }) => {
   const size = useWindowSize();
   const matches = useMediaQuery(600);

   return <>
      <Head>
         <meta
            name="viewport"
            content="width=device-width,minimum-scale=0.5,initial-scale=1"
         />
      </Head>

      <GoogleOAuthProvider clientId='13387992453-04saiq2lr02m8dbj6kmqgchpq9q2no7a.apps.googleusercontent.com'>
         <Navbar wishlistProducts={wishlistProducts} currentUser={currentUser} />


         <Component {...pageProps} wishlistProducts={wishlistProducts} currentUser={currentUser} />
      </GoogleOAuthProvider>

   </>

}


AppComponent.getInitialProps = async (appContext) => {

   const client = buildClient(appContext.ctx);

   const { data } = await client.get('/api/auth/currentuser');

   const { data: wishlistResponse } = await client.get('/api/products/wishlist/get')


   let pageProps = {};
   if (appContext.Component.getInitialProps) {

      pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser, wishlistResponse.wishlistProducts);
   }

   return { ...data, wishlistProducts: wishlistResponse.wishlistProducts, pageProps };
}

export default AppComponent;
