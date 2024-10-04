import { useEffect, useRef } from "react";

interface inViewPortProps {
  callback: () => void;
}

const InViewPort: React.FC<inViewPortProps> = ({ callback }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer on component unmount
    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callback]);

  return <div ref={ref} />;
};

export default InViewPort;
