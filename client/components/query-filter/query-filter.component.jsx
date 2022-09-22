import React, { useState } from 'react';
import styles from './QueryFilter.module.scss';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const QueryFilter = ({
  handleFilterChange,
  handleGenderChange,
  handleSortChange,
  clearFilter,
  filter,
}) => {
  const [categoryShow, setCategoryShow] = useState(false);
  const [brandShow, setBrandShow] = useState(false);
  const [priceShow, setPriceShow] = useState(false);
  const [genderSelect, setGenderSelect] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.filter_container}>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.filter_field_container}>
          <div className={styles.genders}>
            <a
              className={`${styles.male} {${genderSelect} === male ? ' active_button : null }`}
              onClick={() => {
                handleGenderChange('male');
                setGenderSelect('male');
              }}
            >
              Men
            </a>
            <a
              className={`${styles.female} { ${genderSelect} === female ? ' active_button : null}`}
              onClick={() => {
                handleGenderChange('female');
                setGenderSelect('female');
              }}
            >
              Women
            </a>
          </div>
        </div>

        <div className={styles.filter_field_container}>
          <div className={styles.name_container}>
            <h1 className={styles.filter_field_name}>Price</h1>
            {!priceShow ? (
              <FiChevronDown onClick={() => setPriceShow(true)} size={15} />
            ) : (
              <FiChevronUp onClick={() => setPriceShow(false)} size={15} />
            )}
          </div>
          {priceShow && (
            <div className={styles.input_fields}>
              <div className={styles.order}>
                <a onClick={() => handleSortChange('ASC')}>low to high</a>
                <a onClick={() => handleSortChange('DESC')}>high to low</a>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="0 1000"
                  value="0 1000"
                  name="price"
                  onChange={handleFilterChange}
                />
                <label htmlFor="0 1000">0-1000</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="0 2000"
                  value="0 2000"
                  name="price"
                  onChange={handleFilterChange}
                />
                <label htmlFor="0 2000">0-2000</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="0 5000"
                  value="0 5000"
                  name="price"
                  onChange={handleFilterChange}
                />
                <label htmlFor="0 5000">0-5000</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="0 20000"
                  value="0 20000"
                  name="price"
                  onChange={handleFilterChange}
                />
                <label htmlFor="0 20000">5000+</label>
              </div>
            </div>
          )}
        </div>

        <div className={styles.filter_field_container}>
          <div className={styles.name_container}>
            <h1 className={styles.filter_field_name}>Category</h1>
            {!categoryShow ? (
              <FiChevronDown onClick={() => setCategoryShow(true)} size={15} />
            ) : (
              <FiChevronUp onClick={() => setCategoryShow(false)} size={15} />
            )}
          </div>
          {categoryShow && (
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="watch"
                  value="watch"
                  name="category"
                  onChange={handleFilterChange}
                />
                <label htmlFor="watch">Watches</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="handbag"
                  value="handbag"
                  name="category"
                  onChange={handleFilterChange}
                />
                <label htmlFor="handbag">handbag</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="shades"
                  value="shades"
                  name="category"
                  onChange={handleFilterChange}
                />
                <label htmlFor="shades">Shades</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="shoes"
                  value="shoe"
                  name="category"
                  onChange={handleFilterChange}
                />
                <label htmlFor="shoes">shoes</label>
              </div>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="belt"
                  value="belt"
                  name="category"
                  onChange={handleFilterChange}
                />
                <label htmlFor="belt">Belt</label>
              </div>
            </div>
          )}
        </div>
        <div className={styles.filter_field_container}>
          <div className={styles.name_container}>
            <h1 className={styles.filter_field_name}>Brand</h1>
            {!brandShow ? (
              <FiChevronDown onClick={() => setBrandShow(true)} size={15} />
            ) : (
              <FiChevronUp onClick={() => setBrandShow(false)} size={15} />
            )}
          </div>
          {brandShow && (
            <div className={styles.input_fields}>
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="gucci"
                  value="gucci"
                  name="brand"
                  onChange={handleFilterChange}
                />
                <label htmlFor="gucci">Gucci</label>
              </div>{' '}
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="rolex"
                  value="rolex"
                  name="brand"
                  onChange={handleFilterChange}
                />
                <label htmlFor="rolex">Rolex</label>
              </div>{' '}
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="balmain"
                  value="balmain"
                  name="brand"
                  onChange={handleFilterChange}
                />
                <label htmlFor="balmain">Balmain</label>
              </div>{' '}
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="givenchi"
                  value="givenchi"
                  name="brand"
                  onChange={handleFilterChange}
                />
                <label htmlFor="givenchi">Givenchy</label>
              </div>{' '}
              <div className={styles.fields}>
                <input
                  type="checkbox"
                  id="hublot"
                  value="hublot"
                  name="brand"
                  onChange={handleFilterChange}
                />
                <label htmlFor="hublot">Hublot</label>
              </div>{' '}
            </div>
          )}
        </div>
        <button
          className={styles.clear_filter_button}
          onClick={() => clearFilter()}
        >
          Clear filter
        </button>
      </form>
    </div>
  );
};

export default QueryFilter;
