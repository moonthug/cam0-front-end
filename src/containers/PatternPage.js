import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/patternActions';

import Editor from '../components/editor';

export const PatternPage = props => {
  /////////////////////////////////////
  //
  // RENDER

  return (
    <div>
      <Editor
        updateSetting={props.actions.updateSetting}
        reSeedLayers={props.actions.reSeedLayers}
        createLayer={props.actions.createLayer}
        updateLayer={props.actions.updateLayer}
        duplicateLayer={props.actions.duplicateLayer}
        deleteLayer={props.actions.deleteLayer}
        pattern={props.pattern}
      />
    </div>
  );
};

/////////////////////////////////////
//
// PROP VALIDATION

PatternPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PatternPage);
