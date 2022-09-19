import React, { useState } from 'react'
import ProductForm from '../../components/product-form/productForm.component'
import useRequest from '../../hooks/use-request';
import Router from 'next/router';

const defaultFormFields = {
   displayName: '',
   category: '',
   gender: '',
   price: '',
   originalPrice: '',
   description: '',
   brand: '',
};

const Create = ({ currentUser }) => {

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };
   const handleImage = (event) => {
      setImages([event.target.files[0]]);
   };
   const [formFields, setFormFields] = useState(defaultFormFields);
   const [images, setImages] = useState([]);

   const { displayName, ...fields } = formFields;

   const { doRequest, errors } = useRequest({
      url: '/api/products/create',
      body: {
         name: displayName,
         ...fields,
         images: [
            'https://cdn-images.farfetch-contents.com/18/48/73/47/18487347_40722501_480.jpg',
         ],
         userId: currentUser && currentUser.id,
      },
      method: 'post',
      onSuccess: (data) => {
         const { product } = data;
         const { id } = product;
         Router.push('/products/[productId]', `/products/${id}`);
      },
   });
   return (
      <ProductForm handleImage={handleImage} handleChange={handleChange} doRequest={doRequest} errors={errors} formFields={formFields} currentUser={currentUser} />
   )
}

export default Create
