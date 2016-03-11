import style from '../../../styles/menu_button';
import logo from '../../../img/game.png';
import React from 'react';

export default class ListItem extends React.Component {
  render() {
    return (
      <div className={ style.content } onClick={ this.props.clickListener }>
        <img src={ logo }/>
        <a>{ this.props.children }</a>
      </div>
    );
  }
}
