import React, { useLayoutEffect, useMemo, useRef } from 'react';
import s from './styles.module.css';
import { useStore } from 'effector-react';
import { ThemeSwitcher } from '@src/features/Theme';
import { LangSwitcher } from '@src/features/Language';
import { Switcher } from '@common/ui/Switcher';
import {
  $currentDate,
  $currentWidgetBreakpoint,
  $dateConstraints,
  $entityToSelect,
  $firstDay,
  $nowDate,
  $orientation,
  changeWidgetBreakpoint,
} from '../../model';
import { Day } from '../Day';
import { ORIENTATION_VALUES, WEEK_LENGTH, WIDGET_BREAKPOINTS_VALUES } from '../../constants';
import { convertDaysToPortraitMode, getAllDaysData } from '../../utils';
import { StepDateSwitcher } from '../StepDateSwitcher';
import { DayLabels } from '../DayLabels';
import { DayParams } from '../../types';
import { useGetOptionsSwitchersData } from '../../hooks';
import { SelectMonthOrYear } from '../SelectMonthOrYear';

export const CalendarMain = () => {
  const { year, month, day: selectedDay } = useStore($currentDate);
  const { year: yearNow, month: monthNow, day: dayNow } = useStore($nowDate);
  const firstDay = useStore($firstDay);
  const orientation = useStore($orientation);
  const { canNotDecreaseMonth, canNotIncreaseMonth } = useStore($dateConstraints);
  const entityToSelect = useStore($entityToSelect);

  const widgetRef = useRef(null);

  const allDays: DayParams[] = useMemo(
    () => getAllDaysData(year, month, firstDay, yearNow, monthNow, dayNow),
    [year, month, firstDay, yearNow, monthNow, dayNow],
  );

  const rowsCount = allDays.length / WEEK_LENGTH;

  const isPortraintOrientation = orientation === ORIENTATION_VALUES[0];
  let resultRenderDays: DayParams[] = isPortraintOrientation ? convertDaysToPortraitMode(allDays) : allDays;
  const dayWidth = isPortraintOrientation ? rowsCount : WEEK_LENGTH;

  const bp = useStore($currentWidgetBreakpoint);
  const isMobile = bp === WIDGET_BREAKPOINTS_VALUES[0] || bp === WIDGET_BREAKPOINTS_VALUES[1];

  const { weekStartModeProps, orientationProps } = useGetOptionsSwitchersData();

  useLayoutEffect(() => {
    changeWidgetBreakpoint(widgetRef.current.clientWidth);
    const resizeHandler = () => {
      changeWidgetBreakpoint(widgetRef.current.clientWidth);
    };
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <div className={s.wrapper} ref={widgetRef}>
      {entityToSelect ? (
        <SelectMonthOrYear entityToSelect={entityToSelect} />
      ) : (
        <>
          <div className={`${s.options} ${s[bp]}`}>
            <Switcher {...orientationProps} isMobile={isMobile} />
            <ThemeSwitcher isMobile={isMobile} />
            <Switcher {...weekStartModeProps} isMobile={isMobile} />
            <LangSwitcher isMobile={isMobile} />
          </div>
          <div className={s.dateSwitchers}>
            <StepDateSwitcher year={year} month={month} day={selectedDay} step='month' />
            <StepDateSwitcher year={year} month={month} day={selectedDay} step='year' />
          </div>
          <div className={`${s.content} ${s[orientation]}`}>
            <DayLabels />
            <div className={s.days}>
              {resultRenderDays.map((item, index) => {
                return (
                  <Day
                    {...item}
                    isSelected={item.year === year && item.month === month && item.day === selectedDay}
                    width={dayWidth}
                    // Отсекаются дни крайних месяцев крайних лет
                    isDisabled={
                      item.month !== month && item.year !== year && (canNotDecreaseMonth || canNotIncreaseMonth)
                    }
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
