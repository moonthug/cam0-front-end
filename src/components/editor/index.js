import React from 'react';
import PropTypes from 'prop-types';

import Canvas from './Canvas';
import Settings from './Settings';
import LayerList from './LayerList';

class Editor extends React.Component {


  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);

    this.createLayer = this.createLayer.bind(this);
    this.onSettingsUpdateSetting = this.onSettingsUpdateSetting.bind(this);
    this.onLayerListUpdateLayer = this.onLayerListUpdateLayer.bind(this);
    this.onLayerListDeleteLayer = this.onLayerListDeleteLayer.bind(this);
  }


  /////////////////////////////////////
  //
  // PUBLIC FUNCTIONS

  createLayer() {
    this.props.createLayer();
  }

  onSettingsUpdateSetting(update) {
    this.props.updateSetting(update);
  }

  onLayerListUpdateLayer(update) {
    this.props.updateLayer(update);
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
        <div className="panel">
          <Settings
            settings={editor.settings}
            onSettingsUpdateSetting={this.onSettingsUpdateSetting}
          />
          <LayerList
            layers={editor.layers}
            onLayerListUpdateLayer={this.onLayerListUpdateLayer}
            onLayerListDeleteLayer={this.onLayerListDeleteLayer}
          />
          <button onClick={this.createLayer}>Add Layer</button>
        </div>

        <Canvas
          settings={editor.settings}
          layers={editor.layers}
        />

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
  updateSetting: func.isRequired,
  createLayer: func.isRequired,
  updateLayer: func.isRequired,
  deleteLayer: func.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default Editor;
