import React, { useEffect } from 'react';
import s from './style.module.css';
import { useStore } from 'effector-react';
import { Loader } from '@common/ui/Loader';
import { $currentDate } from '@src/features/Calendar/model';
import { CalendarMain } from '@src/features/Calendar';
import { $isLoadingTranslations, pageMounted } from '@src/features/Language/model';
import month0 from '../../images/0.jpg';
import month1 from '../../images/1.jpg';
import month2 from '../../images/2.jpg';
import month3 from '../../images/3.jpg';
import month4 from '../../images/4.jpg';
import month5 from '../../images/5.jpg';
import month6 from '../../images/6.jpg';
import month7 from '../../images/7.jpg';
import month8 from '../../images/8.jpg';
import month9 from '../../images/9.jpg';
import month10 from '../../images/10.jpg';
import month11 from '../../images/11.jpg';

export const CalendarPage = () => {
  const { month } = useStore($currentDate);
  const isLoadingTranslations = useStore($isLoadingTranslations);
  const pictures = [
    month0,
    month1,
    month2,
    month3,
    month4,
    month5,
    month6,
    month7,
    month8,
    month9,
    month10,
    month11,
  ];
  useEffect(() => {
    pageMounted();
  }, []);

  return (
    <section className={s.backgroundWrapper}>
      {pictures.map((item, index) => {
        return (
          <div
            key={index}
            className={s.background}
            style={{ backgroundImage: `url(${item})`, opacity: month === index ? 1 : 0 }}
          />
        );
      })}
      <div className={s.overlay} />
      <div className={s.wrapper}>
        {!isLoadingTranslations ? (
          <CalendarMain />
        ) : (
          <div className={s.center}>
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};
