import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/editor.css';

import Canvas from './Canvas';
import LayerList from './LayerList';

class Editor extends React.Component {


  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);

    this.createLayer = this.createLayer.bind(this);
    this.onLayerListUpdateLayer = this.onLayerListUpdateLayer.bind(this);
    this.onLayerListDeleteLayer = this.onLayerListDeleteLayer.bind(this);
  }


  /////////////////////////////////////
  //
  // PUBLIC FUNCTIONS

  createLayer() {
    this.props.createLayer();
  }

  onLayerListUpdateLayer(layer) {
    this.props.updateLayer(layer);
  }

  onLayerListDeleteLayer(layerId) {
    this.props.deleteLayer(layerId);
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    const { editor } = this.props;

    return (
      <div>
        <h2>Editor</h2>
        <LayerList
          layers={editor.layers}
          onLayerListUpdateLayer={this.onLayerListUpdateLayer}
          onLayerListDeleteLayer={this.onLayerListDeleteLayer}
        />
        <Canvas
          layers={editor.layers}
        />

        <button onClick={this.createLayer}>Add Layer</button>
      </div>
    );
  }
}

/////////////////////////////////////
//
// PROP VALIDATION

const { array, func, shape } = PropTypes;

Editor.propTypes = {
  editor: shape({
    layers: array.isRequired
  }).isRequired,
  createLayer: func.isRequired,
  updateLayer: func.isRequired,
  deleteLayer: func.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default Editor;
