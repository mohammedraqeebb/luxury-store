import { motion } from 'framer-motion';
import styles from './Backdrop.module.scss';

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.Backdrop}
      onClick={() => onClick}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
