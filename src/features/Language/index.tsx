import React from 'react';
import { useStore } from 'effector-react';
import { Switcher } from '@common/ui/Switcher';
import { Lang } from './types';
import { $lang, $translations, switchLang } from './model';
import { LANG_VALUES } from './constants';

type Props = {
  isMobile: boolean;
};

export const LangSwitcher = ({ isMobile }: Props) => {
  const lang = useStore($lang);
  const translations = useStore($translations);
  const langSwitcherHandler = (lang: Lang) => {
    switchLang(lang);
  };
  const langData = [
    {
      value: LANG_VALUES[0],
      label: translations['lang.ru'],
    },
    {
      value: LANG_VALUES[1],
      label: translations['lang.en'],
    },
  ];

  return <Switcher data={langData} handler={langSwitcherHandler} isMobile={isMobile} currentValue={lang} />;
};
