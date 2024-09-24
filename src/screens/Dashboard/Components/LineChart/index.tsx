import React, {useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import {LineChart as CKLineChart} from 'react-native-chart-kit';
import {
  View,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';

import Title from '@/components/Title';
import Text from '@/components/UI/Text';

import {useTheme} from '@/assets/hooks';
import {horizontalScale} from '@/assets/styles/scaling';

import staticColor from '@/assets/styles/colors';
import style from '@/screens/Dashboard/Components/LineChart/style';

const data = {
  labels: ['Jan', ' Feb ', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
      ],
    },
  ],
};

const LineChart: React.FC = () => {
  const {colors} = useTheme();

  const {width, height} = useWindowDimensions();

  const handleColor = useCallback(
    (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    [],
  );

  const onPress = useCallback(() => {}, []);

  const isPortrait = height > width; // Check orientation

  const chartWidth = isPortrait
    ? width - horizontalScale(40)
    : Platform.OS === 'ios' && DeviceInfo.hasNotch()
      ? width * 0.81
      : width - horizontalScale(40);

  return (
    <View>
      <View style={style.titleContainer}>
        <Title title="Dashboard" color={colors.caption} />
        <TouchableOpacity onPress={onPress}>
          <Text style={[style.text, {color: colors.labelDisabled}]}>
            more...
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.chartContainer}>
        <CKLineChart
          data={data}
          height={height / (isPortrait ? 4 : 2)}
          width={chartWidth}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: colors.primary,
            backgroundGradientFrom: colors.primary,
            backgroundGradientTo: colors.secondary,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: handleColor,
            labelColor: handleColor,
            style: style.chart,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: staticColor.orange,
            },
          }}
          bezier
          style={style.chart}
        />
      </View>
    </View>
  );
};

export default LineChart;
