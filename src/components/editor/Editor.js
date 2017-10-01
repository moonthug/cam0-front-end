import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, Grid, Icon } from 'semantic-ui-react';

import Canvas from '../../containers/Canvas';
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
    this.onReSeedLayers = this.onReSeedLayers.bind(this);
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

  onReSeedLayers() {
    this.props.reSeedLayers();
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    const { pattern } = this.props;

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
                  settings={pattern.settings}
                  onReSeedLayers={this.onReSeedLayers}
                  onUpdateSetting={this.onUpdateSetting}
                  onCreateLayer={this.onCreateLayer}
                />
              </Accordion.Content>
            </Accordion>

            <LayerList
              layers={pattern.layers}
              onLayerListUpdateLayer={this.onUpdateLayer}
              onLayerListDuplicateLayer={this.onDuplicateLayer}
              onLayerListDeleteLayer={this.onDeleteLayer}
            />
          </Grid.Column>
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
  pattern: shape({
    layers: array.isRequired
  }).isRequired,
  updateSetting: func.isRequired,
  reSeedLayers: func.isRequired,
  createLayer: func.isRequired,
  updateLayer: func.isRequired,
  duplicateLayer: func.isRequired,
  deleteLayer: func.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default Editor;
