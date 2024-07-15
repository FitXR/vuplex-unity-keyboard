import MessageType from '../models/MessageType';

export type SoundEffect = 'uiPrimaryButtonClick' | 'uiSecondaryButtonClick' | 'uiHover';

export default function sendSfxMessage(soundEffectId: SoundEffect) {
  if (window.vuplex) {
    const message = {
      EventType: MessageType.PLAY_FEEDBACK_EFFECTS,
      Message: {
        SoundEffectID: soundEffectId,
      },
    };
    window.vuplex.postMessage(message);
  }
}
