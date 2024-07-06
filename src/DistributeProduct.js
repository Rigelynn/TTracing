// src/DistributeProduct.js
import React, { useState, useEffect } from 'react';
import { web3, contract } from './web3'; // 确保导入的实例名称一致

const DistributeProduct = () => {
  const [tobaccoID, setTobaccoID] = useState('');
  const [retailorID, setRetailorID] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setUserAddress(accounts[0]);
    };

    getAccounts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const receipt = await contract.methods.distributeProduct(tobaccoID, retailorID).send({ from: userAddress });

      console.log('Transaction receipt: ', receipt);
      alert('Product distributed successfully!');
    } catch (error) {
      console.error('Transaction error: ', error);
      alert(`Failed to distribute product: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Distribute Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={tobaccoID}
          onChange={(e) => setTobaccoID(e.target.value)}
          placeholder="Tobacco ID"
          required
        />
        <input
          type="number"
          value={retailorID}
          onChange={(e) => setRetailorID(e.target.value)}
          placeholder="Retailor ID"
          required
        />
        <button type="submit">Distribute Product</button>
      </form>
    </div>
  );
};

export default DistributeProduct;
