import React from 'react';
import PropTypes from 'prop-types';

import { Accordion, Icon } from 'semantic-ui-react';

import Layer from './Layer';

class LayerList extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);

    this.state = {
      activeIndex: 0
    };

    this.onLayerUpdate = this.onLayerUpdate.bind(this);
    this.onLayerDuplicate = this.onLayerDuplicate.bind(this);
    this.onLayerRemove = this.onLayerRemove.bind(this);
    this.onAccordionTitleClick = this.onAccordionTitleClick.bind(this);
  }

  /////////////////////////////////////
  //
  // EVENT HANDLERS

  onLayerUpdate(update) {
    this.props.onUpdateLayer(update);
  }

  onLayerDuplicate(layerId) {
    this.props.onDuplicateLayer(layerId);
  }

  onLayerRemove(layerId) {
    this.props.ontDeleteLayer(layerId);
  }

  onAccordionTitleClick(e, titleProps) {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    const { activeIndex } = this.state;
    const { layers } = this.props;

    const renderLayer = layer => {
      return (
        <Layer
          layer={layer}
          onLayerUpdate={this.onLayerUpdate}
          onLayerDuplicate={this.onLayerDuplicate}
          onLayerRemove={this.onLayerRemove}
          key={layer.id}
        />
      );
    };

    const renderLayerElements = () => {
      return layers.map((layer, i) => {
        return (
          <div key={i}>
            <Accordion.Title
              active={activeIndex === i}
              index={i}
              onClick={this.onAccordionTitleClick}
            >
              <Icon name="theme" style={{ color: layer.color }} /> Layer {i}
            </Accordion.Title>
            <Accordion.Content
              active={activeIndex === i}
              content={renderLayer(layer)}
            />
          </div>
        );
      });
    };

    return (
      <Accordion className="layer-list" styled>
        {renderLayerElements()}
      </Accordion>
    );
  }
}

/////////////////////////////////////
//
// PROP VALIDATION

const { array, func } = PropTypes;

LayerList.propTypes = {
  layers: array.isRequired,
  onUpdateLayer: func.isRequired,
  onDuplicateLayer: func.isRequired,
  onDeleteLayer: func.isRequired
};

/////////////////////////////////////
//
// EXPORT

export default LayerList;
