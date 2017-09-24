import React from 'react';
import PropTypes from 'prop-types';

const Layer = ({ layer, onLayerUpdate, onLayerRemove }) => {

  const _onChange = (e, formatter) => {
    onLayerUpdate({
      layerId: layer.id,
      key: e.target.getAttribute('name'),
      value: formatter ? formatter(e.target.value) : e.target.value
    });
  };

  const onChangeInt = (e) => { _onChange(e, parseInt); };
  const onChangeFloat = (e) => { _onChange(e, parseFloat); };
  const onChangeString = (e) => { _onChange(e); };

  const onDelete = (e) => {
    onLayerRemove(layer.id);
    e.preventDefault();
  };

  return (
    <div className="layer">
      <p>Layer [{ JSON.stringify(layer) }]</p>
      <button onClick={onDelete}>x</button>
      <input
        type="color"
        name="color"
        defaultValue={layer.color}
        onChange={onChangeString}
      />
      <input
        type="range"
        max="32767"
        name="noiseSeed"
        defaultValue={layer.noiseSeed}
        onChange={onChangeInt}
      />
      <input
        type="range"
        max="255"
        name="alpha"
        defaultValue={layer.alpha}
        onChange={onChangeInt}
      />
      <input
        type="range"
        max="1"
        step="0.01"
        name="thresholdMin"
        defaultValue={layer.thresholdMin}
        onChange={onChangeFloat}
      />
      <input
        type="range"
        max="1"
        step="0.01"
        name="thresholdMax"
        defaultValue={layer.thresholdMax}
        onChange={onChangeFloat}
      />
      <input
        type="range"
        max="1000"
        name="frequency"
        defaultValue={layer.frequency}
        onChange={onChangeFloat}
      />
      <input
        type="range"
        max="2"
        step="0.01"
        name="amplitude"
        defaultValue={layer.amplitude}
        onChange={onChangeFloat}
      />
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
    amplitude: number.isRequired,
  }).isRequired,
  onLayerUpdate: func.isRequired,
  onLayerRemove: func.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default Layer;
