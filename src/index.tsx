import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './Container/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render((
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  ),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
