import React, {memo, useCallback, useState} from 'react';
import {faSquare} from '@fortawesome/free-regular-svg-icons';
import {faSquareCheck} from '@fortawesome/free-solid-svg-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {View, Modal, FlatList, TouchableOpacity, Text} from 'react-native';

import Title from '@/components/Title';
import Search from '@/components/UI/Search';

import {TThemeColor} from '@/theme';
import {useTheme} from '@/assets/hooks';
import {TOption} from '@/components/UI/MultiSelect';
import {horizontalScale, scaleFontSize} from '@/assets/styles/scaling';

import style from '@/components/UI/MultiSelect/Components/ModalList/style';

type TOptProps = {
  label: string;
  value: string;
  colors: TThemeColor;
  isSelected: boolean;
  handleSelectedOptions: (val: string) => () => void;
};

const OptionItem: React.FC<TOptProps> = memo(
  ({label, value, colors, isSelected, handleSelectedOptions}) => {
    return (
      <TouchableOpacity onPress={handleSelectedOptions(value)}>
        <View
          style={[
            style.optionContainer,
            {
              borderBottomColor: colors.border,
            },
          ]}>
          <View style={style.optionTextContainer}>
            <Text
              numberOfLines={3}
              ellipsizeMode="tail"
              style={[style.optionText, {color: colors.text}]}>
              {label}
            </Text>
          </View>
          <FontAwesomeIcon
            icon={isSelected ? faSquareCheck : faSquare}
            color={isSelected ? colors.primary : colors.icons}
            size={scaleFontSize(18)}
          />
        </View>
      </TouchableOpacity>
    );
  },
);

type TProps = {
  title: string;
  options: TOption[];
  selected: string[];
  multiSelect?: boolean;
  handleCloseModal: () => void;
  handleOk: (selected: string[]) => () => void;
};

const ModalList: React.FC<TProps> = ({
  title,
  options,
  selected,
  multiSelect,
  handleOk,
  handleCloseModal,
}) => {
  const {colors} = useTheme();

  const insets = useSafeAreaInsets();

  const [data, setData] = useState<TOption[]>(options);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selected);

  const handleSearch = useCallback(
    async (value: string) => {
      setData(
        options.filter(option =>
          option.label.toUpperCase().includes(value.toUpperCase()),
        ),
      );
    },
    [options],
  );

  const handleSelectedOptions = useCallback(
    (val: string) => () => {
      const values = [...selectedOptions];
      if (!multiSelect) {
        values.splice(0, values.length);
        values.push(val);
      } else if (values.includes(val)) {
        values.splice(
          values.findIndex(el => el === val),
          1,
        );
      } else {
        values.push(val);
      }
      setSelectedOptions(values);
    },
    [multiSelect, selectedOptions],
  );

  const keyExtractor = useCallback((item: TOption) => item.value, []);

  const handleEmptyComponent = useCallback(
    () => (
      <View style={style.emptyContainer}>
        <Text style={[style.emptyText, {color: colors.placeholder}]}>
          No data found
        </Text>
      </View>
    ),
    [colors.placeholder],
  );

  const handleRenderItem = useCallback(
    ({item}: {item: TOption}) => {
      const isSelected =
        selectedOptions.findIndex(option => option === item.value) >= 0;
      return (
        <OptionItem
          colors={colors}
          key={item.value}
          label={item.label}
          value={item.value}
          isSelected={isSelected}
          handleSelectedOptions={handleSelectedOptions}
        />
      );
    },
    [selectedOptions, colors, handleSelectedOptions],
  );

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={handleCloseModal}>
      <View style={style.container}>
        <View
          style={[
            style.subContainer,
            {
              borderColor: colors.border,
              shadowColor: colors.primary,
              backgroundColor: colors.card,
              borderWidth: horizontalScale(1),
              marginTop: insets.top,
              marginBottom: insets.bottom,
              marginLeft: insets.left,
              marginRight: insets.right,
            },
          ]}>
          <View style={style.titleContainer}>
            <Title title={title} type={18} />
          </View>
          <View style={style.searchBox}>
            <Search requiredCharacters={2} onSearch={handleSearch} />
          </View>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={handleRenderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={handleEmptyComponent}
          />
          <View style={style.actionContainer}>
            <View style={style.actionRight}>
              <TouchableOpacity hitSlop={10} onPress={handleCloseModal}>
                <Text style={[style.btnText, {color: colors.text}]}>CLOSE</Text>
              </TouchableOpacity>
              {(selected.length > 0 || selectedOptions.length > 0) && (
                <TouchableOpacity
                  hitSlop={10}
                  style={style.ms30}
                  onPress={handleOk(selectedOptions)}>
                  <Text
                    style={[
                      style.btnText,
                      style.btnTextOk,
                      {color: colors.primary},
                    ]}>
                    OK
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalList);
