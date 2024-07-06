// client/src/AddProducer.js
import React, { useState, useEffect } from 'react';
import { web3, contract } from './web3';

const AddProducer = () => {
  const [producerName, setProducerName] = useState('');
  const [producerAddress, setProducerAddress] = useState('');
  const [producerDescription, setProducerDescription] = useState('');
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
        const receipt = await contract.methods.addProducer(producerName, producerAddress, producerDescription)
          .send({ from: userAddress, gas: 500000 });

        console.log('Transaction receipt: ', receipt);
        alert('Producer added successfully!');
      } else {
        console.error('Contract instance not initialized');
        alert('Contract instance not initialized');
      }
    } catch (error) {
      console.error('Transaction error: ', error);
      alert('Failed to add producer');
    }
  };

  return (
    <div>
      <h2>Add Producer</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={producerName}
          onChange={(e) => setProducerName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={producerAddress}
          onChange={(e) => setProducerAddress(e.target.value)}
          placeholder="Address"
          required
        />
        <input
          type="text"
          value={producerDescription}
          onChange={(e) => setProducerDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button type="submit">Add Producer</button>
      </form>
    </div>
  );
};

export default AddProducer;
