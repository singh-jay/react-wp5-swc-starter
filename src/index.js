import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Check if HMR interface is enabled
// if (module.hot) {
//   // Accept hot update
//   module.hot.accept();
// }
