import React, { useState } from 'react';
import styles from './ConnectAccount.module.scss';
import Forminput from '../form-input/form-input.component';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
import Button from '../button/button.component';

const ConnectAccount = ({ formFields }) => {
  const [password, setPassword] = useState(formFields.password);
  const { doRequest, errors } = useRequest({
    url: '/api/auth/signin',
    body: {
      email: formFields.email,
      password,
      type: 'googlesignin',
    },
    method: 'post',
    onSuccess: () => Router.push('/'),
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div className={styles.connect_account_section}>
      <p>
        You already have an account with this email, enter your password to
        connect with your <span>google</span> account
      </p>
      <form onSubmit={handleSubmit}>
        <Forminput
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button>submit</Button>
        <div>{errors}</div>
      </form>
    </div>
  );
};

export default ConnectAccount;
