import styles from './Button.module.scss';

const BUTTON_STYLES = {
  google: 'google-sign-in',
  inverted: 'inverted',
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={styles.button_container} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
