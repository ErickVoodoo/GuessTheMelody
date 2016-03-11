import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/main';
import { Constants } from '../utils';

import MenuMusic from '../../music/menu.mp3';
import GameMusic from '../../music/game.mp3';

class Music extends EventEmitter {
  constructor() {
    super();

    this.state = {
      audioModule: new Audio(),
      playing: '',
    }
  }

  onPausePlayMusic() {
    if(!this.state.audioModule.paused)
      this.state.audioModule.pause();
    else
      this.state.audioModule.play();
  }

  onRevertMusic() {
    this.state.audioModule.pause();
    this.state.audioModule.currentTime = 0;
    this.state.audioModule.play();
  }

  onChangeMusic(newMusic) {
    if(this.state.playing != newMusic){
      this.state.audioModule.src = null;
      this.state.audioModule.src = newMusic;
      this.onRevertMusic();
      this.state.playing = newMusic;
    }
  }

  onLoopMusic(newLoop) {
    if(typeof(newLoop) == 'boolean')
      this.state.audioModule.src = newLoop;
  }

  onVolumeChangeMusic(newVolume) {
    console.log(newVolume);
    if(newVolume <= 1)
      this.state.audioModule.volume = newVolume;
  }

  onApproximateVolume() {
    let getVolume = this.state.audioModule.volume;
    let changeConstant = getVolume/(Constants.APP_SETTINGS.MUSIC_STOP_SPEED/Constants.APP_SETTINGS.MUSIC_VOLUME_CHANGE_SPEED);
    let allMSeconds = 0;

    var interval = setInterval(() => {
      getVolume = this.state.audioModule.volume;
      if(allMSeconds < Constants.APP_SETTINGS.MUSIC_STOP_SPEED) {
        this.onVolumeChangeMusic((getVolume - changeConstant).toFixed(2));
      } else {
        this.onVolumeChangeMusic((getVolume + changeConstant).toFixed(2));
      }
      allMSeconds += Constants.APP_SETTINGS.MUSIC_VOLUME_CHANGE_SPEED;
      if(allMSeconds == Constants.APP_SETTINGS.MUSIC_STOP_SPEED*2) {
        clearInterval(interval);
      }
    }, Constants.APP_SETTINGS.MUSIC_VOLUME_CHANGE_SPEED);
  }
}

let _Music = new Music();

AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case Constants.MUSIC.MENU_MUSIC:
      _Music.onChangeMusic(MenuMusic);
      break;
    case Constants.MUSIC.GAME_MUSIC:
      _Music.onChangeMusic(GameMusic);
      break;
    case Constants.MUSIC.GLOBAL_PAUSE_MUSIC:
    case Constants.MUSIC.GLOBAL_PLAY_MUSIC:
      _Music.onPausePlayMusic();
      break;
    case Constants.MUSIC.GLOBAL_LOOP_MUSIC:
      _Music.onLoopMusic(action.data);
      break;
    case Constants.MUSIC.GLOBAL_VOLUME_MUSIC:
      _Music.onVolumeChangeMusic(action.data);
      break;
    default:
      break;
  }
});

export default _Music;
