import * as React from 'react';

// image
import logo from './../../Image/logo.svg';

// style
import './style.css';

class Header extends React.Component {

  render() {
    return (
    <header className="header">
      <h1 className="title">
        <img src={logo} className="logo" alt="logo" />
        <span className="title-txt">Banner maker</span>
      </h1>
    </header>
    );
  }
}

export default Header;
