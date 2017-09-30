import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, Grid, Icon } from 'semantic-ui-react';

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

    this.onUpdateSetting = this.onUpdateSetting.bind(this);
    this.onCreateLayer = this.onCreateLayer.bind(this);
    this.onUpdateLayer = this.onUpdateLayer.bind(this);
    this.onDuplicateLayer = this.onDuplicateLayer.bind(this);
    this.onDeleteLayer = this.onDeleteLayer.bind(this);
    this.onResetDrawForLayers = this.onResetDrawForLayers.bind(this);
  }

  /////////////////////////////////////
  //
  // PUBLIC FUNCTIONS

  onCreateLayer() {
    this.props.createLayer();
  }

  onUpdateSetting(update) {
    this.props.updateSetting(update);
  }

  onUpdateLayer(update) {
    this.props.updateLayer(update);
  }

  onDuplicateLayer(layerId) {
    this.props.duplicateLayer(layerId);
  }

  onDeleteLayer(layerId) {
    this.props.deleteLayer(layerId);
  }

  onResetDrawForLayers() {
    this.props.resetDrawForLayers();
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    const { editor } = this.props;

    return (
      <Grid className="editor">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={6} floated="right">
            <Accordion styled>
              <Accordion.Title active>
                <Icon name="settings" /> Settings
              </Accordion.Title>
              <Accordion.Content active>
                <Settings
                  settings={editor.settings}
                  onSettingsUpdateSetting={this.onUpdateSetting}
                  onSettingsCreateLayer={this.onCreateLayer}
                />
              </Accordion.Content>
            </Accordion>

            <LayerList
              layers={editor.layers}
              onLayerListUpdateLayer={this.onUpdateLayer}
              onLayerListDuplicateLayer={this.onDuplicateLayer}
              onLayerListDeleteLayer={this.onDeleteLayer}
            />
          </Grid.Column>

          <Canvas
            settings={editor.settings}
            layers={editor.layers}
            onResetDrawForLayers={this.onResetDrawForLayers}
          />
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
  resetDrawForLayers: func.isRequired,
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
