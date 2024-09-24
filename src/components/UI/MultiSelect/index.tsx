import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useCallback,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import {faXmark, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';

import ModalList from './Components/ModalList';
import IconButton from '@/components/UI/IconButton';
import OptionsList from '@/components/UI/MultiSelect/Components/OptionsList';

import {useTheme} from '@/assets/hooks';
import {horizontalScale, scaleFontSize} from '@/assets/styles/scaling';

import style from '@/components/UI/MultiSelect/style';

export type TRef = {
  value: string[];
  isTouched: boolean;
  clear: () => void;
  setFocus: () => void;
  setStatus: (val: string) => void;
};

export type TOption = {
  label: string;
  value: string;
};

type TProps = {
  id: string;
  title: string;
  label: string;
  status?: string;
  value?: string[];
  editable?: boolean;
  disabled?: boolean;
  maxHeight?: number;
  options: TOption[];
  isTouched?: boolean;
  placeholder?: string;
  isAutoFocus?: boolean;
  multiSelect?: boolean;
  onChangeValue?: (id: string, value: string[]) => string;
};

const MultiSelect: ForwardRefRenderFunction<TRef, TProps> = (
  {
    id,
    label,
    value,
    title,
    status,
    options,
    editable,
    disabled,
    isTouched,
    maxHeight,
    placeholder,
    isAutoFocus,
    multiSelect,
    onChangeValue,
  },
  ref,
) => {
  const {colors} = useTheme();

  const inputRef = useRef<TextInput>(null);
  const inputTouched = useRef<boolean>(isTouched || false);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string[]>(value || []);
  const [inputStatus, setInputStatus] = useState<string>(status || '');

  const handleFocus = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleClear = useCallback(() => {
    inputTouched.current = true;
    setInputValue([]);
    handleFocus();
  }, [handleFocus]);

  const handleStatus = useCallback((val: string) => {
    setInputStatus(val);
  }, []);

  const handleOk = useCallback(
    (selected: string[]) => () => {
      inputTouched.current = true;
      setInputValue(selected);
      setModalVisible(false);
      handleFocus();
    },
    [handleFocus],
  );

  const handleOpenModal = useCallback(() => {
    setModalVisible(true);
    handleFocus();
  }, [handleFocus]);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    handleFocus();
  }, [handleFocus]);

  useImperativeHandle(ref, () => ({
    value: inputValue,
    isTouched: inputTouched.current,
    clear: handleClear,
    setFocus: handleFocus,
    setStatus: handleStatus,
  }));

  useEffect(() => {
    if (inputTouched.current) {
      if (onChangeValue) {
        const validationMsg = onChangeValue(id, inputValue);
        setInputStatus(validationMsg);
      } else {
        setInputStatus('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    setInputStatus(status || '');
  }, [status]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isAutoFocus) {
      handleFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inpuValueLen = inputValue.length;

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
      <TouchableWithoutFeedback
        style={style.inputContainer}
        onPress={allowInteraction ? handleOpenModal : undefined}>
        <View>
          <View
            style={[
              style.input,
              {borderBottomColor: colors.border},
              maxHeight ? {maxHeight: horizontalScale(maxHeight)} : {},
            ]}>
            {/* Fake TextInput for handle focusing */}
            <TextInput
              ref={inputRef}
              onBlur={handleOnBlur}
              onFocus={handleOnFocus}
              style={style.hideInput}
              showSoftInputOnFocus={false}
            />
            {inpuValueLen > 0 && (
              <OptionsList
                colors={colors}
                options={options}
                values={inputValue}
                disabled={disabled}
                editable={editable}
                handleOk={handleOk}
              />
            )}
            {placeholder && inpuValueLen === 0 && (
              <Text
                style={[style.inputPlaceHolder, {color: colors.placeholder}]}>
                {placeholder}
              </Text>
            )}
          </View>
          {isFocused && (
            <View
              style={[
                style.bottomBorderShadow,
                {
                  shadowColor: colors.accent,
                  backgroundColor: colors.secondary,
                },
              ]}
            />
          )}
          {allowInteraction && (
            <View style={style.iconBtnContainer}>
              {inpuValueLen > 0 && (
                <IconButton
                  icon={faXmark}
                  size={scaleFontSize(15)}
                  onPress={handleClear}
                />
              )}
              <IconButton
                icon={faChevronDown}
                size={scaleFontSize(15)}
                onPress={handleOpenModal}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      {modalVisible && (
        <ModalList
          title={title}
          options={options}
          selected={inputValue}
          multiSelect={multiSelect}
          handleOk={handleOk}
          handleCloseModal={handleCloseModal}
        />
      )}
      {inputStatus.length > 0 && <Text style={style.error}>{inputStatus}</Text>}
    </View>
  );
};

export default forwardRef<TRef, TProps>(MultiSelect);
