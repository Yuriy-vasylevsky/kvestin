import './Button.css';
import React, { useState } from 'react';

// export default function Button({ title, clasName, onClick, type }) {
//   return (
//     <button type={type} className={clasName} onClick={onClick}>
//       {title}
//     </button>
//   );
// }

const Button = ({ onClick, title, clasName, type }) => {
  // const [buttonTitle, setButtonTitle] = useState(title);

  // const handleButtonClick = () => {
  //   setButtonTitle('Нова назва кнопки');
  //   onClick();
  // };

  return (
    <button className={clasName} onClick={onClick} type={type}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {title}
    </button>
  );
};

export default Button;
