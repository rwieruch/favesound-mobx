/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import * as stores from './stores';

require('../styles/index.scss');

ReactDOM.render(
  <Provider { ...stores }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}
