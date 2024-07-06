// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TobaccoSupplyChain {
    struct Tobacco {
        uint tobaccoID;
        string tobaccoName;
        address owner;
        string state;
        uint timestamp;
    }

    struct Producer {
        uint producerID;
        string producerName;
        address producerAddress;
        string producerDescription;
    }

    struct Distributor {
        uint distributorID;
        string distributorName;
        address distributorAddress;
        string distributorDescription;
    }

    struct Retailor {
        uint retailorID;
        string retailorName;
        address retailorAddress;
        string retailorDescription;
    }

    mapping(uint => Producer) public producers;
    mapping(uint => Distributor) public distributors;
    mapping(uint => Retailor) public retailors;
    mapping(uint => Tobacco) public tobaccos;

    uint public producerCount = 0;
    uint public distributorCount = 0;
    uint public retailorCount = 0;
    uint public tobaccoCount = 0;

    event ProducerAdded(uint producerID, string producerName, address producerAddress);
    event DistributorAdded(uint distributorID, string distributorName, address distributorAddress);
    event RetailorAdded(uint retailorID, string retailorName, address retailorAddress);
    event TobaccoAdded(uint tobaccoID, string tobaccoName, uint producerID, uint timestamp);
    event TobaccoDistributed(uint tobaccoID, uint retailorID, uint timestamp);
    event TobaccoSold(uint tobaccoID, uint timestamp);

    function addProducer(string memory _producerName, address _producerAddress, string memory _producerDescription) public {
        producerCount++;
        producers[producerCount] = Producer(producerCount, _producerName, _producerAddress, _producerDescription);
        emit ProducerAdded(producerCount, _producerName, _producerAddress);
    }

    function addDistributor(string memory _distributorName, address _distributorAddress, string memory _distributorDescription) public {
        distributorCount++;
        distributors[distributorCount] = Distributor(distributorCount, _distributorName, _distributorAddress, _distributorDescription);
        emit DistributorAdded(distributorCount, _distributorName, _distributorAddress);
    }

    function addRetailor(string memory _retailorName, address _retailorAddress, string memory _retailorDescription) public {
        retailorCount++;
        retailors[retailorCount] = Retailor(retailorCount, _retailorName, _retailorAddress, _retailorDescription);
        emit RetailorAdded(retailorCount, _retailorName, _retailorAddress);
    }

    function addTobacco(string memory _tobaccoName, uint _producerID) public {
        require(producers[_producerID].producerAddress != address(0), "Producer does not exist");
        tobaccoCount++;
        tobaccos[tobaccoCount] = Tobacco(tobaccoCount, _tobaccoName, producers[_producerID].producerAddress, "produced", block.timestamp);
        emit TobaccoAdded(tobaccoCount, _tobaccoName, _producerID, block.timestamp);
    }

    function distributeProduct(uint _tobaccoID, uint _retailorID) public {
        require(retailors[_retailorID].retailorAddress != address(0), "Retailor does not exist");
        Tobacco storage tobacco = tobaccos[_tobaccoID];
        require(tobacco.owner != address(0), "Tobacco does not exist");
        tobacco.owner = retailors[_retailorID].retailorAddress;
        tobacco.state = "distributed";
        tobacco.timestamp = block.timestamp;
        emit TobaccoDistributed(_tobaccoID, _retailorID, block.timestamp);
    }

    function sellProduct(uint _tobaccoID) public {
        Tobacco storage tobacco = tobaccos[_tobaccoID];
        require(tobacco.owner != address(0), "Tobacco does not exist");
        require(keccak256(abi.encodePacked((tobacco.state))) == keccak256(abi.encodePacked(("distributed"))), "Tobacco not distributed");
        tobacco.state = "sold";
        tobacco.timestamp = block.timestamp;
        emit TobaccoSold(_tobaccoID, block.timestamp);
    }
}
