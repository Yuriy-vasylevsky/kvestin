import './QuestionBox.scss';

import React from 'react';

export default function QuestionBox({ questions, title }) {
  return (
    <>
      <h2 className="box-section-hero__title">{title}</h2>
      <div className="section-hero__box box-section-hero">
        <div className="box-section-hero__text">
          {questions ? questions : ''}
        </div>
      </div>
    </>
  );
}
