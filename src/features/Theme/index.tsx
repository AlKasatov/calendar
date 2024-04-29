import React from 'react';
import { useStore } from 'effector-react';
import { Switcher } from '@common/ui/Switcher';
import { $translations } from '@src/features/Language/model';
import { $theme, switchTheme } from './model';
import { Theme } from './types';
import { THEME_VALUES } from './constants';

type Props = {
  isMobile: boolean;
};

export const ThemeSwitcher = ({ isMobile }: Props) => {
  const theme = useStore($theme);
  const translations = useStore($translations);
  const themeSwitcherHandler = (theme: Theme) => {
    switchTheme(theme);
  };
  const themeData = [
    {
      value: THEME_VALUES[0],
      label: translations['theme.dark'],
    },
    {
      value: THEME_VALUES[1],
      label: translations['theme.light'],
    },
  ];

  return <Switcher data={themeData} handler={themeSwitcherHandler} isMobile={isMobile} currentValue={theme} />;
};
