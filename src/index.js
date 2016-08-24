/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Dashboard from './components/Dashboard';
import Browse from './components/Browse';
import Callback from './components/Callback';
import App from './components/App';
import { browse, dashboard, callback } from './constants/pathnames';
import * as stores from './stores';

useStrict(true);

require('../styles/index.scss');

ReactDOM.render(
  <Provider { ...stores }>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Browse} />
        <Route path={callback} component={Callback} />
        <Route path={dashboard} component={Dashboard} />
        <Route path={browse} component={Browse} />
        <Route path="*" component={Browse} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
