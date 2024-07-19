import React, { Component } from 'react';

import MessageType from '../../models/MessageType';
import SimpleKeyDefinition from '../../models/SimpleKeyDefinition';
import sendKeyboardInput from '../../utils/sendKeyboardInput';
import BackspaceIcon from '../BackspaceIcon/BackspaceIcon';

import CenterBoard from './CenterBoard';
import MultilingualKeySet from './key-sets/MultilingualKeySet';
import returnIcon from './assets/tick-icon.svg';
import Key from './Key';
import NumPad from './NumPad';
import RightPad from './RightPad';
import KeyboardType from './KeyboardType';
import KeyboardLayout from './KeyboardLayout';

import './styles.scss';

export default class Keyboard extends Component {
  private _keySet = new MultilingualKeySet();
  private _returnKeyDefinition = new SimpleKeyDefinition(
    'Enter',
    sendKeyboardInput,
    'uiPrimaryButtonClick'
  );
  state = {
    language: this._keySet.language,
    layout: this._keySet.layout,
    voiceRecognitionEnabled: false,
    voiceRecognitionActive: false,
    showNumPad: true,
    showAlphanumeric: true,
    showEmailSuggestion: false,
  };

  private _backspaceKeyDefinition = new SimpleKeyDefinition(
    'Backspace',
    sendKeyboardInput,
  );

  constructor(props) {
    super(props);
    this._keySet.on('layoutChanged', this._handleLayoutChange);
  }

  componentDidMount() {
    if (window.vuplex) {
      this._initMessages();
    } else {
      window.addEventListener('vuplexready', this._initMessages);
    }
  }

  render() {
    const {showNumPad, showAlphanumeric, showEmailSuggestion} = this.state;

    return (
      <div className="keyboard">
        {showNumPad && 
            <div className="num-pad-container">
              <NumPad />
            </div>
        }
        {showAlphanumeric && 
          <>
            <div className="board-margin" /> 
            <div className="center-board-container">
              <CenterBoard
                rows={this._keySet.getRows()}
                spacebarText={this._keySet.language}
              />
            </div>
          </>
        }
        <div className="enter-key-area">
          <Key
            className="backspace-icon"
            definition={this._backspaceKeyDefinition}>
            <BackspaceIcon />
          </Key>
          <div className="return-key-container">
            <Key
              definition={this._returnKeyDefinition}
              className="return-key-component">
              <div className="return-key">
                <div className="return-key-text">
                  <img src={returnIcon} alt="return" />
                </div>
              </div>
            </Key>
          </div>
        </div>
        {showEmailSuggestion &&
          <div className="right-pad-container">
            <RightPad />
          </div>
        }
      </div>
    );
  }

  private _handleReceivedMessage = (message) => {
    const data = JSON.parse(message.data);

    switch (data.type) {
      case MessageType.KEYBOARD_HIDDEN:
        Key.handleKeyboardHidden();
        break;
      case MessageType.SET_LANGUAGE:
        this._keySet.setLanguage(data.value);
        break;
      case MessageType.VOICE_RECOGNITION_DISABLED:
        this.setState({ voiceRecognitionEnabled: false });
        break;
      case MessageType.VOICE_RECOGNITION_ENABLED:
        this.setState({ voiceRecognitionEnabled: true });
        break;
      case MessageType.VOICE_RECOGNITION_FINISHED:
        this.setState({ voiceRecognitionActive: false });
        break;
      case MessageType.VOICE_RECOGNITION_STARTED:
        this.setState({ voiceRecognitionActive: true });
        break;
      case MessageType.KEYBOARD_TYPE:
        this._setKeyboardType(data.value);
        break;
      case MessageType.SWITCH_LAYOUT:
        this._switchLayout(data.value);
        break;
    }
  };

  private _setKeyboardType(keyboardType: KeyboardType) {
    switch(keyboardType) {
      case KeyboardType.Email:
        this.setState({ showNumPad: true, showAlphanumeric: true, showEmailSuggestion: true });
        break;
      case KeyboardType.Numeric:
        this.setState({ showNumPad: true, showAlphanumeric: false, showEmailSuggestion: false });
        break;
      case KeyboardType.Alphanumeric:
      default:
        this.setState({ showNumPad: true, showAlphanumeric: true, showEmailSuggestion: false });
        break;
    }
  }

  private _switchLayout(layoutString: string) {
    const layoutEnumValue = KeyboardLayout[layoutString as keyof typeof KeyboardLayout];
    const layout = layoutEnumValue !== undefined 
      ? layoutEnumValue 
      : KeyboardLayout.LOWERCASE;
    return this.setState({ layout: layout });
  };

  private _handleLayoutChange = (keySet) =>
    this.setState({ language: keySet.language, layout: keySet.layout });

  private _initMessages = () => {
    window.vuplex.addEventListener('message', this._handleReceivedMessage);
    window.vuplex.postMessage({ type: MessageType.KEYBOARD_INITIALIZED });
  };
}
