import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Grid } from 'semantic-ui-react';

import * as actions from '../actions/patternActions';

import Editor from './Editor';
import View from '../components/View';

export const PatternPage = props => {
  /////////////////////////////////////
  //
  // RENDER
  const timeout = { enter: 100, exit: 200 };
  const currentKey = location.pathname.split('/')[1] || '/';

  return (
    <Grid className="action-container">
      <Grid.Row>
        <Grid.Column mobile={16} tablet={6} computer={6} floated="right">
          <TransitionGroup component="main" className="page-main">
            <CSSTransition
              key={currentKey}
              timeout={timeout}
              classNames="fade"
              appear
            >
              <Switch>
                <Route path="/edit/:id" component={Editor} />
                <Route path="/edit" component={Editor} />
                <Route path="/view" component={View} />
                <Route path="/:patternId" component={View} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
