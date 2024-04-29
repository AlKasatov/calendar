import { useStore } from 'effector-react';
import { $translations } from '@src/features/Language/model';
import { $orientation, $weekStartMode, changeWeekStartMode, changeOrientation } from './model';
import { ORIENTATION_VALUES, WEEK_START_MODE_VALUES } from './constants';
import { Orientation, WeekStartMode } from './types';

export const useGetOptionsSwitchersData = () => {
  const translations = useStore($translations);
  const orientation = useStore($orientation);
  const weekStartMode = useStore($weekStartMode);

  const weekStartModeData = [
    {
      value: WEEK_START_MODE_VALUES[0],
      label: translations['weekStartMode.mon'],
    },
    {
      value: WEEK_START_MODE_VALUES[1],
      label: translations['weekStartMode.sun'],
    },
    {
      value: WEEK_START_MODE_VALUES[2],
      label: translations['weekStartMode.first'],
    },
  ];

  const orientationData = [
    {
      value: ORIENTATION_VALUES[1],
      label: translations['orientation.landscape'],
    },
    {
      value: ORIENTATION_VALUES[0],
      label: translations['orientation.portrait'],
    },
  ];
  const weekStartModeHandler = (mode: WeekStartMode) => {
    changeWeekStartMode(mode);
  };

  const orientationHandler = (orientation: Orientation) => {
    changeOrientation(orientation);
  };

  return {
    weekStartModeProps: {
      handler: weekStartModeHandler,
      data: weekStartModeData,
      currentValue: weekStartMode,
    },
    orientationProps: {
      handler: orientationHandler,
      data: orientationData,
      currentValue: orientation,
    },
  };
};
