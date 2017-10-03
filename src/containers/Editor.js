import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Accordion, Icon } from 'semantic-ui-react';

import Settings from '../components/editor/Settings';
import LayerList from '../components/editor/LayerList';

import * as actions from '../actions/patternActions';

import '../styles/component/editor.scss';

class Editor extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);
  }

  /////////////////////////////////////
  //
  // PUBLIC FUNCTIONS

  /////////////////////////////////////
  //
  // RENDER

  render() {
    const { pattern, actions } = this.props;

    return (
      <div>
        <Accordion styled>
          <Accordion.Title active>
            <Icon name="settings" /> Settings
          </Accordion.Title>
          <Accordion.Content active>
            <Settings
              settings={pattern.settings}
              onReSeedLayers={actions.reSeedLayers}
              onUpdateSetting={actions.updateSetting}
              onCreateLayer={actions.createLayer}
            />
          </Accordion.Content>
        </Accordion>

        <LayerList
          layers={pattern.layers}
          onUpdateLayer={actions.updateLayer}
          onDuplicateLayer={actions.duplicateLayer}
          onDeleteLayer={actions.deleteLayer}
        />
      </div>
    );
  }
}

/////////////////////////////////////
//
// PROP VALIDATION

Editor.propTypes = {
  actions: PropTypes.object.isRequired,
  pattern: PropTypes.object.isRequired
};

/////////////////////////////////////
//
// REDUX

function mapStateToProps(state) {
  return {
    pattern: state.pattern
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

/////////////////////////////////////
//
// EXPORT

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
