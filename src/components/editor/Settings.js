import React from 'react';
import PropTypes from 'prop-types';

import Layer from './Layer';

import blendModes from '../../constants/blendModes';


const Settings = ({ settings, onSettingsUpdateSetting }) => {

  const _onChange = (e, formatter, value) => {
    value = typeof value !== 'undefined' ? value : e.target.value;

    onSettingsUpdateSetting({
      key: e.target.getAttribute('name'),
      value: formatter ? formatter(value) : value
    });
  };

  const onChangeString = (e) => { _onChange(e); };
  const onChangeInt = (e) => { _onChange(e, parseInt); };
  const onChangeCheckbox = (e) => { _onChange(e, null, e.target.checked); };

  const renderBlendModeOptions = () => {
    return blendModes.map((blendMode, i) => {
      return (
        <option
          key={i}
          value={blendMode}
        >
          {blendMode}
        </option>
      );
    });
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <input
        type="color"
        name="backgroundColor"
        defaultValue={settings.backgroundColor}
        onChange={onChangeString}
      />
      <input
        type="checkbox"
        name="blur"
        defaultChecked={settings.blur}
        onChange={onChangeCheckbox}
      />
      <input
        type="range"
        name="blurAmmount"
        defaultValue={settings.blurAmmount}
        onChange={onChangeInt}
      />
      <select
        name="blendMode"
        onChange={onChangeString}
      >
        { renderBlendModeOptions() }
      </select>
    </div>
  );
};


/////////////////////////////////////
//
// PROP VALIDATION

const { func, object } = PropTypes;

Settings.propTypes = {
  settings: object.isRequired,
  onSettingsUpdateSetting: func.isRequired,
};


/////////////////////////////////////
//
// EXPORT

export default Settings;
