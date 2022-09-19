import axios from 'axios'
import React, { useState } from 'react'
import ProductForm from '../../../components/product-form/productForm.component'
import useRequest from '../../../hooks/use-request'
import Router from 'next/router';

const ProductEdit = ({ currentUser, product }) => {
   const recievedFormFields = {
      displayName: product.name,
      category: product.category,
      gender: product.gender,
      price: product.price,
      originalPrice: product.originalPrice,
      description: product.description,
      brand: product.brand,
   };
   console.log(product)

   const [formFields, setFormFields] = useState(recievedFormFields);

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };
   const handleImage = (event) => {
      setImages([event.target.files[0]]);
   };
   const [images, setImages] = useState([]);
   const { displayName, ...fields } = formFields;
   console.log(fields);
   console.log(displayName);
   const { doRequest, errors } = useRequest({
      url: `/api/products/${product.id}`,
      body: {
         name: displayName,
         ...fields,
         images: [
            'https://cdn-images.farfetch-contents.com/18/37/99/40/18379940_40379425_1000.jpg',
         ],
         userId: currentUser.id,
      },
      method: 'put',
      onSuccess: (data) => {
         const { product } = data;
         const { id } = product;
         Router.push('/products/[productId]', `/products/${id}`);
      },
   });

   return (
      <div>

         <ProductForm currentUser={currentUser} formFields={recievedFormFields} handleChange={handleChange} handleImage={handleImage} doRequest={doRequest} errors={errors} />
      </div>
   )
}
ProductEdit.getInitialProps = async (context, client, currentUser) => {
   const { productId } = context.query;
   console.log('productId', productId);
   const { data } = await axios.get(`/api/products/${productId}`);


   return { product: data.product, currentUser }
}
export default ProductEdit
