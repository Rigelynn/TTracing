// src/AddRetailor.js
import React, { useState, useEffect } from 'react';
import { web3, contract } from './web3'; // 确保导入的实例名称与其他文件一致

const AddRetailor = () => {
  const [retailorName, setRetailorName] = useState('');
  const [retailorAddress, setRetailorAddress] = useState('');
  const [retailorDescription, setRetailorDescription] = useState('');
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
      const receipt = await contract.methods.addRetailor(retailorName, retailorAddress, retailorDescription)
        .send({ from: userAddress, gas: 500000  });

      console.log('Transaction receipt: ', receipt);
      alert('Retailor added successfully!');
    } catch (error) {
      console.error('Transaction error: ', error);
      alert(`Failed to add retailor: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add Retailor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={retailorName}
          onChange={(e) => setRetailorName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={retailorAddress}
          onChange={(e) => setRetailorAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          type="text"
          value={retailorDescription}
          onChange={(e) => setRetailorDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Retailor</button>
      </form>
    </div>
  );
};

export default AddRetailor;
