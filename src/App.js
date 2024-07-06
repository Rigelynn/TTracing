// src/App.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <header>
        <h1>Tobacco Supply Chain Management</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add-producer">Add Producer</Link></li>
            <li><Link to="/add-distributor">Add Distributor</Link></li>
            <li><Link to="/add-retailor">Add Retailor</Link></li>
            <li><Link to="/add-tobacco">Add Tobacco</Link></li>
            <li><Link to="/distribute-product">Distribute Product</Link></li>
            <li><Link to="/sell-product">Sell Product</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
