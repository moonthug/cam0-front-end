import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import '../../styles/component/editor.scss';

class Gallery extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);
  }

  /////////////////////////////////////
  //
  // PUBLIC FUNCTIONS

  // onCreateLayer() {
  //   this.props.createLayer();
  // }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    return (
      <Grid className="editor">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={6} floated="right">
            gallery
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

Gallery.propTypes = {
  patterns: array
};

/////////////////////////////////////
//
// EXPORT

export default Gallery;
