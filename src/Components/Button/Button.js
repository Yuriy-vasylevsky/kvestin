import './Button.css';

import React from 'react';

export default function Button({ title, clasName, onClick, type }) {
  return (
    <button type={type} className={clasName} onClick={onClick}>
      {title}
    </button>
  );
}
