import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
   render() {
      return (
         <Html>
            <Head>

               <link
                  href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
                  rel="stylesheet"
               />
               <link href="https://fonts.googleapis.com/css2?family=Gentium+Book+Basic:ital,wght@0,400;0,700;1,700&display=swap" rel="stylesheet"></link>
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}

export default MyDocument;