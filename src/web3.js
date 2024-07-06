// client/src/web3.js
import Web3 from 'web3';
import abi from './artifacts/TobaccoSupplyChain.json'; // 导入 ABI

const LOCAL_NETWORK_URL = 'http://127.0.0.1:7545'; // Ganache 本地网络地址
const CONTRACT_ADDRESS = '0x92842baF4AC24e1327F2EB0ED4baFe4271629C08'; // 最新部署的合约地址

const web3 = new Web3(new Web3.providers.HttpProvider(LOCAL_NETWORK_URL));
const contract = new web3.eth.Contract(abi.abi, CONTRACT_ADDRESS);

export { web3, contract };
