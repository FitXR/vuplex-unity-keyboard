import EventEmitter from 'events';
import EnglishKeySet from './EnglishKeySet';
import LanguageKeySet from './LanguageKeySet';
import KeyboardLayout from '../KeyboardLayout';

export default class MultilingualKeySet extends EventEmitter {

  private _keySetIndex = 0;
  private _keySets: LanguageKeySet[] = [
    new EnglishKeySet(),
  ]

  constructor() {
    super();
    this._keySets.forEach(keySet => keySet.on('layoutChanged', this._handleLayoutChanged));
  }

  /**
  * @override
  */
  get language() {

    return this._getKeySet().language;
  }

  /**
  * @override
  */
  get layout() {

    return this._getKeySet().layout;
  }

  /**
  * @override
  */
  getRows() {

    const rows = this._getKeySet().getRows();
    // Replace the existing @ key in the bottom row with the globe icon for switching languages.
    // rows[3][1] = new SimpleKeyDefinition(this._getSwitchLanguageIcon() , this._handleSwitchLanguageKeyClick);
    return rows;
  }

  setLanguage(languageCode) {

    this._keySetIndex = this._keySets.findIndex(k => k.languageCode === languageCode);
    if (this._keySetIndex === -1) {
      this._keySetIndex = this._keySets.findIndex(k => k.languageCode === 'en');
    }
    this.emit('layoutChanged', this);
  }

  setLayout(layout: KeyboardLayout) {
    
    this._keySets.forEach(keySet => keySet.setLayout(layout));
  }

  private _getKeySet() {

    return this._keySets[this._keySetIndex];
  }

  private _handleLayoutChanged = () => {

    this.emit('layoutChanged', this);
  }
}
