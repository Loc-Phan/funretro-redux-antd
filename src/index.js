import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Header from './components/header';
import Login from './pages/login';
import Logup from './pages/logup';
import { Provider } from 'react-redux';
import store from './store';

import './index.css';
import 'antd/dist/antd.css';

import reportWebVitals from './reportWebVitals';
import Home from './pages/home';
import DetailBoard from './pages/detailBoard';
import UpdateUserInfo from './pages/updateUserInfo';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route path='/' exact><Home></Home></Route>
        <Route path='/login'><Login /></Route>
        <Route path='/logup'><Logup /></Route>
        <Route path='/detail-board/:id'><DetailBoard /></Route>
        <Route path='/user-info'><UpdateUserInfo /></Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
