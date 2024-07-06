// src/AddDistributor.js
import React, { useState, useEffect } from 'react';
import { web3, contract } from './web3';

const AddDistributor = () => {
  const [distributorName, setDistributorName] = useState('');
  const [distributorAddress, setDistributorAddress] = useState('');
  const [distributorDescription, setDistributorDescription] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    if (web3) {
      web3.eth.getAccounts()
        .then(accounts => {
          if (accounts.length === 0) {
            console.error('No accounts found');
            alert('No accounts found. Please check your Ethereum provider.');
          } else {
            setUserAddress(accounts[0]);
          }
        })
        .catch(error => {
          console.error('Error fetching accounts', error);
        });
    } else {
      console.error('web3 is not initialized');
      alert('web3 is not initialized. Please check your web3 provider.');
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (contract) {
        const receipt = await contract.methods.addDistributor(distributorName, distributorAddress, distributorDescription)
          .send({ from: userAddress,gas:500000 });

        console.log('Transaction receipt: ', receipt);
        alert('Distributor added successfully!');
      } else {
        console.error('Contract instance not initialized');
        alert('Contract instance not initialized');
      }
    } catch (error) {
      console.error('Transaction error: ', error);
      alert('Failed to add distributor');
    }
  };

  return (
    <div>
      <h2>Add Distributor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={distributorName}
          onChange={(e) => setDistributorName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={distributorAddress}
          onChange={(e) => setDistributorAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          type="text"
          value={distributorDescription}
          onChange={(e) => setDistributorDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Distributor</button>
      </form>
    </div>
  );
};

export default AddDistributor;
