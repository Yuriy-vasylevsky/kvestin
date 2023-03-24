import './Form.scss';
import { useState } from 'react';
import React from 'react';
// import Button from '../Button/Button';
export default function Form({ title, onClickForm, children }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <>
      <form className="decor">
        <div className="form-left-decoration"></div>
        <div className="form-right-decoration"></div>
        <div className="circle"></div>
        <div className="form-inner">
          {/* <h3>{title}</h3> */}
          {/* <input type="text" placeholder="Username" /> */}
          <input
            type="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPass(e.target.value)}
          />
          <input
            type="submit"
            value={title}
            onClick={e => onClickForm(email, pass, e)}
          />
          <div className="">{children}</div>
        </div>
      </form>
    </>
  );
}
