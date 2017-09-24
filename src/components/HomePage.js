import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home md-grid">
      <div className="md-cell--middl md-cell--6">
        <h1>Home</h1>
        <h2><Link to="/editor">editor</Link></h2>
      </div>
    </div>
  );
};

export default HomePage;
