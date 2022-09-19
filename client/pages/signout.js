import { useEffect } from 'react';
import Router from 'next/router'
import useRequest from '../hooks/use-request';


const Signout = () => {
   const { doRequest } = useRequest({
      url: '/api/auth/signout',
      method: 'get',
      body: {},
      onSuccess: () => Router.push('/')
   })
   useEffect(() => {
      doRequest();
   }, [])
   const styles = { display: "flex", height: "100vh", width: "100vw", justifyContent: "center", alignItems: "center", fontSize: "2rem", color: "black" }

   return <div style={styles}>Signing you out</div>

}

export default Signout;