// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Tobacco Supply Chain Management System</h1>
      <nav>
        <ul>
          <li><Link to="/add-producer">Add Producer</Link></li>
          <li><Link to="/add-distributor">Add Distributor</Link></li>
          <li><Link to="/add-retailor">Add Retailor</Link></li>
          <li><Link to="/add-tobacco">Add Tobacco</Link></li>
          <li><Link to="/distribute-product">Distribute Product</Link></li>
          <li><Link to="/sell-product">Sell Product</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
