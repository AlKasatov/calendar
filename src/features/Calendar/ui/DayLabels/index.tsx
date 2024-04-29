import React from 'react';
import s from './style.module.css';
import { useStore } from 'effector-react';
import { $translations } from '@src/features/Language/model';
import { DAYS } from '../../constants';
import { $currentWidgetBreakpoint, $firstDay, $orientation } from '../../model';

export const DayLabels = () => {
  const firstDay = useStore($firstDay);
  const orientation = useStore($orientation);
  const translations = useStore($translations);
  const bp = useStore($currentWidgetBreakpoint);

  return (
    <div className={`${s.dayLabels} ${s[orientation]} ${s[bp]}`}>
      {DAYS.map(item => {
        return (
          <div key={item} className={`${s.dayLabel}`}>
            {translations[`day.${(item + firstDay) % 7}`]}
          </div>
        );
      })}
    </div>
  );
};
