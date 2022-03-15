import { useEffect, useState } from 'react';
import { ArrowUpCircleFill } from 'react-bootstrap-icons';

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.scrollY > 400) {
        setShowScroll(true);
      } else if (showScroll && window.scrollY <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <ArrowUpCircleFill
      role='button'
      className='scrollTop'
      onClick={scrollTop}
      onKeyDown={scrollTop}
      style={{ display: showScroll ? 'flex' : 'none' }}
    />
  );
};

export default ScrollArrow;
