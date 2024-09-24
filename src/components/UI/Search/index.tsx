import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {useDebounce, useTheme} from '@/assets/hooks';
import {scaleFontSize} from '@/assets/styles/scaling';

import style from '@/components/UI/Search/style';

type TProps = {
  placeholder?: string;
  requiredCharacters?: number;
  onSearch: (value: string) => Promise<void>;
};

const Search: React.FC<TProps> = ({
  placeholder,
  requiredCharacters,
  onSearch,
}) => {
  const {colors} = useTheme();

  const textInputRef = useRef<TextInput>(null);

  const isInvalid = useRef<boolean>(false);
  const allowProcess = useRef<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedValue = useDebounce(searchValue, 300);

  const handleFocus = useCallback(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const handleChangeText = useCallback(
    (value: string) => {
      const val = value.trim();
      if (requiredCharacters && requiredCharacters > 0 && val) {
        isInvalid.current = val.length < requiredCharacters;
        if (!isInvalid.current) {
          allowProcess.current = true;
        }
      } else {
        isInvalid.current = false;
      }
      setSearchValue(value);
    },
    [requiredCharacters],
  );

  useEffect(() => {
    if (allowProcess.current) {
      if (isInvalid.current) {
        allowProcess.current = false;
      }
      setIsSearching(true);
      setTimeout(() => {
        onSearch(isInvalid.current ? '' : debouncedValue).then(() =>
          setIsSearching(false),
        );
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <View>
      <Pressable
        style={[
          style.searchInputContainer,
          {backgroundColor: colors.secondaryVariant},
        ]}
        onPress={handleFocus}>
        <FontAwesomeIcon
          icon={faSearch}
          size={scaleFontSize(22)}
          color={colors.primary}
        />
        <TextInput
          ref={textInputRef}
          value={searchValue}
          style={[style.searchInput, {color: colors.text}]}
          placeholder={placeholder || 'Search'}
          placeholderTextColor={colors.placeholder}
          onChangeText={handleChangeText}
        />
        {isSearching && (
          <ActivityIndicator size="small" color={colors.primary} />
        )}
      </Pressable>
      {isInvalid.current && (
        <Text style={style.error}>
          Type at least {requiredCharacters} characters
        </Text>
      )}
    </View>
  );
};

export default Search;
