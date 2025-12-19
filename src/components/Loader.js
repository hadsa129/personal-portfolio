import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <motion.div
        className="loader"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="loader-circle"></div>
      </motion.div>
    </div>
  );
};

export default Loader;