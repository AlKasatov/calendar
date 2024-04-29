import { createEffect, createEvent, createStore, sample } from 'effector';
import { getLocalStorageItemOrSetDefaultIfNone } from '@common/utils';
import { LANG_VALUES } from './constants';
import { Lang } from './types';

const $lang = createStore<Lang>(getLocalStorageItemOrSetDefaultIfNone('lang', LANG_VALUES[0]) as Lang);
const $translations = createStore<Record<string, string> | null>(null);
const $isLoadingTranslations = createStore<boolean>(true);

const switchLang = createEvent<Lang>();

const getTranslationsFx = createEffect(async (lang: Lang) => {
  const translations = await import(`./translations/${lang}.translations.json`);
  return translations;
});

const pageMounted = createEvent();

sample({
  clock: pageMounted,
  source: $lang,
  target: getTranslationsFx,
});

sample({
  clock: getTranslationsFx.pending,
  target: $isLoadingTranslations,
});

sample({
  clock: getTranslationsFx.doneData,
  target: $translations,
});

sample({
  clock: switchLang,
  target: getTranslationsFx,
});

sample({
  clock: switchLang,
  fn: lang => {
    localStorage.setItem('lang', lang);
    return lang;
  },
  target: $lang,
});

export { $translations, $isLoadingTranslations, $lang, pageMounted, switchLang };
