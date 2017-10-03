import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dimmer, Loader, Grid } from 'semantic-ui-react';

import * as actions from '../actions/galleryActions';

class GalleryPage extends React.Component {
  /////////////////////////////////////
  //
  // CONSTRUCTOR

  constructor(props, context) {
    super(props, context);

    this.onClickGallery = this.onClickGallery.bind(this);
  }

  /////////////////////////////////////
  //
  // LIFECYCLE

  componentDidMount() {
    this.props.actions.loadPatterns();
  }

  /////////////////////////////////////
  //
  // PROPERTIES

  /////////////////////////////////////
  //
  // EVENT HANDLERS

  onClickGallery(e) {
    this.props.actions.selectPattern(e.target.getAttribute('data-pattern-id'));
  }

  /////////////////////////////////////
  //
  // RENDER

  render() {
    let { gallery } = this.props;

    const renderGalleryItems = () => {
      // TODO Move to component
      return gallery.patterns.map((item, i) => {
        return (
          <div key={i}>
            <p>{item.author}</p>
            <button
              onClick={this.onClickGallery}
              data-pattern-id={item.id}
              disabled={!!item.selected}
            >
              Load
            </button>
          </div>
        );
      });
    };

    const renderLoader = () => {
      if (gallery.isLoading === true) {
        return (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        );
      }
    };

    return (
      <Grid className="gallery">
        <Grid.Row>
          <Grid.Column mobile={16} tablet={6} computer={6}>
            {renderGalleryItems()}
            {renderLoader()}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
