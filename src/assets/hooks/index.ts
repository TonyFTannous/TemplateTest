import {useState, useEffect} from 'react';
import {useTheme as useRNTheme} from '@react-navigation/native';

import {TTheme} from '@/theme';

//** if your value is a object, be sure to pass it as string using JSON.stringify, and when received parsing it using JSON.parse  */
export const useDebounce = (value: any, delay: number): any => {
  const [debouncedValue, setDebouncedValue] = useState<any>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
};

export const useTheme = () => useRNTheme() as TTheme;
