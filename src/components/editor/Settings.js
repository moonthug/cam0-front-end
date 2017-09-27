import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, Button, Checkbox, Dropdown, Form, Icon } from 'semantic-ui-react';

import { toDropdownOptions } from '../../utils/arrayHelper';

import blendModes from '../../constants/blendModes';
import themes from '../../constants/themes';

const Settings = ({ settings, onSettingsUpdateSetting, onSettingsCreateLayer }) => {


  /////////////////////////////////////
  //
  // EVENT HANDLERS

  const onChange = (e, data) => {
    if(data.type === 'checkbox')
      data.value = data.checked;


    if(data.type === 'range')
      data.value = parseFloat(data.value);

    onSettingsUpdateSetting({
      key: data.name,
      value: data.value
    });
  };


  /////////////////////////////////////
  //
  // RENDER

  return (
    <Accordion className="settings" styled>
      <Accordion.Title active>
        <Icon name="theme"/> Settings
      </Accordion.Title>
      <Accordion.Content active>
        <Form>

          <Form.Group widths="equal">
            <Dropdown
              placeholder="Theme <none>"
              name="theme"
              defaultValue={settings.theme}
              search
              selection
              options={toDropdownOptions(themes)}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <Form.Input
                label="Background Color"
                type="color"
                name="backgroundColor"
                defaultValue={settings.backgroundColor}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Dropdown
              placeholder="Blend Mode"
              name="blendMode"
              defaultValue={settings.blendMode}
              search
              selection
              options={blendModes}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <Checkbox
                label="Enable Blur"
                name="blur"
                defaultChecked={settings.blur}
                onChange={onChange}
                toggle
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                label="Blur Amount"
                type="range"
                name="blurAmount"
                defaultValue={settings.blurAmount}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Button.Group>
          <Button onClick={onSettingsCreateLayer} positive>Add Layer</Button>
        </Button.Group>
      </Accordion.Content>

    </Accordion>
);
};


/////////////////////////////////////
//
// PROP VALIDATION

const {func, object} = PropTypes;

Settings.propTypes = {
  settings: object.isRequired,
  onSettingsCreateLayer: func.isRequired,
  onSettingsUpdateSetting: func.isRequired,
};


/////////////////////////////////////
//
// EXPORT

export default Settings;
