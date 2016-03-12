import React from 'react';

import cx from 'classnames';
import style from '../../../styles/dialog';

export default class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div className={ cx(style.container, this.props.isHidden ? style.hide : style.show) }>
        <div className={ style.background } onClick={ this.props.onHideDialog }/>
        <div className={ style.main }>
          { this.props.children }
        </div>
      </div>
    );
  }
}
