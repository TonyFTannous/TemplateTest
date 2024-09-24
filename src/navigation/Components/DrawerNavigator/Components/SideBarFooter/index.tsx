import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Text,
  View,
  Switch,
  Platform,
  Appearance,
  useColorScheme,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  faSun,
  faMoon,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import OverLay from '@/components/OverLay';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useTheme} from '@/assets/hooks';
import staticColors from '@/assets/styles/colors';
import {scaleFontSize} from '@/assets/styles/scaling';
import {resetToInitialState} from '@/redux/reducers/user';

import style from '@/navigation/Components/DrawerNavigator/Components/SideBarFooter/style';

const IconSwitch: React.FC = () => {
  const {colors} = useTheme();

  const scheme = useColorScheme();

  // State to track switch value (on/off)
  const [isLight, setIsLight] = useState<boolean>(scheme === 'light');

  // Function to toggle switch value
  const toggleSwitch = useCallback(() => {
    setIsLight(previousState => !previousState);
    if (Platform.OS === 'android') {
      setTimeout(() => {
        StatusBar.setBackgroundColor(colors.transparent);
      }, 100);
    }
  }, [colors.transparent]);

  useEffect(() => {
    const handleTheme = async () => {
      try {
        const theme = isLight ? 'light' : 'dark';
        await AsyncStorage.setItem('theme', theme);
        Appearance.setColorScheme(theme);
      } catch (error) {
        Toast.show('Failed to change the theme.', {
          backgroundColor: staticColors.red,
          position: Platform.OS === 'android' ? 50 : Toast.positions.TOP,
        });
      }
    };
    handleTheme();
  }, [isLight]);

  return (
    <View
      style={[
        style.switchContainer,
        {backgroundColor: colors.secondaryVariant},
      ]}>
      {/* Conditionally render the FontAwesomeIcon based on the switch state */}
      {isLight ? (
        <FontAwesomeIcon
          icon={faSun}
          color={staticColors.orange}
          size={
            Platform.OS === 'android' ? scaleFontSize(20) : scaleFontSize(33)
          }
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          color={colors.text}
          size={
            Platform.OS === 'android' ? scaleFontSize(20) : scaleFontSize(33)
          }
        />
      )}
      <Switch
        value={isLight}
        onValueChange={toggleSwitch}
        thumbColor={isLight ? staticColors.orange : colors.text}
        trackColor={{false: colors.secondary, true: colors.secondary}}
      />
    </View>
  );
};

const SideBarFooter: React.FC = () => {
  const {colors} = useTheme();

  const [isLogingOut, setIsLogingOut] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    setIsLogingOut(true);
  }, []);

  useEffect(() => {
    if (isLogingOut) {
      setTimeout(() => {
        dispatch(resetToInitialState());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogingOut]);

  return (
    <View style={style.container}>
      {isLogingOut && (
        <OverLay isIndicator hasSubContainer text="Logging out..." />
      )}
      <TouchableOpacity onPress={handleLogout}>
        <View style={[style.btnContainer, {borderColor: colors.placeholder}]}>
          <FontAwesomeIcon
            color={colors.label}
            size={scaleFontSize(18)}
            icon={faArrowRightFromBracket}
          />
          <Text style={[style.btnText, {color: colors.label}]}>Logout</Text>
        </View>
      </TouchableOpacity>
      <View style={style.toggleThemeContainer}>
        <IconSwitch />
      </View>
    </View>
  );
};

export default SideBarFooter;
