/*eslint-disable */
import SC from 'soundcloud';
/*eslint-enable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Dashboard } from './components/Dashboard';
import Browse from './components/Browse';
import Callback from './components/Callback';
import App from './components/App';
import { browse, dashboard, callback } from './constants/pathnames';

require('../styles/index.scss');

ReactDOM.render(
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Browse} />
      <Route path={callback} component={Callback} />
      <Route path={dashboard} component={Dashboard} />
      <Route path={browse} component={Browse} />
      <Route path="*" component={Browse} />
    </Route>
  </Router>,
  document.getElementById('app')
);
