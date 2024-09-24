import dayjs from 'dayjs';

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const urlEncode = (params: {[key: string]: string}) => {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
};

export const convertStringToDateTime = (
  value: string,
  format: string,
  viewSelected: string,
) => {
  let val = value;
  //convert time to HH:mm if its format is hh:mm A
  if (value && format === 'hh:mm A') {
    val = dayjs(dayjs().format('YYYY-MM-DD') + ' ' + value, [
      'YYYY-MM-DD hh:mm A',
    ]).format('HH:mm');
  }
  const dt = val
    ? viewSelected === 'time'
      ? val!.split(':')
      : val
    : undefined;
  return dt
    ? viewSelected === 'time'
      ? dayjs().set('hour', Number(dt[0])).set('minute', Number(dt[1]))
      : dayjs(dt as string, format)
    : dayjs();
};

export const RegExpCheck = (
  value: string,
  type: 'EMAIL' | 'PHONE' | 'NUMBER' | 'DECIMAL' | 'TEL',
) => {
  switch (type) {
    case 'EMAIL':
      return /^\S+@\S+\.\S+$/.test(value);
    case 'PHONE':
      return /^(\+?\d{1,3})?[-.\s]?(\(\d{3}\)|\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(
        value,
      );
    case 'NUMBER':
      return /^\d+$/.test(value);
    case 'DECIMAL':
      return /^[-+]?\d*\.?\d+$/.test(value);
    case 'TEL':
      return /^\d{10}$/.test(value);
    default:
      return true;
  }
};
