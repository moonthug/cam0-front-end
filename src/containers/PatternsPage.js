import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/patternsActions';

import Gallery from '../components/gallery';

export const PatternsPage = () => {
  /////////////////////////////////////
  //
  // RENDER

  return <div />;
};

/////////////////////////////////////
//
// PROP VALIDATION

PatternsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  patterns: PropTypes.array.isRequired
};

/////////////////////////////////////
//
// REDUX

function mapStateToProps(state) {
  return {
    patterns: state.patterns
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

export default connect(mapStateToProps, mapDispatchToProps)(PatternsPage);
