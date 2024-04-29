import { DAYS, DAYS_OFF, WEEK_LENGTH, WIDGET_BREAKPOINTS_VALUES } from './constants';
import { DayParams } from './types';

export const getNowFullDate = () => {
  const dateNow = new Date();
  return {
    year: dateNow.getFullYear(),
    month: dateNow.getMonth(),
    day: dateNow.getDate(),
  };
};

export const getDaysInMonthCount = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfWeek = (year: number, month: number): number => {
  const date = new Date(year, month, 1);
  return date.getDay();
};

export const increaseMonth = (year: number, month: number) => {
  const isLastMonth = month === 11;
  return {
    month: isLastMonth ? 0 : month + 1,
    year: isLastMonth ? year + 1 : year,
  };
};

export const decreaseMonth = (year: number, month: number) => {
  const isFirstMonth = month === 0;
  return {
    month: isFirstMonth ? 11 : month - 1,
    year: isFirstMonth ? year - 1 : year,
  };
};
export const getLastMonthDaysData = (year: number, month: number, lastMonthDaysLength: number) => {
  const lastMonthDaysCount = getDaysInMonthCount(year, month - 1);
  return new Array(lastMonthDaysLength).fill(0).map((_, index) => {
    const day = lastMonthDaysCount - lastMonthDaysLength + index + 1;
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    return {
      day,
      ...decreaseMonth(year, month),
      text: day.toString(),
      dayOff: DAYS_OFF.includes(dayOfWeek),
      isDayOfCurrentMonth: false,
      isCurrent: false,
    };
  });
};

export const getCurrentMonthDaysData = (
  year: number,
  month: number,
  dayNow: number,
  isCurrentMonthAndYear: boolean,
  currentMonthDaysLength: number,
) => {
  return new Array(currentMonthDaysLength).fill(0).map((_, index) => {
    const day = index + 1;
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    return {
      day,
      month,
      year,
      text: day.toString(),
      dayOff: DAYS_OFF.includes(dayOfWeek),
      isDayOfCurrentMonth: true,
      isCurrent: isCurrentMonthAndYear && day === dayNow,
    };
  });
};

export const getNextMonthDaysData = (year: number, month: number, nextMonthDaysLength: number) => {
  return new Array(nextMonthDaysLength).fill(0).map((_, index) => {
    const day = index + 1;
    const date = new Date(year, month + 1, day);
    const dayOfWeek = date.getDay();
    return {
      day,
      ...increaseMonth(year, month),
      text: day.toString(),
      dayOff: DAYS_OFF.includes(dayOfWeek),
      isDayOfCurrentMonth: false,
      isCurrent: false,
    };
  });
};

export const getAllDaysData = (
  year: number,
  month: number,
  firstDay: number,
  yearNow: number,
  monthNow: number,
  dayNow: number,
) => {
  const isCurrentMonthAndYear = year === yearNow && month === monthNow;
  const lastMonthDaysLength = DAYS[(WEEK_LENGTH - firstDay + getFirstDayOfWeek(year, month)) % WEEK_LENGTH];
  const currentMonthDaysLength = getDaysInMonthCount(year, month);
  const nextMonthDaysLength =
    ((Math.trunc((currentMonthDaysLength + lastMonthDaysLength) / WEEK_LENGTH) + 1) * WEEK_LENGTH -
      (currentMonthDaysLength + lastMonthDaysLength)) %
    WEEK_LENGTH;
  return [
    ...getLastMonthDaysData(year, month, lastMonthDaysLength),
    ...getCurrentMonthDaysData(year, month, dayNow, isCurrentMonthAndYear, currentMonthDaysLength),
    ...getNextMonthDaysData(year, month, nextMonthDaysLength),
  ];
};

export const convertDaysToPortraitMode = (landscapeDays: DayParams[]) => {
  const rowsCount = landscapeDays.length / WEEK_LENGTH;
  const result: DayParams[] = [];
  const allDaysLength = landscapeDays.length;
  for (let i = 0, k = 0, j = 0; i < allDaysLength; i++, k += WEEK_LENGTH) {
    if (i !== 0 && i % rowsCount === 0) {
      k = 0;
      j += 1;
    }
    result[i] = landscapeDays[j + k];
  }
  return result;
};

export const getWidgetBreakpoint = (width: number) => {
  if (width <= 400) {
    return WIDGET_BREAKPOINTS_VALUES[0];
  }
  if (width <= 800) {
    return WIDGET_BREAKPOINTS_VALUES[1];
  }
  return WIDGET_BREAKPOINTS_VALUES[2];
};

export const getClosestValidDayInOtherMonth = (year: number, month: number, day: number) => {
  let d = day;
  const isValid = new Date(`${year}-${month + 1}-${day}`).getMonth() === month;
  if (isValid) {
    return day;
  }

  while (new Date(`${year}-${month + 1}-${d}`).getMonth() !== month) {
    d--;
  }
  return d;
};
