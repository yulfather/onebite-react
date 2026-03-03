import './Header.css';
import { memo } from 'react';

function Header({ leftChild, rightChild, title, date }) {
  return (
    <div className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">
        <div className="header_title">{title}</div>
        <div className="header_date">{date}</div>
      </div>
      <div className="header_right">{rightChild}</div>
    </div>
  );
}

export default memo(Header);
