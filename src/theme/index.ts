export type TThemeColor = {
  primary: string;
  primaryVariant: string;
  secondary: string;
  secondaryVariant: string;
  transparent: string;
  accent: string;
  background: string;
  card: string;
  text: string;
  textDisabled: string;
  border: string;
  notification: string;
  label: string;
  labelDisabled: string;
  icons: string;
  placeholder: string;
  buttonCaption: string;
  bgImg: string;
  caption: string;
};

export type TTheme = {
  dark: boolean;
  colors: TThemeColor;
};

const lightTheme: TTheme = {
  dark: false,
  colors: {
    primary: 'rgba(92, 103, 234,1)',
    primaryVariant: 'rgba(92, 103, 234,0.7)',
    secondary: 'rgba(181, 188, 242,1)',
    secondaryVariant: 'rgba(181, 188, 242, 0.2)',
    transparent: 'rgba(255, 255, 255, 0)',
    accent: 'rgba(156, 249, 182,1)',
    background: 'rgba(239, 244, 247,1)',
    card: 'rgba(255, 255, 255,1)',
    text: 'rgba(35, 45, 66, 1)',
    textDisabled: 'rgba(35, 45, 66, 0.4)',
    border: 'rgba(216, 216, 216,1)',
    notification: 'rgba(255, 59, 48,1)',
    label: 'rgba(35, 45, 66, 0.7)',
    labelDisabled: 'rgba(35, 45, 66, 0.4)',
    icons: 'rgba(171, 168, 168,1)',
    placeholder: 'rgba(0,0,0,0.2)',
    buttonCaption: 'rgba(255,255,255,0.9)',
    bgImg: 'rgba(35, 45, 66, 0.5)',
    caption: 'rgba(35, 45, 66, 0.7)',
  },
};

const darkTheme: TTheme = {
  dark: true,
  colors: {
    primary: 'rgba(115, 125, 237,1)',
    primaryVariant: 'rgba(115, 125, 237,0.7)',
    secondary: 'rgba(55, 76, 117,1)',
    secondaryVariant: 'rgba(55, 76, 117, 0.3)',
    transparent: 'rgba(255, 255, 255,0)',
    accent: 'rgba(136, 255, 176,1)',
    background: 'rgba(31, 33, 49,1)',
    card: 'rgba(18, 18, 18,1)',
    text: 'rgba(189, 199, 220, 1)',
    textDisabled: 'rgba(189, 199, 220, 0.4)',
    border: 'rgba(167, 167, 167, 0.4)',
    notification: 'rgba(255, 69, 58,1)',
    label: 'rgba(189, 199, 220, 0.7)',
    labelDisabled: 'rgba(189, 199, 220, 0.4)',
    icons: 'rgba(171, 168, 168,1)',
    placeholder: 'rgba(255,255,255,0.2)',
    buttonCaption: 'rgba(255,255,255,0.9)',
    bgImg: 'rgba(189, 199, 220, 1)',
    caption: 'rgba(189, 199, 220, 0.7)',
  },
};

export {lightTheme, darkTheme};
