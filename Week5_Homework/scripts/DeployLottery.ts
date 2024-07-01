import { createPublicClient, http, createWalletClient, formatEther, parseEther, toHex, hexToString } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi, bytecode } from "../artifacts/contracts/Lottery.sol/Lottery.json";

import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

//parameters
const BET_PRICE = "1";
const BET_FEE = "0.2";
const TOKEN_RATIO = 2n;

async function main() {
    // Public client
    const publicClient = createPublicClient({
      chain: sepolia,
      transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });
    const blockNumber = await publicClient.getBlockNumber();
    console.log("Last block number:", blockNumber);
  
    // Wallet client
    const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
    const deployer = createWalletClient({
      account,
      chain: sepolia,
      transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
    });
    console.log("Deployer address:", account.address);
    const balance = await publicClient.getBalance({ address: account.address });
    console.log("Deployer balance:", formatEther(balance), "ETH");
  
    // Deploy contract
    console.log("\nDeploying Lottery Contract");
    const hash = await deployer.deployContract({
      abi,
      bytecode: bytecode as `0x${string}`,
      args: ["LotteryToken", "LT", TOKEN_RATIO, parseEther(BET_PRICE), parseEther(BET_FEE),],
    });
    console.log("Transaction hash:", hash);
    console.log("Waiting for confirmations...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    console.log("Lottery contract deployed to:", receipt.contractAddress);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

//0xcaa46de1e4400406460b14e63a8ad784f9fc09fd