import './Header.css';
import { memo } from 'react';

function Header() {
  return (
    <div className="Header">
      <h3>오늘은</h3>
      <h1>{new Date().toLocaleDateString()}</h1>
    </div>
  );
}

// const memoizedHeader = memo(Header);
// export default memoizedHeader;
export default memo(Header);
