/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, NavLink, Route, Link } from 'react-router-dom';

import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import FontIcon from 'react-md/lib/FontIcons';
import ListItem from 'react-md/lib/Lists/ListItem';
import Toolbar from 'react-md/lib/Toolbars';

import HomePage from './HomePage';
import EditorPage from '../containers/EditorPage';
import AboutPage from './AboutPage';
import NotFoundPage from './NotFoundPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {


  /////////////////////////////////////
  //
  // RENDER

  render() {
    const activeStyle = { color: 'blue' };

    const navItems = [
      { label: 'Home',    to: '/',        leftIcon: <FontIcon>home</FontIcon> },
      { label: 'Editor',  to: '/editor',  leftIcon: <FontIcon>eject</FontIcon> },
      { label: 'About',   to: '/about',   leftIcon: <FontIcon>eject</FontIcon> }
    ];

    return (
      <div className="container">
        <NavigationDrawer
          drawerTitle="Spotify"
          navItems={navItems}
          toolbarTitle={'Home'}
          // toolbarChildren={toolbarChildren}
          desktopDrawerType={NavigationDrawer.DrawerType.FULL_HEIGHT}
        >
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/editor" component={EditorPage} />
              <Route path="/about" component={AboutPage} />
              <Route component={NotFoundPage} />
            </Switch>
        </NavigationDrawer>
      </div>
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
