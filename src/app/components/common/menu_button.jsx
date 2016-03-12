import cx from 'classnames';
import style from '../../../styles/menu_button';
import logo from '../../../img/game.png';
import React from 'react';

export default class ListItem extends React.Component {
  render() {
    return (
      <div className={ style.content } onClick={ this.props.clickListener }>
        <div className={ style.image }>
          <img src={ logo }/>
        </div>
        <div className={ cx(style.text, this.props.textColor) }>
          <span>{ this.props.children }</span>
        </div>
      </div>
    );
  }
}
