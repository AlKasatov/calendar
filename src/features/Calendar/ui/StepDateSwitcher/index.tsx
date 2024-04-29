import React from 'react';
import s from './styles.module.css';
import { useStore } from 'effector-react';
import { $translations } from '@src/features/Language/model';
import { $currentWidgetBreakpoint, $dateConstraints, changeEntity, setDate } from '../../model';
import { decreaseMonth, getClosestValidDayInOtherMonth, increaseMonth } from '../../utils';
import { WIDGET_BREAKPOINTS_VALUES } from '../../constants';

interface Props {
  year: number;
  month: number;
  day: number;
  step: 'month' | 'year';
}

export const StepDateSwitcher = ({ year, month, day, step }: Props) => {
  const translations = useStore($translations);
  const bp = useStore($currentWidgetBreakpoint);
  const { canNotDecreaseMonth, canNotDecreaseYear, canNotIncreaseMonth, canNotIncreaseYear } =
    useStore($dateConstraints);

  const increaseMonthHandler = () => {
    const { year: y, month: m } = increaseMonth(year, month);
    setDate({ year: y, month: m, day: getClosestValidDayInOtherMonth(y, m, day) });
  };
  const decreaseMonthHandler = () => {
    const { year: y, month: m } = decreaseMonth(year, month);
    setDate({ year: y, month: m, day: getClosestValidDayInOtherMonth(y, m, day) });
  };
  const increaseYearHandler = () => {
    setDate({ year: year + 1, month, day: getClosestValidDayInOtherMonth(year + 1, month, day) });
  };
  const decreaseYearHandler = () => {
    setDate({ year: year - 1, month, day: getClosestValidDayInOtherMonth(year - 1, month, day) });
  };
  const stepMap = {
    year: {
      decrease: decreaseYearHandler,
      increase: increaseYearHandler,
      text: year,
      leftArrowIsDisabled: canNotDecreaseYear,
      rightArrowIsDisabled: canNotIncreaseYear,
    },
    month: {
      decrease: decreaseMonthHandler,
      increase: increaseMonthHandler,
      text:
        bp === WIDGET_BREAKPOINTS_VALUES[0]
          ? translations[`month.shortcut.${month}`]
          : translations[`month.${month}`],
      leftArrowIsDisabled: canNotDecreaseMonth,
      rightArrowIsDisabled: canNotIncreaseMonth,
    },
  };
  const selectEntityHandler = () => {
    changeEntity(step);
  };
  return (
    <div className={`${s.wrapper} ${s[bp]}`}>
      <button
        className={`${s.button} ${s[bp]} ${s.left} ${stepMap[step].leftArrowIsDisabled ? s.disabled : ''}`}
        onClick={stepMap[step].decrease}
      />
      <button className={`${s.info} ${s[step]} ${s[bp]}`} onClick={selectEntityHandler}>
        {stepMap[step].text}
      </button>
      <button
        className={`${s.button} ${s[bp]} ${s.right}  ${stepMap[step].rightArrowIsDisabled ? s.disabled : ''}`}
        onClick={stepMap[step].increase}
      />
    </div>
  );
};
