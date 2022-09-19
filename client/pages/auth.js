import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';

import styles from '../styles/Auth.module.scss';
import Signin from '../components/signin/signin.component';
import Signup from '../components/signup/signup.component';

import ConnectAccount from '../components/connect-account/connect-account.component';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import useRequest from '../hooks/use-request';
import Router from 'next/router';


const formFields = {
   email: '',
   password: ''
}

const Auth = ({ currentUser }) => {
   const [signupShow, setSignupShow] = useState(true);
   const [connectAccount, setConnectAccount] = useState(false);
   const [connectAccountData, setConnectAccountsData] = useState(formFields);
   const { doRequest, errors } = useRequest({
      url: '/api/auth/googlesignin',
      body: {},
      method: 'post',
      onSuccess: (data) => {
         if (data.message) {
            setConnectAccount(true);
            setConnectAccountsData(data.user)

         }
         else {
            Router.back();
         }
      }
   })
   return (

      <div className={styles.auth_wrapper}>
         <motion.div
            className={styles.auth_section}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
         >
            <FiX onClick={() => Router.back()} className={styles.close_icon} size={25} />
            {!connectAccount && <div>
               <div className={styles.buttons}>
                  <button className={signupShow === true ? styles.active_button : null} onClick={() => setSignupShow(true)}>Sign up</button>
                  <button className={signupShow === false ? styles.active_button : null} onClick={() => setSignupShow(false)}>Sign in</button>
               </div>
               {signupShow ? <Signup /> : <Signin />}
               <motion.div className={styles.google_button} initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}>
                  <GoogleLogin

                     onSuccess={(response) => doRequest({ token: response.credential })}
                     onError={(response) => console.log(response)}
                     theme="filled_black"
                     width='10rem'
                     size='small'
                     type='standard'
                     shape='rectangular'

                  />
               </motion.div>
            </div>}
            {connectAccount && <ConnectAccount formFields={connectAccountData} />}
         </motion.div>
      </div>

   );
};

export default Auth;
