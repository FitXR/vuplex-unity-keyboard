import React, { Component } from 'react';
import Key from '../Key';
import SimpleKeyDefinition from '../../../models/SimpleKeyDefinition';
import './styles.scss';
import sendMultiCharacterKeyboardInput from "../../../utils/sendMultiCharacterKeyboardInput";

export default class RightPad extends Component {

  private _rows = [
    [
      new SimpleKeyDefinition('@gmail.com', sendMultiCharacterKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@hotmail.com', sendMultiCharacterKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@yahoo.com', sendMultiCharacterKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@gmail.co.uk', sendMultiCharacterKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@melero.museum', sendMultiCharacterKeyboardInput),
    ]
  ];

  render() {
    return (
      <div className="num-pad">
        <div className="key-area">
            <div className="key-row">
              <div className="key-offset-margin"/>
              {this._rows[0].map(this._renderKey)}
              <div className="key-offset-margin"/>
            </div>
            <div className="key-row">
              <div className="key-offset-margin"/>
              {this._rows[1].map(this._renderKey)}
              <div className="key-offset-margin"/>
            </div>
            <div className="key-row">
              <div className="key-offset-margin"/>
              {this._rows[2].map(this._renderKey)}
              <div className="key-offset-margin"/>
            </div>
            <div className="key-row">
              <div className="key-offset-margin"/>
              {this._rows[3].map(this._renderKey)}
              <div className="key-offset-margin"/>
            </div>
            <div className="key-row">
              <div className="key-offset-margin"/>
              {this._rows[4].map(this._renderKey)}
              <div className="key-offset-margin"/>
            </div>
        </div>
      </div>
    );
  }

  _renderKey = (key) => {
    return <Key className="key" definition={key} key={key.value}/>;
  }
}
