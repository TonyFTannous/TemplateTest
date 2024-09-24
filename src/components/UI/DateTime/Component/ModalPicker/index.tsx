import React, {memo, useCallback, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import dayjs, {Dayjs} from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

import {useTheme} from '@/assets/hooks';
import {horizontalScale} from '@/assets/styles/scaling';

import style from '@/components/UI/DateTime/Component/ModalPicker/style';

type TProps = {
  value: Dayjs;
  minDate?: string;
  maxDate?: string;
  timeDate?: string;
  modeSelected: 'single'; // | 'range' | 'multiple';
  viewSelected: 'time' | 'day';
  handleCloseModal: () => void;
  handleOk: (value: Dayjs) => () => void;
};

const ModalPicker: React.FC<TProps> = ({
  value,
  minDate,
  maxDate,
  timeDate,
  modeSelected,
  viewSelected,
  handleOk,
  handleCloseModal,
}) => {
  const {colors} = useTheme();

  const [dateValue, setDateValue] = useState<Dayjs>(value);

  const {height} = useWindowDimensions();

  const handleChangeValue = useCallback(
    (val: any) => {
      if (modeSelected === 'single') {
        setDateValue(
          viewSelected === 'time'
            ? dayjs(val.date, 'YYYY-MM-DD HH:mm')
            : val.date,
        );
      } else if (modeSelected === 'range') {
        // setRange(val);
      } else if (modeSelected === 'multiple') {
        // setDates(val.dates);
      }
    },
    [modeSelected, viewSelected],
  );

  const handleToday = useCallback(() => {
    setDateValue(dayjs());
  }, []);

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
            },
          ]}>
          <View style={style.datePicker}>
            <DateTimePicker
              locale="en"
              date={dateValue}
              displayFullDays
              mode={modeSelected}
              height={height * 0.5}
              initialView={viewSelected}
              minDate={timeDate || minDate}
              maxDate={timeDate || maxDate}
              timePicker={viewSelected === 'time'}
              headerButtonColor={colors.icons}
              headerContainerStyle={
                viewSelected === 'time' ? style.hiddenTime : undefined
              }
              headerTextStyle={style.textTheme}
              calendarTextStyle={style.textTheme}
              weekDaysTextStyle={style.textTheme}
              selectedItemColor={colors.primary}
              todayTextStyle={{color: colors.text}}
              todayContainerStyle={{
                backgroundColor: colors.secondary,
                borderColor: colors.secondary,
              }}
              yearContainerStyle={{backgroundColor: colors.secondary}}
              monthContainerStyle={{backgroundColor: colors.secondary}}
              timePickerIndicatorStyle={{backgroundColor: colors.secondary}}
              onChange={handleChangeValue}
            />
          </View>
          <View
            style={[
              style.actionContainer,
              viewSelected === 'day' && style.mb20,
            ]}>
            {modeSelected === 'single' && (
              <TouchableOpacity hitSlop={10} onPress={handleToday}>
                <Text style={[style.text, {color: colors.primary}]}>
                  {viewSelected === 'time' ? 'NOW' : 'TODAY'}
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={
                modeSelected === 'single'
                  ? style.actionRight
                  : style.actionContainer
              }>
              <TouchableOpacity
                hitSlop={10}
                style={style.me30}
                onPress={handleCloseModal}>
                <Text style={style.text}>CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity hitSlop={10} onPress={handleOk(dateValue)}>
                <Text style={[style.text, {color: colors.primary}]}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default memo(ModalPicker);
