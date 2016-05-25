import style from '../../styles/menu.scss';

import React from 'react';
import Action from '../actions/main';
import { Constants } from '../utils';
import Music from '../stores/music';

import Button from './common/menu_button';

export default class FirstPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: new Audio(),
    };

    let localPath = '/static/music/game.mp3';
    let p = window.location.pathname;
    let root = p.substring(0, p.lastIndexOf('/')) + localPath;
    alert(root);

    if (window.Media != null) {
      alert('Music != null');
      var myMedia = new Media(root, this.onSuccess, this.onError);
      myMedia.play();
    } else {
      alert('Music ==null');
    }
  }

  onError(err) {
    alert('Error:' + JSON.stringify(err));
  }

  onSuccess() {
    alert('Success');
  }

  onClickNavigateToGame() {
    //Music.onApproximateVolume();
    Action.actionStart(null, Constants.SOUNDS.BUTTON_CLICK);
    window.location.href = '#/game';
  }

  componentDidMount() {
    /*setTimeout(function () {
      Action.actionStart(null, Constants.MUSIC.MENU_MUSIC);
    }, Constants.APP_SETTINGS.MUSIC_STOP_SPEED);*/
  }

  render() {
    return (
      <div className={ style.main }>
        <div className={ style.header }>
          </div>
          <div className={ style.content }>
            <Button clickListener={ this.onClickNavigateToGame.bind(this) } textColor="text-green">Играть</Button>
            <Button clickListener={ this.onClickNavigateToGame.bind(this) } textColor="text-blue">Достижения</Button>
            <Button clickListener={ this.onClickNavigateToGame.bind(this) } textColor="text-red">Настройки</Button>
        </div>
      </div>
    );
  }
}
