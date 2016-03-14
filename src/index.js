import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import store from './store';
import App from './app';

render((<App store={store}/>), document.getElementById('root'));

require('webpack/hot/dev-server')
require('webpack-dev-server/client?http://0.0.0.0:8080')

module.hot.accept('./app.js', () => {
  console.log("===> hot reload app.js");
  const newApp = require('./app');
  renderAll();
});

