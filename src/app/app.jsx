import React from 'react';

import Logo from './components/logo';

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children || <Logo />}
      </div>
    );
  }
}
