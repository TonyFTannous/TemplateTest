import React, {memo, useCallback} from 'react';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {View, Text, ScrollView, TouchableWithoutFeedback} from 'react-native';

import IconButton from '@/components/UI/IconButton';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '@/assets/styles/scaling';
import {TThemeColor} from '@/theme';
import {TOption} from '@/components/UI/MultiSelect';

import style from '@/components/UI/MultiSelect/Components/OptionsList/style';

type TOptProps = {
  title: string;
  editable?: boolean;
  disabled?: boolean;
  colors: TThemeColor;
  handleRemove: () => void;
};

const OptionItem: React.FC<TOptProps> = memo(
  ({title, colors, editable, disabled, handleRemove}) => {
    const allowInteraction = !disabled && (editable ?? true);

    return (
      <TouchableWithoutFeedback>
        <View style={[style.option, {backgroundColor: colors.card}]}>
          <View style={allowInteraction && style.titleContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                style.title,
                disabled ? {color: colors.textDisabled} : {color: colors.text},
              ]}>
              {title}
            </Text>
          </View>
          {allowInteraction && (
            <View style={style.actionContainer}>
              <IconButton
                icon={faXmark}
                bgColor={colors.card}
                onPress={handleRemove}
                size={scaleFontSize(14)}
                height={verticalScale(20)}
                width={horizontalScale(20)}
                borderRadius={horizontalScale(10)}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

type TProps = {
  values: string[];
  options: TOption[];
  editable?: boolean;
  disabled?: boolean;
  colors: TThemeColor;
  handleOk: (selected: string[]) => () => void;
};

const OptionsList: React.FC<TProps> = ({
  colors,
  options,
  values,
  editable,
  disabled,
  handleOk,
}) => {
  const handleRemove = useCallback(
    (val: string) => () => {
      const selectedOptions = [...values];
      if (selectedOptions.includes(val)) {
        selectedOptions.splice(
          values.findIndex(el => el === val),
          1,
        );
        handleOk(selectedOptions)();
      }
    },
    [handleOk, values],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={style.scrollContentContainer}>
      {values.map(value => {
        const item = options.find(option => option.value === value);
        if (item) {
          return (
            <OptionItem
              colors={colors}
              key={item.value}
              title={item.label}
              disabled={disabled}
              editable={editable}
              handleRemove={handleRemove(item.value)}
            />
          );
        }
      })}
    </ScrollView>
  );
};

export default memo(OptionsList);
