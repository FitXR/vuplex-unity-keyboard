import KeyDefinition from '../models/KeyDefinition';
import MessageType from '../models/MessageType';
import {ReactElement} from "react";

export default function sendMultiCharacterKeyboardInput(keyDefinition: KeyDefinition) {
  const sendMessage = (char: string) => {
    if (window.vuplex) {
      window.vuplex.postMessage({ type: MessageType.INPUT_RECEIVED, value: char });
    }
  };

  const processValue = (value: string | ReactElement) => {
    if (typeof value === 'string') {
      // If value is a string, split it into characters and send them one by one
      const characters = value.split('');
      characters.forEach((char, index) => {
        setTimeout(() => sendMessage(char), index * 0.05);
      });
    }
  };

  if (keyDefinition.value) {
    processValue(keyDefinition.value);
  }
}
