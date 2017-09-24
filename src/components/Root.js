import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import App from './App';

class Root extends Component {


  /////////////////////////////////////
  //
  // RENDER

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}


/////////////////////////////////////
//
// PROP VALIDATION

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};


/////////////////////////////////////
//
// EXPORT

export default Root;
