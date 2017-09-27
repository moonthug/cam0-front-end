import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/galleryActions';

export const GalleryPage = () => {


  /////////////////////////////////////
  //
  // RENDER

  return (
    <div>
    <h1>Gallery</h1>
    </div>
  );
};

/////////////////////////////////////
//
// PROP VALIDATION

GalleryPage.propTypes = {
  actions: PropTypes.object.isRequired,
  gallery: PropTypes.object.isRequired
};


/////////////////////////////////////
//
// REDUX

function mapStateToProps(state) {
  return {
    gallery: state.gallery
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GalleryPage);
