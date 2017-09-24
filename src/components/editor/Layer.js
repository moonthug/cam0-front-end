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
  const onChangeString = (e) => { _onChange(e); };

  const onDelete = (e) => {
    onLayerRemove(layer.id);
    e.preventDefault();
  };

  return (
    <div className="layer">
      <p>Layer [{ layer.id }] - {layer.value}</p>
      <button onClick={onDelete}>x</button>
      <input
        type="color"
        name="color"
        defaultValue={layer.color}
        onChange={onChangeString}
      />
      <input
        type="range"
        max="255"
        name="tolerance"
        defaultValue={layer.tolerance}
        onChange={onChangeInt}
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
    color: string.isRequired,
    tolerance: number.isRequired
  }).isRequired,
  onLayerUpdate: func.isRequired,
  onLayerRemove: func.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default Layer;
