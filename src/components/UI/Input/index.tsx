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
import {faXmark, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {View, Text, TextInput, ViewStyle, useColorScheme} from 'react-native';

import IconButton from '@/components/UI/IconButton';

import {useDebounce, useTheme} from '@/assets/hooks';
import {scaleFontSize} from '@/assets/styles/scaling';

import style from '@/components/UI/Input/style';

export type TRef = {
  value: string;
  isTouched: MutableRefObject<boolean>;
  clear: () => void;
  setFocus: () => void;
  setStatus: (val: string) => void;
};

type TProps = {
  id: string;
  label: string;
  value?: string;
  status?: string;
  disabled?: boolean;
  editable?: boolean;
  maxLength?: number;
  multiline?: boolean;
  isTouched?: boolean;
  placeholder?: string;
  isAutoFocus?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'number-pad'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search'
    | 'visible-password';
  autoComplete?:
    | 'additional-name'
    | 'address-line1'
    | 'address-line2'
    | 'birthdate-day'
    | 'birthdate-full'
    | 'birthdate-month'
    | 'birthdate-year'
    | 'cc-csc'
    | 'cc-exp'
    | 'cc-exp-day'
    | 'cc-exp-month'
    | 'cc-exp-year'
    | 'cc-number'
    | 'country'
    | 'current-password'
    | 'email'
    | 'family-name'
    | 'given-name'
    | 'honorific-prefix'
    | 'honorific-suffix'
    | 'name'
    | 'new-password'
    | 'off'
    | 'one-time-code'
    | 'postal-code'
    | 'street-address'
    | 'tel'
    | 'username'
    | 'cc-family-name'
    | 'cc-given-name'
    | 'cc-middle-name'
    | 'cc-name'
    | 'cc-type'
    | 'nickname'
    | 'organization'
    | 'organization-title'
    | 'url'
    | 'gender'
    | 'name-family'
    | 'name-given'
    | 'name-middle'
    | 'name-middle-initial'
    | 'name-prefix'
    | 'name-suffix'
    | 'password'
    | 'password-new'
    | 'postal-address'
    | 'postal-address-country'
    | 'postal-address-extended'
    | 'postal-address-extended-postal-code'
    | 'postal-address-locality'
    | 'postal-address-region'
    | 'sms-otp'
    | 'tel-country-code'
    | 'tel-device'
    | 'tel-national'
    | 'username-new';
  onChangeValue?: (id: string, value: string) => string;
};

const Input: ForwardRefRenderFunction<TRef, TProps> = (
  {
    id,
    label,
    value,
    status,
    disabled,
    editable,
    multiline,
    isTouched,
    maxLength,
    textAlign,
    placeholder,
    isAutoFocus,
    keyboardType,
    autoComplete,
    numberOfLines,
    secureTextEntry,
    onChangeValue,
  },
  ref,
) => {
  const {colors} = useTheme();

  const scheme = useColorScheme();

  const inputRef = useRef<TextInput>(null);
  const isDebounced = useRef<boolean>(true);
  const inputTouched = useRef<boolean>(isTouched || false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isShowSecureText, setIsShowSecureText] =
    useState<boolean>(!!secureTextEntry);
  const [inputValue, setInputValue] = useState<string>(value || '');
  const [inputStatus, setInputStatus] = useState<string>(status || '');

  const debouncedValue = useDebounce(inputValue, 300);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleToggleSecureText = useCallback(() => {
    setIsShowSecureText(prev => !prev);
  }, []);

  const handleClear = useCallback(() => {
    inputTouched.current = true;
    isDebounced.current = false;
    setInputValue('');
    handleFocus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatus = useCallback((val: string) => {
    setInputStatus(val);
  }, []);

  const handleChangeText = useCallback((val: string) => {
    inputTouched.current = true;
    isDebounced.current = true;
    setInputValue(val);
  }, []);

  useImperativeHandle(ref, () => ({
    value: inputValue,
    isTouched: inputTouched,
    clear: handleClear,
    setFocus: handleFocus,
    setStatus: handleStatus,
  }));

  useEffect(() => {
    if (inputTouched.current) {
      if (onChangeValue) {
        const validationMsg = onChangeValue(id, debouncedValue);
        setInputStatus(validationMsg);
      } else {
        setInputStatus('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    setInputStatus(status || '');
  }, [status]);

  useEffect(() => {
    if (value !== inputValue) {
      isDebounced.current = false;
      setInputValue(value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isAutoFocus && inputRef.current) {
      inputRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEyeIcon = !!secureTextEntry && inputValue;

  const eyeIconStyle: ViewStyle = isEyeIcon
    ? {
        flexDirection: 'row',
      }
    : {flexDirection: 'column'};

  const allowInteraction = !disabled && (editable ?? true);

  return (
    <View>
      <Text
        style={[
          style.label,
          {color: colors.label},
          disabled && {color: colors.labelDisabled},
        ]}>
        {label}
      </Text>
      <View style={style.inputContainer}>
        <TextInput
          ref={inputRef}
          value={inputValue}
          maxLength={maxLength}
          multiline={multiline}
          textAlign={textAlign}
          placeholder={placeholder}
          numberOfLines={numberOfLines}
          secureTextEntry={isShowSecureText}
          autoComplete={autoComplete || 'off'}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={colors.placeholder}
          editable={disabled ? false : (editable ?? true)}
          keyboardAppearance={scheme === 'dark' ? 'dark' : 'light'}
          style={[
            style.input,
            {
              borderBottomColor: colors.border,
              color: disabled ? colors.textDisabled : colors.text,
            },
          ]}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChangeText={handleChangeText}
        />
        {isFocused && (
          <View
            style={[
              style.bottomBorderShadow,
              {backgroundColor: colors.secondary, shadowColor: colors.accent},
            ]}
          />
        )}
        {inputValue && allowInteraction && (
          <View style={[style.iconBtnContainer, eyeIconStyle]}>
            {isEyeIcon && (
              <IconButton
                size={scaleFontSize(15)}
                icon={isShowSecureText ? faEye : faEyeSlash}
                onPress={handleToggleSecureText}
              />
            )}
            <IconButton
              icon={faXmark}
              size={scaleFontSize(15)}
              onPress={handleClear}
            />
          </View>
        )}
      </View>
      {inputStatus.length > 0 && <Text style={style.error}>{inputStatus}</Text>}
    </View>
  );
};

export default forwardRef<TRef, TProps>(Input);
