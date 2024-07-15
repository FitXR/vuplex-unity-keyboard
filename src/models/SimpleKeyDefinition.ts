import { ReactElement } from 'react';

import sendSfxMessage, { SoundEffect } from '../utils/sendSfxMessage';

import KeyDefinition from './KeyDefinition';

export default class SimpleKeyDefinition implements KeyDefinition {
  constructor(
    public value: string | ReactElement,
    private _clickHandler: (SimpleKeyDefinition) => void,
    private _clickSoundEffectId: SoundEffect | undefined = 'uiSecondaryButtonClick',
  ) {}

  onClick = () => {
    this._clickSoundEffectId && sendSfxMessage(this._clickSoundEffectId);

    if (this._clickHandler) {
      this._clickHandler(this);
    }
  };

  onHover = () => {
    sendSfxMessage('uiHover');
  };
}
