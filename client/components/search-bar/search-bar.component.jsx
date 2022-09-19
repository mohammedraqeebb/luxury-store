import React, { useState } from 'react';
import styles from './Searchbar.module.scss';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ searchChangeHandler }) => {
  return (
    <div className={styles.searchbar_wrapper}>
      <div>
        <span className={styles.search_icon}>
          <FiSearch size={10} color="gray" />
        </span>
        <input type="search" onChange={(e) => searchChangeHandler(e)} />
      </div>
    </div>
  );
};

export default Searchbar;
