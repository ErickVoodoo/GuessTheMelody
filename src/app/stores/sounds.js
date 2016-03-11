import { EventEmitter } from 'events';
import AppDispatcher from '../dispatchers/main';
import { Constants } from '../utils';

import buttonSound from "../../sounds/click-button.mp3";
import switchSound from "../../sounds/switch-button.mp3";

class Sounds extends EventEmitter {
  constructor() {
    super();
    this.state = {
      audio: new Audio(),
    };
  }

  playButtonClick() {
    this.state.audio.pause();
    this.state.audio.src = buttonSound;
    this.state.audio.play();
  }

  playSwitchClick() {
    this.state.audio.pause();
    this.state.audio.src = switchSound;
    this.state.audio.play();
  }
}
let _Sounds = new Sounds();

AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.type) {
    case Constants.SOUNDS.BUTTON_CLICK:
      _Sounds.playButtonClick();
      break;
    case Constants.SOUNDS.SWITCH_CLICK:
      _Sounds.playSwitchClick();
      break;
    default:
      break;
  }
});

export default _Sounds;
