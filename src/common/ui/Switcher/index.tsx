import React, { useState } from 'react';
import s from './style.module.css';

type Props = {
  currentValue: string;
  data: {
    label: string;
    value: string;
  }[];
  handler: (value: string) => void;
  isMobile: boolean;
};

export const Switcher = ({ data, handler, currentValue, isMobile }: Props) => {
  const [animation, setAnimation] = useState(false);
  const currentItem = data.find(({ value }) => value === currentValue);
  const indexOfCurrentItem = data.indexOf(currentItem);
  const nextItem = indexOfCurrentItem === data.length - 1 ? data[0] : data[indexOfCurrentItem + 1];

  const mobileHandler = () => {
    setAnimation(false);
    handler(nextItem.value);
  };
  const animationHandler = () => {
    setAnimation(true);
  };
  return isMobile ? (
    <button onClick={animationHandler} className={`${s.mobileButton}`}>
      <span onAnimationEnd={mobileHandler} className={`${s.animationWrapper} ${animation ? s.animation : ''}`}>
        <span className={`${s.mobileButtonItem} ${s.active}`}>{currentItem.label}</span>
        <span className={`${s.mobileButtonItem}`}>{nextItem.label}</span>
      </span>
    </button>
  ) : (
    <div className={s.wrapper}>
      {data.map(({ label, value }) => (
        <button
          key={value}
          className={`${s.button} ${value === currentValue ? s.active : ''}`}
          onClick={() => {
            handler(value);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
