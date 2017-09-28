import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import Canvas from './Canvas';
import Settings from './Settings';
import LayerList from './LayerList';

import '../../styles/component/editor.scss';

class Editor extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);

    this.onSettingsUpdateSetting = this.onSettingsUpdateSetting.bind(this);
    this.onSettingsCreateLayer = this.onSettingsCreateLayer.bind(this);
    this.onLayerListUpdateLayer = this.onLayerListUpdateLayer.bind(this);
    this.onLayerListDuplicateLayer = this.onLayerListDuplicateLayer.bind(this);
    this.onLayerListDeleteLayer = this.onLayerListDeleteLayer.bind(this);
  }

  /////////////////////////////////////
  //
  // PUBLIC FUNCTIONS

  onSettingsCreateLayer() {
    this.props.createLayer();
  }

  onSettingsUpdateSetting(update) {
    this.props.updateSetting(update);
  }

  onLayerListUpdateLayer(update) {
    this.props.updateLayer(update);
  }

  onLayerListDuplicateLayer(layerId) {
    this.props.duplicateLayer(layerId);
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
      <Grid className="editor">
        <Grid.Row>
          <Grid.Column width="4" floated="right">
            <Settings
              settings={editor.settings}
              onSettingsUpdateSetting={this.onSettingsUpdateSetting}
              onSettingsCreateLayer={this.onSettingsCreateLayer}
            />

            <LayerList
              layers={editor.layers}
              onLayerListUpdateLayer={this.onLayerListUpdateLayer}
              onLayerListDuplicateLayer={this.onLayerListDuplicateLayer}
              onLayerListDeleteLayer={this.onLayerListDeleteLayer}
            />
          </Grid.Column>

          <Canvas settings={editor.settings} layers={editor.layers} />
        </Grid.Row>
      </Grid>
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
  duplicateLayer: func.isRequired,
  deleteLayer: func.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default Editor;
