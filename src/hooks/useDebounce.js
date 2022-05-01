import { useEffect, useState } from "react";

export default function useDebounce(initialValue = "", delay = 1000) {
  const [queryDebounce, setQueryDebounce] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQueryDebounce(initialValue);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);

  return queryDebounce;
}
