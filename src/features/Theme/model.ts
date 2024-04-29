import { getLocalStorageItemOrSetDefaultIfNone } from '@common/utils';
import { createEvent, createStore, sample } from 'effector';
import { THEME_VALUES } from './constants';
import { Theme } from './types';

const $theme = createStore<Theme>(getLocalStorageItemOrSetDefaultIfNone('theme', THEME_VALUES[0]) as Theme);
const switchTheme = createEvent<Theme>();

sample({
  clock: $theme,
  fn: theme => {
    if (theme === THEME_VALUES[1]) {
      document.body.setAttribute('data-light', 'true');
      localStorage.setItem('theme', THEME_VALUES[1]);
    } else {
      document.body.removeAttribute('data-light');
      localStorage.setItem('theme', THEME_VALUES[0]);
    }
    return theme;
  },
});

sample({
  clock: switchTheme,
  target: $theme,
});

export { $theme, switchTheme };
