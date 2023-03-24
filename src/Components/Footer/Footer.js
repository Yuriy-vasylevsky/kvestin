import React from 'react';
import Container from '../Container/Container';
import './Footer.scss';
import Button from '../Button/Button';
export default function Footer({ counter, onClik, cleanOll }) {
  return (
    <footer className="footer">
      <Container>
        <div className="section-footer-btn">
          <button
            type="button "
            className="button footer-button"
            onClick={onClik}
          >
            start
          </button>
          <p className="text">{counter}</p>
          {/* 
          <button
            type=
            className=
            onClick={cleanOll}
          >
            clean
          </button> */}

          <Button
            title={'clean'}
            clasName={'button footer-button stop'}
            onClick={cleanOll}
            type={'button '}
          />
        </div>
      </Container>
    </footer>
  );
}
