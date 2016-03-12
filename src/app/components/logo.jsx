import style from '../../styles/logo';

import React from 'react';
import logo from '../../img/logo.jpg';

export default class Logo extends React.Component {
  componentDidMount() {
    setTimeout(function() {
      window.location.href = '#/menu';
    }, 2000);
  }

  render() {
    return (
      <div className={ style.page }>
        <img src={ logo }/>
      </div>
    );
  };
}
