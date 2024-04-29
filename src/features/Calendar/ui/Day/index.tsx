import React, { memo, useEffect, useRef } from 'react';
import s from './styles.module.css';
import { useStore } from 'effector-react';
import { DayParams } from '../../types';
import { $currentDate, $currentWidgetBreakpoint, setDate } from '../../model';

export const Day = memo(
  ({
    text,
    dayOff,
    day,
    month,
    year,
    isDayOfCurrentMonth,
    isCurrent,
    width,
    isSelected,
    isDisabled,
  }: DayParams & {
    width: number;
    isSelected: boolean;
    isDisabled: boolean;
  }) => {
    const button = useRef(null);
    const bp = useStore($currentWidgetBreakpoint);
    const { day: currentDay, month: currentMonth, year: currentYear } = useStore($currentDate);
    const dayHandler = () => {
      setDate({
        day,
        year,
        month,
      });
    };
    useEffect(() => {
      if (day === currentDay && month === currentMonth && year === currentYear) {
        button.current.focus();
      }
    }, [day, month, year, currentDay, currentMonth, currentYear]);

    return (
      <div
        style={{ width: `calc(100% / ${width})` }}
        className={`${s.dayWrapper} ${isDisabled ? s.disabled : ''} `}
      >
        <button
          onClick={dayHandler}
          ref={button}
          tabIndex={isDisabled ? -1 : 0}
          className={`
          ${s.day}
          ${s[bp]} 
          ${dayOff ? s.dayOff : ''} 
          ${isCurrent ? s.currentDay : ''} 
          ${isSelected ? s.selectedDay : ''} 
          ${isDayOfCurrentMonth ? '' : s.dayOut}
        `}
        >
          {text}
        </button>
      </div>
    );
  },
);
