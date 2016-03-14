import style from '../../styles/game.scss';
import dialog from '../../styles/dialog.scss';

import React from 'react';
import Store from '../stores/main';
import Action from '../actions/main';
import cx from 'classnames';
import { Constants } from '../utils';

import logo from '../../img/game.png';
import CustomDialog from './common/dialog';

import Music from '../stores/music';
import GameMusic from '../../music/game.mp3';
import Media from 'media';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.changeStoreCallback = this.storeChangeListener.bind(this);

    this.state = {
      isPauseHided: true,
    };
  }

  componentDidMount() {
    Store.addStoreChangeListener(this.changeStoreCallback);
    setTimeout(function () {
      Action.actionStart(null, Constants.MUSIC.GAME_MUSIC);
    }, Constants.APP_SETTINGS.MUSIC_STOP_SPEED);
    setTimeout(function () {
      Action.actionStart(null, Constants.MUSIC.GLOBAL_PAUSE_MUSIC);
    }, Constants.APP_SETTINGS.MUSIC_STOP_SPEED);
  }

  componentWillUnmount() {
    Store.removeStoreChangeListener(this.changeStoreCallback);
  }

  ajaxChangeListener() {
    this.setState({
      isLoading: Ajax.isExecuting,
    });
  }

  storeChangeListener() {
    this.setState({
      dataList: Store.data,
      inputStoreValue: '',
      source: Store.source,
    });
  }

  onChangeStoreInput(e) {
    this.setState({
      inputStoreValue: e.target.value,
    });
  }

  onChangeAjaxInput(e) {
    this.setState({
      inputAjaxValue: e.target.value,
    });
  }

  onClickAddData() {
    Action.actionStart(null, Constants.SOUNDS.BUTTON_CLICK);
    Action.actionStart(this.state.inputStoreValue, Constants.ACTIONS.ADD_DATA);
  }

  onBackButton() {
    //Music.onApproximateVolume();
    window.location.href = '#/menu';
  }

  onPauseGame() {
    console.log("onPauseGame");
    this.setState({
      isPauseHided: false,
    });
  }

  onRepeatSound() {
    var mm = new Media(GameMusic, // success callback
             function () { console.log("playAudio():Audio Success"); },
            // error callback
             function (err) { console.log("playAudio():Audio Error: " + err); }
    );
mm.play();
        /*setTimeout(function () {
      Action.actionStart(null, Constants.MUSIC.GLOBAL_PAUSE_MUSIC);
    }, Constants.APP_SETTINGS.MUSIC_STOP_SPEED);*/
  }

  hidePauseDialog() {
    console.log("hidePauseDialog");
    this.setState({
      isPauseHided: true
    });
  }

  render() {
    return (
      <div className={ cx(style.container, 'text-blue') }>
        <div className={ style.main }>
          <div className={ style.header }>
            <div className={ style.left }>
              <span>1 раунд</span>
            </div>
            <div className={ style.right }>
              <span>Какой инструмент сейчас играет?</span>
            </div>
          </div>
          <div className={ style.content }>
            <table>
              <tbody>
                <tr>
                  <td>
                    <img src={ logo }/>
                    <span>Аккордеон</span>
                  </td>
                  <td>
                    <img src={ logo }/>
                    <span>Рояль</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={ logo }/>
                    <span>Пианино</span>
                  </td>
                  <td>
                    <img src={ logo }/>
                    <span>Баян</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={ cx(style.footer, 'backgroud-blue') }>
            <div className={ style.left }>
              <button onClick={ this.onBackButton.bind(this) }>back</button>
            </div>
            <div className={ style.middle }>
              <button onClick={ this.onPauseGame.bind(this) }>pause</button>
            </div>
            <div className={ style.right }>
              <button onClick={ this.onRepeatSound.bind(this) }>repeat</button>
            </div>
          </div>
        </div>
        <CustomDialog isHidden={ this.state.isPauseHided } onHideDialog={ this.hidePauseDialog.bind(this) }>
          <div className={ dialog.dialog }>
            <div className={ dialog.header }>
              <span>Header</span>
            </div>
            <div className={ dialog.content }>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
              <p>Content</p>
            </div>
            <div className={ dialog.footer }>
              <span>Footer</span>
            </div>
          </div>
        </CustomDialog>
      </div>
    );
  }
}
