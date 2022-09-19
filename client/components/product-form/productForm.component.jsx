import React from 'react';
import styles from './ProductForm.module.scss';
import Forminput from '../form-input/form-input.component';
import Button from '../button/button.component';

const ProductForm = ({
  handleChange,
  handleImage,
  doRequest,
  errors,
  formFields,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  const {
    displayName,
    category,
    gender,
    price,
    originalPrice,
    description,
    brand,
  } = formFields;
  console.log('formFields', formFields);
  return (
    <div className={styles.product_form_wrapper}>
      <div className={styles.product_form_section}>
        <form className={styles.product_form} onSubmit={handleSubmit}>
          <h1>Sell Product Form</h1>
          <Forminput
            type="text"
            required
            defaultValue={displayName}
            name="displayName"
            label="Name"
            minLength="5"
            maxLength="50"
            onChange={handleChange}
          />
          <div className={styles.prices}>
            <Forminput
              type="number"
              required
              defaultValue={price}
              name="price"
              label="Price"
              min="0"
              max="20000"
              onChange={handleChange}
            />
            <Forminput
              type="number"
              required
              defaultValue={originalPrice}
              name="originalPrice"
              label="Original Price"
              min="0"
              max="20000"
              onChange={handleChange}
            />
          </div>
          <Forminput
            type="text"
            required
            defaultValue={description}
            name="description"
            label="Description"
            minLength="10"
            maxLength="500"
            onChange={handleChange}
          />
          <div className={styles.select}>
            <label>Brand:</label>
            <select onChange={handleChange} name="brand" value={brand} required>
              <option value="">Please choose an option</option>
              <option value="gucci">Gucci</option>
              <option value="rolex">Rolex</option>
              <option value="balmain">Balmain</option>
              <option value="givenchi">Givenchy</option>
              <option value="hublot">Hublot</option>
            </select>
          </div>
          <div className={styles.select}>
            <label>Category:</label>
            <select
              onChange={handleChange}
              name="category"
              value={category}
              required
            >
              <option value="">Please choose an option</option>
              <option value="watch">Watch</option>
              <option value="handbag">Handbag</option>
              <option value="shoe">shoes</option>
              <option value="jewelry">Jewelry</option>
              <option value="shades">Shades</option>
              <option value="belt">Belt</option>
              <option value="bag">Bag</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>
          <div className={styles.select}>
            <label>Gender:</label>
            <select
              required
              onChange={handleChange}
              name="gender"
              value={gender}
            >
              <option value="">Please choose an option</option>
              <option value="male">men</option>
              <option value="female">women</option>
            </select>
          </div>
          <input
            className={styles.file_upload}
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
          <div className={styles.checkbox_container}>
            <input type="checkbox" className={styles.checkbox} required />
            <label>The information I have provided is true</label>
          </div>
          <div className={styles.errors}>{errors}</div>
          <div className={styles.create_product_button}>
            <Button type="submit">submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
