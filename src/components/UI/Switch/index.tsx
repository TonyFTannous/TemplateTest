import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  MutableRefObject,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import {Switch as RNSwitch, useColorScheme, View} from 'react-native';

import {useTheme} from '@/assets/hooks';

import style from '@/components/UI/Switch/style';

export type TRef = {
  value: boolean;
  isTouched: MutableRefObject<boolean>;
  clear: () => void;
};

type TProps = {
  id: string;
  value?: boolean;
  isTouched?: boolean;
  onChangeValue?: (id: string, value: boolean) => string;
};

const Switch: ForwardRefRenderFunction<TRef, TProps> = (
  {id, value, isTouched, onChangeValue},
  ref,
) => {
  const {colors} = useTheme();

  const scheme = useColorScheme();

  const switchTouched = useRef<boolean>(isTouched || false);

  const [switchValue, setSwitchValue] = useState<boolean>(value || false);

  const toggleSwitch = useCallback(
    () => setSwitchValue(previousState => !previousState),
    [],
  );

  const handleClear = useCallback(() => {
    switchTouched.current = true;
    setSwitchValue(false);
  }, []);

  useImperativeHandle(ref, () => ({
    value: switchValue,
    isTouched: switchTouched,
    clear: handleClear,
  }));

  useEffect(() => {
    if (switchTouched.current) {
      if (onChangeValue) {
        onChangeValue(id, switchValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchValue]);

  useEffect(() => {
    if (value !== switchValue) {
      setSwitchValue(value || false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <View style={style.switchContainer}>
      <RNSwitch
        value={switchValue}
        onValueChange={toggleSwitch}
        thumbColor={
          switchValue
            ? colors.primary
            : scheme === 'dark'
              ? colors.text
              : undefined
        }
        trackColor={{false: colors.placeholder, true: colors.secondary}}
      />
    </View>
  );
};

export default forwardRef<TRef, TProps>(Switch);
