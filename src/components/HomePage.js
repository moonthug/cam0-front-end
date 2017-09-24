import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <h2><Link to="/editor">editor</Link></h2>
    </div>
  );
};

export default HomePage;
