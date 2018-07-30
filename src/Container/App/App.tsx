declare global {
  interface Window { require: any; }
}

import * as React from 'react';

// electron
const { shell } = window.require('electron');

// style
import './App.css';

// image
import logo from './../../Image/logo.svg';

class App extends React.Component {

  public beep = () => {
    shell.beep();
  }

  public render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <p className='App-intro'>
          To get started, edit <code>src/App.tsx</code> and save to
          <button onClick={this.beep}>beep</button>
        </p>
      </div>
    );
  }
}

export default App;
