import React, { Component } from 'react';
import Key from '../Key';
import SimpleKeyDefinition from '../../../models/SimpleKeyDefinition';
import sendKeyboardInput from '../../../utils/sendKeyboardInput';
import './styles.scss';

export default class RightPad extends Component {

  private _rows = [
    [
      new SimpleKeyDefinition('@gmail.com', sendKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@hotmail.com', sendKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@yahoo.com', sendKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@gmail.co.uk', sendKeyboardInput),
    ],
    [
      new SimpleKeyDefinition('@melero.museum', sendKeyboardInput),
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
