import { useEffect, useState } from 'react';

const useTimeout = (timeout) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  return show;
};

export default useTimeout;
