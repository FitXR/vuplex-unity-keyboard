
enum MessageType {
  /**
  * Incoming messages
  */
  KEYBOARD_HIDDEN = 'keyboard.hidden',
  SET_LANGUAGE = 'keyboard.setLanguage',
  VOICE_RECOGNITION_DISABLED = 'keyboard.voiceRecognitionDisabled',
  VOICE_RECOGNITION_ENABLED = 'keyboard.voiceRecognitionEnabled',
  VOICE_RECOGNITION_FINISHED = 'keyboard.voiceRecognitionFinished',
  VOICE_RECOGNITION_STARTED = 'keyboard.voiceRecognitionStarted',
  KEYBOARD_TYPE = 'KeyboardType',

  /**
  * Outgoing messages
  */
  INPUT_RECEIVED = 'keyboard.inputReceived',
  KEYBOARD_INITIALIZED = 'keyboard.initialized',
  VOICE_RECOGNITION_FINISH_REQUESTED = 'keyboard.voiceRecognitionFinishRequested',
  VOICE_RECOGNITION_START_REQUESTED = 'keyboard.voiceRecognitionStartRequested',
};

export default MessageType;

