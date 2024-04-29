import React, { useEffect, useRef } from 'react';
import s from './style.module.css';
import { useStore } from 'effector-react';
import { $translations } from '@src/features/Language/model';
import { $currentDate, $currentWidgetBreakpoint, $nowDate, changeEntity, setDate } from '../../model';
import { AVAILABLE_YEARS_RANGE, MONTHS } from '../../constants';
import { EntityToSelect } from '../../types';
import { getClosestValidDayInOtherMonth } from '../../utils';

type Props = {
  entityToSelect: EntityToSelect;
};

export const SelectMonthOrYear = ({ entityToSelect }: Props) => {
  const button = useRef(null);
  const translations = useStore($translations);
  const { year, month, day } = useStore($currentDate);
  const { year: yearNow, month: monthNow } = useStore($nowDate);
  const bp = useStore($currentWidgetBreakpoint);

  const years = Array(AVAILABLE_YEARS_RANGE)
    .fill(0)
    .map((_, index) => yearNow - Math.trunc(AVAILABLE_YEARS_RANGE / 2) + index);

  const monthHandler = (e: any) => {
    const value = +e.target.dataset.month;
    setDate({
      year,
      month: value,
      day: getClosestValidDayInOtherMonth(year, value, day),
    });
    changeEntity(null);
  };
  const yearHandler = (e: any) => {
    const value = +e.target.dataset.year;
    setDate({
      year: value,
      month,
      day: getClosestValidDayInOtherMonth(value, month, day),
    });
    changeEntity(null);
  };
  const closeHandler = () => {
    changeEntity(null);
  };
  useEffect(() => {
    button.current?.focus();
  }, []);

  return (
    <div className={s.overlay}>
      <button ref={button} onClick={closeHandler} className={s.close} />
      {entityToSelect === 'year' &&
        years.map(item => {
          return (
            <div key={item} className={`${s.item} ${s.year} ${s[bp]}`}>
              <button
                onClick={yearHandler}
                data-year={item}
                className={`${s.button} ${yearNow === item ? s.current : ''}`}
              >
                {item}
              </button>
            </div>
          );
        })}
      {entityToSelect === 'month' &&
        MONTHS.map(item => {
          return (
            <div key={item} className={`${s.item} ${s.month} ${s[bp]}`}>
              <button
                onClick={monthHandler}
                data-month={item}
                className={`${s.button} ${monthNow === item ? s.current : ''}`}
              >
                {translations[`month.${item}`]}
              </button>
            </div>
          );
        })}
    </div>
  );
};
