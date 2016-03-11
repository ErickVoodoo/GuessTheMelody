import '../styles/main.scss';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route } from 'react-router';

import App from './app';
import Logo from './components/logo';
import Menu from './components/menu';
import Game from './components/game';

class PhonegapApp {
  constructor() {
    if (typeof (cordova) !== 'undefined' || typeof (phonegap) !== 'undefined') {
      document.addEventListener('deviceready', this.bootstrapApp, false);
    } else {
      window.onload = this.bootstrapApp();
    }
  }

  bootstrapApp() {
    render(
      (
        <Router history={browserHistory}>
          <Route path="/" component={App}>
            <Route path="logo" component={Logo} />
            <Route path="menu" component={Menu} />
            <Route path="game" component={Game} />
          </Route>
        </Router>
      ), document.getElementById('content')
    );

    if (navigator.splashscreen) {
      setTimeout(function () {
        navigator.splashscreen.hide();
      }, 2000);
    }
  }
}

var app = new PhonegapApp();
export default app;
