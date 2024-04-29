import { combine, createEvent, createStore, sample } from 'effector';
import {
  AVAILABLE_YEARS_RANGE,
  ORIENTATION_VALUES,
  WEEK_START_MODE_VALUES,
  WIDGET_BREAKPOINTS_VALUES,
} from '../constants';
import { getLocalStorageItemOrSetDefaultIfNone } from '@common/utils';
import { FullDate, Orientation, EntityToSelect, WeekStartMode, WidgetBreakpoints } from '../types';
import { getFirstDayOfWeek, getNowFullDate, getWidgetBreakpoint } from '../utils';

const { year, month, day } = getNowFullDate();

const $nowDate = createStore<FullDate>({ year, month, day });
const $currentDate = createStore<FullDate>({ year, month, day });
const $weekStartMode = createStore<WeekStartMode>(
  getLocalStorageItemOrSetDefaultIfNone('weekStartMode', WEEK_START_MODE_VALUES[0]) as WeekStartMode,
);
const $orientation = createStore<Orientation>(
  getLocalStorageItemOrSetDefaultIfNone('orientation', ORIENTATION_VALUES[1]),
);
const $firstDay = combine($weekStartMode, $currentDate, (weekStartMode, currentDate) => {
  if (weekStartMode === WEEK_START_MODE_VALUES[0]) return 1;
  if (weekStartMode === WEEK_START_MODE_VALUES[1]) return 0;
  const { year, month } = currentDate;
  return getFirstDayOfWeek(year, month);
});
const $currentWidgetBreakpoint = createStore<WidgetBreakpoints>(WIDGET_BREAKPOINTS_VALUES[0]);
const $entityToSelect = createStore<EntityToSelect>(null);
const $dateConstraints = combine($currentDate, $nowDate, (currentDate, nowDate) => {
  const { year: yearNow } = nowDate;
  const { month, year } = currentDate;
  const firstAvailableYear = yearNow - Math.trunc(AVAILABLE_YEARS_RANGE / 2);
  const lastAvailableYear = firstAvailableYear + AVAILABLE_YEARS_RANGE - 1;

  return {
    canNotIncreaseMonth: year === lastAvailableYear && month === 11,
    canNotDecreaseMonth: year === firstAvailableYear && month === 0,
    canNotIncreaseYear: year === lastAvailableYear,
    canNotDecreaseYear: year === firstAvailableYear,
  };
});

const setDate = createEvent<FullDate>();
const changeWeekStartMode = createEvent<WeekStartMode>();
const changeOrientation = createEvent<typeof ORIENTATION_VALUES[number]>();
const changeWidgetBreakpoint = createEvent<number>();
const changeEntity = createEvent<EntityToSelect>();

sample({
  clock: setDate,
  target: $currentDate,
});
sample({
  clock: changeWeekStartMode,
  fn: mode => {
    localStorage.setItem('weekStartMode', mode);
    return mode;
  },
  target: $weekStartMode,
});
sample({
  clock: changeOrientation,
  fn: orientation => {
    localStorage.setItem('orientation', orientation);
    return orientation;
  },
  target: $orientation,
});
sample({
  clock: changeWidgetBreakpoint,
  fn: width => {
    return getWidgetBreakpoint(width);
  },
  target: $currentWidgetBreakpoint,
});
sample({
  clock: changeEntity,
  target: $entityToSelect,
});

export {
  $currentDate,
  $nowDate,
  $firstDay,
  $weekStartMode,
  $orientation,
  $currentWidgetBreakpoint,
  $entityToSelect,
  $dateConstraints,
  setDate,
  changeWeekStartMode,
  changeOrientation,
  changeWidgetBreakpoint,
  changeEntity,
};
