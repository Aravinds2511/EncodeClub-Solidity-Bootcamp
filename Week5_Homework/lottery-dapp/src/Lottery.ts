import { ethers } from 'ethers';
import { ExternalProvider } from "@ethersproject/providers";
import {abi} from '../../artifacts/contracts/Lottery.sol/Lottery.json'; 

declare global {
    interface Window {
      ethereum?: ExternalProvider;
    }
  }

let provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
let signer: ethers.providers.JsonRpcSigner | undefined;
let lotteryContract: ethers.Contract;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
} else {
  provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
}

const contractAddress = '0xcaa46de1e4400406460b14e63a8ad784f9fc09fd';
lotteryContract = new ethers.Contract(contractAddress, abi, signer || provider);

export {
  provider,
  signer,
  lotteryContract,
  abi,
};
