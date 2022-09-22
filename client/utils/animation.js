let easing = [0.6, -0.05, 0.01, 0.99];
export const parentVariants = {
   hidden: {
      opacity: 0,
   },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.05,
      },
   },
   exit: {
      opacity: 0,
   },
};

export const childProductVariants = {
   hidden: {
      opacity: 0,
   },
   show: {
      opacity: 1,
      transition: {
         duration: 0.3,
      },
   },
   exit: {
      opacity: 0,
   },
};

export const stagger = {
   initial: {
      opacity: 0
   },
   animate: {
      opacity: 1,
      transition: {
         staggerChildren: 0.05
      }
   },
   exit: {
      opacity: 1
   }
};

export const fadeInUp = {
   initial: {
      y: 10,
      opacity: 0,
      transition: { duration: 0.6, ease: easing }
   },
   animate: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.6,
         ease: easing
      }
   }
};
