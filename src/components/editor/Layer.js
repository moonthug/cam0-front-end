import React from 'react';
import PropTypes from 'prop-types';

import { Button, Form, Icon } from 'semantic-ui-react';
import ColorPicker from './common/ColorPicker';

const Layer = ({ layer, onLayerUpdate, onLayerDuplicate, onLayerRemove }) => {
  /////////////////////////////////////
  //
  // EVENT HANDLERS

  const onChange = (e, data) => {
    if (data.type === 'checkbox') data.value = data.checked;

    if (data.type === 'range') data.value = parseFloat(data.value);

    onLayerUpdate({
      layerId: layer.id,
      key: data.name,
      value: data.value,
      draw: true
    });
  };

  const onDelete = e => {
    onLayerRemove(layer.id);
    e.preventDefault();
  };

  const onDuplicate = e => {
    onLayerDuplicate(layer.id);
    e.preventDefault();
  };

  /////////////////////////////////////
  //
  // RENDER

  return (
    <div className="layer">
      <Form className="columns">
        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="Seed"
              type="range"
              max="1000000"
              name="noiseSeed"
              defaultValue={layer.noiseSeed}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            {/*<Form.Input*/}
            {/*label="Color"*/}
            {/*type="color"*/}
            {/*name="color"*/}
            {/*defaultValue={layer.color}*/}
            {/*onChange={onChange}*/}
            {/*/>*/}
            <ColorPicker color={layer.color} onChangeComplete={onChange} />
          </Form.Field>

          <Form.Field>
            <Form.Input
              label="Alpha"
              type="range"
              max="255"
              name="alpha"
              defaultValue={layer.alpha}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="Threshold Min"
              type="range"
              max="1"
              step="0.01"
              name="thresholdMin"
              defaultValue={layer.thresholdMin}
              onChange={onChange}
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              label="Threshold Max"
              type="range"
              max="1"
              step="0.01"
              name="thresholdMax"
              defaultValue={layer.thresholdMax}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Field>
            <Form.Input
              label="Frequency"
              type="range"
              max="1000"
              name="frequency"
              defaultValue={layer.frequency}
              onChange={onChange}
            />
          </Form.Field>

          <Form.Field>
            <Form.Input
              label="Amplitude"
              type="range"
              max="2"
              step="0.01"
              name="amplitude"
              defaultValue={layer.amplitude}
              onChange={onChange}
            />
          </Form.Field>
        </Form.Group>

        <Button.Group>
          <Button positive onClick={onDuplicate}>
            <Icon name="clone" />Clone
          </Button>
          <Button negative onClick={onDelete}>
            <Icon name="delete" />Delete
          </Button>
        </Button.Group>
      </Form>
    </div>
  );
};

/////////////////////////////////////
//
// PROP VALIDATION

const { func, number, shape, string } = PropTypes;

Layer.propTypes = {
  layer: shape({
    id: number.isRequired,
    noiseSeed: number.isRequired,
    color: string.isRequired,
    alpha: number.isRequired,
    thresholdMin: number.isRequired,
    thresholdMax: number.isRequired,
    blendMode: string.isRequired,
    frequency: number.isRequired,
    amplitude: number.isRequired
  }).isRequired,
  onLayerUpdate: func.isRequired,
  onLayerDuplicate: func.isRequired,
  onLayerRemove: func.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default Layer;
