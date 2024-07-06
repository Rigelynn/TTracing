// src/AddTobacco.js
import React, { useState, useEffect } from 'react';
import { web3, contract } from './web3';

const AddTobacco = () => {
  const [tobaccoName, setTobaccoName] = useState('');
  const [producerID, setProducerID] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          console.error('No accounts found');
          alert('No accounts found. Please check your Ethereum provider.');
        } else {
          setUserAddress(accounts[0]);
        }
      } catch (error) {
        console.error('Error fetching accounts', error);
        alert('Error fetching accounts. See console for details.');
      }
    };

    getAccounts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const gasEstimate = BigInt(await contract.methods.addTobacco(tobaccoName, producerID).estimateGas({ from: userAddress }));
      const gasLimit = gasEstimate + BigInt(10000);

      const receipt = await contract.methods.addTobacco(tobaccoName, producerID).send({
        from: userAddress,
        gas: gasLimit
      });
      console.log('Transaction receipt: ', receipt);
      alert('Tobacco added successfully!');
    } catch (error) {
      console.error('Transaction error: ', error);
      alert(`Failed to add tobacco: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Add Tobacco</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={tobaccoName}
          onChange={(e) => setTobaccoName(e.target.value)}
          placeholder="Tobacco Name"
          required
        />
        <input
          type="text"
          value={producerID}
          onChange={(e) => setProducerID(e.target.value)}
          placeholder="Producer ID"
          required
        />
        <button type="submit">Add Tobacco</button>
      </form>
    </div>
  );
};

export default AddTobacco;