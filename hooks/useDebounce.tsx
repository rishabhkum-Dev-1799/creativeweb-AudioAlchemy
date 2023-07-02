import { useEffect, useState } from 'react';

// this hook is created just to take the value and written the same value tied to another variable which will be emiited at the particular interval --> This will be used for the typeahead functionality in
function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || 500);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
