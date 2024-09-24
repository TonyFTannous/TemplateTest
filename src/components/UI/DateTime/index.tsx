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
import dayjs, {Dayjs} from 'dayjs';
import {faXmark, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {View, Text, TextInput, TouchableWithoutFeedback} from 'react-native';

import IconButton from '@/components/UI/IconButton';
import Modal from '@/components/UI/DateTime/Component/ModalPicker';

import {useTheme} from '@/assets/hooks';
import {scaleFontSize} from '@/assets/styles/scaling';
import {convertStringToDateTime} from '@/assets/helper';

import style from '@/components/UI/DateTime/style';

export type TRef = {
  value: string;
  isTouched: MutableRefObject<boolean>;
  clear: () => void;
  setFocus: () => void;
  setStatus: (val: string) => void;
};

export type TView = 'date' | 'time';
export type TFormat =
  | 'MM-DD-YYYY'
  | 'DD-MM-YYYY'
  | 'YYYY-MM-DD'
  | 'HH:mm'
  | 'hh:mm A';

type TProps = {
  id: string;
  view?: TView;
  label: string;
  value?: string;
  format: TFormat;
  status?: string;
  minDate?: string; // must be in format 'YYYY-MM-DD'
  maxDate?: string; // must be in format 'YYYY-MM-DD'
  editable?: boolean;
  disabled?: boolean;
  isTouched?: boolean;
  placeholder?: string;
  isAutoFocus?: boolean;
  mode?: 'single'; // | 'range' | 'multiple';
  textAlign?: 'left' | 'center' | 'right';
  onChangeValue?: (id: string, value: string) => string;
};

const DateTime: ForwardRefRenderFunction<TRef, TProps> = (
  {
    id,
    mode,
    view,
    label,
    value,
    status,
    format,
    minDate,
    maxDate,
    editable,
    disabled,
    isTouched,
    textAlign,
    placeholder,
    isAutoFocus,
    onChangeValue,
  },
  ref,
) => {
  const {colors} = useTheme();

  const modeSelected = mode || 'single';
  const viewSelected = view === 'date' ? 'day' : view || 'day';
  const timeDate = view === 'time' ? dayjs().format('YYYY-MM-DD') : undefined;

  const inputRef = useRef<TextInput>(null);
  const inputTouched = useRef<boolean>(isTouched || false);

  const [dateValue, setDateValue] = useState<Dayjs>(
    convertStringToDateTime(value || '', format, viewSelected),
  );
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value || '');
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
    setDateValue(dayjs());
    setInputValue('');
    handleFocus();
  }, [handleFocus]);

  const handleStatus = useCallback((val: string) => {
    setInputStatus(val);
  }, []);

  const handleOk = useCallback(
    (val: Dayjs) => () => {
      try {
        inputTouched.current = true;
        if (val) {
          setDateValue(val);
          setInputValue(val.format(format));
        } else {
          setDateValue(dayjs());
          setInputValue('');
        }
      } catch {
        setDateValue(dayjs());
        setInputValue('');
      } finally {
        setModalVisible(false);
        handleFocus();
      }
    },
    [format, handleFocus],
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
    isTouched: inputTouched,
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
      setDateValue(convertStringToDateTime(value || '', format, viewSelected));
      setInputValue(value || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isAutoFocus) {
      handleFocus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {/* Fake TextInput for handle focusing */}
          <TextInput
            ref={inputRef}
            onBlur={handleOnBlur}
            onFocus={handleOnFocus}
            style={style.hideInput}
            showSoftInputOnFocus={false}
          />
          <TextInput
            editable={false}
            value={inputValue}
            pointerEvents="none"
            textAlign={textAlign}
            placeholder={placeholder}
            placeholderTextColor={colors.placeholder}
            style={[
              style.input,
              {
                borderBottomColor: colors.border,
                color: disabled ? colors.textDisabled : colors.text,
              },
            ]}
          />
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
              {inputValue && (
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
        <Modal
          value={dateValue}
          minDate={minDate}
          maxDate={maxDate}
          timeDate={timeDate}
          modeSelected={modeSelected}
          viewSelected={viewSelected}
          handleOk={handleOk}
          handleCloseModal={handleCloseModal}
        />
      )}
      {inputStatus.length > 0 && <Text style={style.error}>{inputStatus}</Text>}
    </View>
  );
};

export default forwardRef<TRef, TProps>(DateTime);
