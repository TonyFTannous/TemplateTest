import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Platform,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Title from '@/components/Title';
import Text from '@/components/UI/Text';
import OverLay from '@/components/OverLay';
import Button from '@/components/UI/Button';
import logo from '@/assets/images/logo.png';
import Input, {TRef as inputTref} from '@/components/UI/Input';
import Switch, {TRef as switchTref} from '@/components/UI/Switch';

import {useTheme} from '@/assets/hooks';
import {signInHandler} from '@/api/user';
import {TScreenValid} from '@/assets/types';
import {RegExpCheck} from '@/assets/helper';
import {verticalScale} from '@/assets/styles/scaling';

import style from '@/screens/Login/style';
import gbStyle from '@/assets/styles/index';

type TProps = {
  navigation: any;
};

const formIsValid: TScreenValid = {
  email: {
    status: false,
    requiredFeedback: "Email can't be empty",
    feedback: ['Please provide a valid email'],
  },
  password: {
    status: false,
    requiredFeedback: "Password can't be empty",
    feedback: [],
  },
};

const Login: React.FC<TProps> = () => {
  const {colors} = useTheme();

  const insets = useSafeAreaInsets();

  const emailRef = useRef<inputTref>(null);
  const passwordRef = useRef<inputTref>(null);
  const rememberMeRef = useRef<switchTref>(null);
  const refs = useRef<{[key: string]: any}>({
    email: emailRef,
    password: passwordRef,
  });

  const [isError, setIsError] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<string>('');
  const [isAction, setIsAction] = useState<boolean>(false);

  const handleChange = useCallback(
    (id: string, value: string | boolean): string => {
      setIsError('');
      switch (id.toUpperCase()) {
        case 'EMAIL':
          const emailVal = (value as string).trim();
          if (emailVal === '') {
            formIsValid.email.status = false;
            return formIsValid.email.requiredFeedback;
          }
          if (!RegExpCheck(emailVal, 'EMAIL')) {
            formIsValid.email.status = false;
            return formIsValid.email.feedback[0];
          }
          formIsValid.email.status = true;
          return '';
        default:
          if (formIsValid[id]) {
            if (
              formIsValid[id].requiredFeedback.trim() &&
              (value as string).trim() === ''
            ) {
              formIsValid[id].status = false;
              return formIsValid[id].requiredFeedback;
            }
            formIsValid[id].status = true;
          }
          return '';
      }
    },
    [],
  );

  const handleLogin = useCallback(() => {
    if (isAction) {
      return;
    }

    setIsAction(true);

    setTimeout(async () => {
      try {
        Keyboard.dismiss();

        let isContinue = true;

        setIsError('');

        for (const key in formIsValid) {
          if (formIsValid[key].status === false) {
            isContinue = false;
            const val = refs.current[key].current.value;
            if (val.trim() === '') {
              refs.current[key].current.setStatus(
                formIsValid[key].requiredFeedback,
              );
            }
          }
        }

        if (!isContinue) {
          setIsError('You have either missing or invalid fields');
          return;
        }

        await signInHandler(
          emailRef.current!.value,
          passwordRef.current!.value,
          rememberMeRef.current!.value,
        );
      } catch (error) {
        setIsError('Signing in has been failed');
      } finally {
        setIsAction(false);
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const init = async () => {
      const value = await AsyncStorage.getItem('rememberMe');
      if (value) {
        setRememberMe(value);
        formIsValid.email.status = true;
        passwordRef.current!.setFocus();
      }
    };
    init();
  }, []);

  return (
    <View
      style={[
        gbStyle.flex,
        {
          backgroundColor: colors.background,
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          paddingBottom: insets.bottom,
        },
      ]}>
      {isAction && <OverLay isIndicator hasSubContainer text="Logging in..." />}
      <KeyboardAvoidingView
        style={gbStyle.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? verticalScale(0.5) : undefined
        }>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.contentContainer}>
          <View style={style.logoContainer}>
            <View>
              <Image style={style.logo} source={logo} />
            </View>
          </View>
          <View>
            <View style={gbStyle.marginBottom24}>
              <Title type={24} title={'Welcome Back'} />
            </View>
            <View style={gbStyle.marginBottom24}>
              <Input
                id="email"
                ref={emailRef}
                label={'Email'}
                value={rememberMe}
                keyboardType={'email-address'}
                placeholder={'Enter your email...'}
                onChangeValue={handleChange}
              />
            </View>
            <View style={gbStyle.marginBottom24}>
              <Input
                id="password"
                ref={passwordRef}
                label={'Password'}
                secureTextEntry={true}
                placeholder={'******'}
                onChangeValue={handleChange}
              />
            </View>
            <View style={gbStyle.marginBottom24}>
              <View style={style.rememberContainer}>
                <Text>Remember Me</Text>
                <Switch
                  id="rememberme"
                  ref={rememberMeRef}
                  value={!!rememberMe}
                />
              </View>
            </View>
            {isError.length > 0 && (
              <View style={style.errorContainer}>
                <Text style={style.error}>{isError}</Text>
              </View>
            )}
            <View style={style.actionContainer}>
              <Button
                title="Login"
                isDisabled={isAction}
                onPress={handleLogin}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
