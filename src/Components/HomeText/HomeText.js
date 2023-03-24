import './HomeText.scss';
import { useState } from 'react';
import React from 'react';

export function HomeText() {
  const [showMoreText, setshowMoreText] = useState(false);

  const showMore = () => {
    setshowMoreText(prev => !prev);
  };

  return (
    <>
      <h1 className="top__title">Топ запитань для легкого знайомства</h1>

      <p className="top_text">
        У общения и знакомств онлайн масса плюсов, но есть и один минус: мы не
        знаем, кто сидит по ту сторону монитора. Особенно это волнует девушек, а
        мужчины не стремятся рассказывать о себе подробнее. Информацию
        приходится разведывать "партизанскими" методами. Поэтому для того, чтобы
        максимально упростить данный процесс и была разработана эта программа.
      </p>

      {showMoreText && (
        <p className="top_text">
          Способ использования следующий: нужно выбрать одну из категорий
          (вопросы одинаковые но у тех, что с перчинкой присутствуют вопросы
          откровенного характера), нажать на кнопку start, заскринить и
          отправить собеседнику. И так попеременно. Приятного общения.
        </p>
      )}

      <button className="button top-button" onClick={showMore}>
        {showMoreText ? 'Скрыть' : 'Читать дальше'}
      </button>
    </>
  );
}
