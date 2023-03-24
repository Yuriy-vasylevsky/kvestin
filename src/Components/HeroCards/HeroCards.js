import React from 'react';
import './HeroCards.scss';
import { Link } from 'react-router-dom';

export function HeroCards({ img, title, path, clas }) {
  return (
    <div className="hero__cards cards-hero">
      <Link to={path} className="cards-hero__link link">
        <div className={`cards-hero__img ${clas}`}>
          <img src={img} alt="" />
        </div>
        <p className="cards-hero__text">{title}</p>
      </Link>
    </div>
  );
}
