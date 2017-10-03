/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Icon, Menu } from 'semantic-ui-react';

import HomePage from './HomePage';
import PatternPage from '../containers/PatternPage';
import GalleryPage from '../containers/GalleryPage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';

import Canvas from '../containers/Canvas';

import '../styles/component/app.scss';

// Must be class for hot reloader
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
            <NavLink to="/edit" activeStyle={activeStyle}>
              <Icon name="edit" /> Create Pattern
            </NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/gallery" activeStyle={activeStyle}>
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
            <Route path="/edit" component={PatternPage} />
            <Route path="/edit/1" component={PatternPage} />
            <Route path="/gallery" component={GalleryPage} />
            {/*<Route exact path="/pattern" component={PatternsPage} />*/}
            {/*<Route path="/pattern/1" component={ListPatternsPage} />*/}
            <Route path="/about" component={AboutPage} />
            <Route path="/c/:patternId" component={PatternPage} />
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
