import style from '../../styles/login.scss';
import logo from '../../img/logo.png';

import React from 'react';

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickNavigateToList() {
    window.location.href = '#/second';
  }

  render() {
    return (
      <div className={ style.main }>
        <div className={ style.header }>
          <img src={ logo }/>
        </div>
        <div className={ style.content }>
          <button onClick={ this.onClickNavigateToList.bind(this) }>go next</button>
        </div>
      </div>
    );
  }
}
