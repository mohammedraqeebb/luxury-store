import styles from './Forminput.module.scss';

const Forminput = ({ label, ...otherProps }) => {
  return (
    <div className={styles.group}>
      <input className={styles.form_input} {...otherProps} />
      {label && (
        <label
          className={`${otherProps.value !== '' ? styles.shrink : ''} ${
            styles.form_input_label
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default Forminput;
