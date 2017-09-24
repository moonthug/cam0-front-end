import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../actions/editorActions';

import Editor from '../components/editor';

export const EditorPage = (props) => {


  /////////////////////////////////////
  //
  // RENDER

  return (
    <div>
      <h1>Editor Page</h1>
      <Editor
        updateSetting={props.actions.updateSetting}
        createLayer={props.actions.createLayer}
        updateLayer={props.actions.updateLayer}
        deleteLayer={props.actions.deleteLayer}
        editor={props.editor}
      />
    </div>
  );
};

/////////////////////////////////////
//
// PROP VALIDATION

EditorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  editor: PropTypes.object.isRequired
};


/////////////////////////////////////
//
// REDUX

function mapStateToProps(state) {
  return {
    editor: state.editor
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
)(EditorPage);
