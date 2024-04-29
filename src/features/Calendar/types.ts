import { ORIENTATION_VALUES, WEEK_START_MODE_VALUES, WIDGET_BREAKPOINTS_VALUES } from './constants';

export type FullDate = {
  year: number;
  month: number;
  day: number | null;
};
export type DayParams = {
  day: number;
  month: number;
  year: number;
  text: string;
  dayOff: boolean;
  isDayOfCurrentMonth: boolean;
  isCurrent: boolean;
};
export type WeekStartMode = typeof WEEK_START_MODE_VALUES[number];
export type WidgetBreakpoints = typeof WIDGET_BREAKPOINTS_VALUES[number];
export type Orientation = typeof ORIENTATION_VALUES[number];
export type EntityToSelect = 'year' | 'month' | null;
