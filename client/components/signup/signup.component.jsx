import React, { useState } from 'react';
import styles from './Signup.module.scss';
import Forminput from '../form-input/form-input.component';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import Button from '../button/button.component';
import { motion } from 'framer-motion';

const defaultFormFields = {
  name: '',
  email: '',
  password: '',
};

const Signup = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, name } = formFields;
  const { doRequest, errors } = useRequest({
    url: '/api/auth/signup',
    body: formFields,
    method: 'post',
    onSuccess: () => Router.back(),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await doRequest();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className={styles.signup_wrapper}
    >
      <form onSubmit={handleSubmit}>
        <Forminput
          type="text"
          required
          label="Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Forminput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <Forminput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />

        <div className={styles.errors}>{errors}</div>
        <Button type="submit">Submit</Button>
      </form>
    </motion.div>
  );
};

export default Signup;
