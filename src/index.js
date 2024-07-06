// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './Home';
import AddProducer from './AddProducer';
import AddDistributor from './AddDistributor';
import AddRetailor from './AddRetailor';
import AddTobacco from './AddTobacco';
import DistributeProduct from './DistributeProduct';
import SellProduct from './SellProduct';
import './index.css';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="add-producer" element={<AddProducer />} />
          <Route path="add-distributor" element={<AddDistributor />} />
          <Route path="add-retailor" element={<AddRetailor />} />
          <Route path="add-tobacco" element={<AddTobacco />} />
          <Route path="distribute-product" element={<DistributeProduct />} />
          <Route path="sell-product" element={<SellProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
