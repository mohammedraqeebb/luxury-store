import React from 'react';
import styles from './UserName.module.scss';

const UserName = ({ currentUser }) => {
  const { name } = currentUser;
  const nameArray = name.split(' ');
  const firstLetters =
    nameArray.length >= 2
      ? `${nameArray[0][0]}${nameArray[1][0]}`
      : `${nameArray[0][0]}`;
  return (
    <div className={styles.logo}>
      <p>{firstLetters}</p>
    </div>
  );
};

export default UserName;
