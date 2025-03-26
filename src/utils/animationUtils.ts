
/**
 * Animation utility functions for KilinCar app
 */

// Staggered animation for list items
export const staggeredAnimation = (index: number, baseDelay: number = 0.1) => {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: baseDelay * index,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0] 
      }
    }
  };
};

// Page transition animation
export const pageTransition = {
  initial: { 
    opacity: 0,
    y: 10
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    y: -10,
    transition: { 
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
      staggerChildren: 0.05
    }
  }
};

// Shimmer animation for loading states
export const shimmerAnimation = {
  backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
  backgroundSize: '200% 100%',
  animation: 'shine 1.5s infinite linear'
};

// Random bubble positions
export const createBubbleStyles = () => {
  const size = Math.floor(Math.random() * 20) + 10;
  const bottom = Math.floor(Math.random() * 100);
  const left = Math.floor(Math.random() * 100);
  const delay = Math.random() * 4;
  const duration = Math.random() * 2 + 2;

  return {
    width: `${size}px`,
    height: `${size}px`,
    bottom: `${bottom}%`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  };
};

// Water drop animation
export const waterDropAnimation = (delay: number = 0) => {
  return {
    animation: `water-drop 2s ease-in-out ${delay}s infinite`
  };
};

// Create animated water bubbles
export const createBubbles = (count: number = 10) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: `bubble-${index}`,
    style: createBubbleStyles()
  }));
};

// Animate number counting
export const animateNumber = (
  start: number, 
  end: number, 
  duration: number = 1500, 
  callback: (value: number) => void
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    callback(value);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      callback(end);
    }
  };
  window.requestAnimationFrame(step);
};
