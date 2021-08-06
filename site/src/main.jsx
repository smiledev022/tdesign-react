import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import '@common/style/web/index.less';
import '@common/style/web/docs.less';
import './demo.less';

import '@common/site/lib/site.es.js';
import '@common/site/lib/style.css';
// import '@common/site/src/styles/docs.less'; // debug site style

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
