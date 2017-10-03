import React from 'react';
import { Link } from 'react-router-dom';

const View = () => {
  return (
    <div>
      <h1>View</h1>
      <Link to="/edit">Editor</Link>
    </div>
  );
};

export default View;
