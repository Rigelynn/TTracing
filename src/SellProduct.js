// src/SellProduct.js
import React, { useState, useEffect } from 'react';
import { web3, contract } from './web3'; // 确保导入的实例名称一致

const SellProduct = () => {
  const [tobaccoID, setTobaccoID] = useState('');
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
      const receipt = await contract.methods.sellProduct(tobaccoID).send({ from: userAddress });

      console.log('Transaction receipt: ', receipt);
      alert('Product sold successfully!');
    } catch (error) {
      console.error('Transaction error: ', error);
      alert(`Failed to sell product: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Sell Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={tobaccoID}
          onChange={(e) => setTobaccoID(e.target.value)}
          placeholder="Tobacco ID"
          required
        />
        <button type="submit">Sell Product</button>
      </form>
    </div>
  );
};

export default SellProduct;
