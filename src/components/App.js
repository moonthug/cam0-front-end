/* eslint-disable import/no-named-as-default */
import React from 'react';
// import { AnimatedSwitch } from 'react-router-transition';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Icon, Menu } from 'semantic-ui-react';

import HomePage from './HomePage';
import EditorPage from '../containers/PatternPage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';

import Canvas from '../containers/Canvas';

import '../styles/component/app.scss';
import PatternsPage from '../containers/PatternsPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  /////////////////////////////////////
  //
  // RENDER

  render() {
    const activeStyle = { color: 'grey' };

    return (
      <main>
        <Helmet>
          <meta charSet="utf-8" />
          <title>cam0</title>
          <link rel="canonical" href="http://cam0.org" />
        </Helmet>

        <Menu>
          <Menu.Item>
            <NavLink to="/" activeStyle={activeStyle}>
              <img width="32px" src="images/logo.png" />
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/pattern/new" activeStyle={activeStyle}>
              <Icon name="edit" /> Create Pattern
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/pattern" activeStyle={activeStyle}>
              <Icon name="paint brush" /> Gallery
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/about" activeStyle={activeStyle}>
              <Icon name="question" /> About
            </NavLink>
          </Menu.Item>
        </Menu>

        <div className="main container">
          <Canvas />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/pattern/new" component={EditorPage} />
            <Route path="/pattern/1/edit" component={EditorPage} />
            <Route exact path="/pattern" component={PatternsPage} />
            {/*<Route path="/pattern/1" component={ListPatternsPage} />*/}
            <Route path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </main>
    );
  }
}

/////////////////////////////////////
//
// PROP VALIDATION

App.propTypes = {
  children: PropTypes.element
};

/////////////////////////////////////
//
// EXPORT

export default App;
