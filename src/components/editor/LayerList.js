import React from 'react';
import PropTypes from 'prop-types';

import Layer from './Layer';

const LayerList = ({ layers, onLayerListUpdateLayer, onLayerListDeleteLayer }) => {

  const onLayerUpdate = (update) => {
    onLayerListUpdateLayer(update);
  };

  const onLayerRemove = (layerId) => {
    onLayerListDeleteLayer(layerId);
  };

  const layerElements = layers.map(layer => {
    return (
      <Layer
        layer={layer}
        onLayerUpdate={onLayerUpdate}
        onLayerRemove={onLayerRemove}
        key={layer.id}
      />
    );
  });

  return (
    <div className="layerlist">
      <h2>Layers</h2>
      { layerElements }
    </div>
  );
};


/////////////////////////////////////
//
// PROP VALIDATION

const { array, func } = PropTypes;

LayerList.propTypes = {
  layers: array.isRequired,
  onLayerListUpdateLayer: func.isRequired,
  onLayerListDeleteLayer: func.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default LayerList;
