# EncodeClub Solidity Bootcamp - Week 2 Homework

## Contract Deployment and Interaction on Sepolia Testnet

### 1) Contract creation - Deployed the contract on the sepolia testnet.

```sh
npx ts-node --files ./scripts/DeployWithViem.ts "arg1" "arg2" "arg3"
```

Last block number: 6056804n
Deployer address: 0x2d303fEDa3042363BC52e486F974601856DF30d9
Deployer balance: 4.432348516018493049 ETH

Deploying Ballot Contract
Transaction hash: 0x9d56f09886aa57854a317fea8dcf68c8960da589cd4cea3dee3fd07204171c94
Waiting for confirmations...
Ballot contract deployed to: 0xb553c4df4009a867216b45d6c5199010a7226bca

sepolia-etherscan contract link: [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0xb553C4DF4009a867216b45d6c5199010a7226bca)



### 2) Tried to invoke giveRightToVote function to give right to address 0x48859b652d18afFA7Dbff03414DBD2FD4050d5Ec and it was confirmed with success.

```sh
npx ts-node --files ./scripts/VotingRight.ts 0xb553C4DF4009a867216b45d6c5199010a7226bca 0x48859b652d18afFA7Dbff03414DBD2FD4050d5Ec
```

Address to give rightToVote:<br>
The address:  0x48859b652d18afFA7Dbff03414DBD2FD4050d5Ec<br>
Confirm? (Y/n)<br>
y<br>
Transaction hash: 0xda134dbbf98da5af23933113d1ec3b90653724317a4337c97add29e244c326b6<br>
Waiting for confirmations...<br>
Transaction confirmed<br>




### 3) Tried to invoke delegate function to delegate vote (of 0x48859b652d18afFA7Dbff03414DBD2FD4050d5Ec) to address 0x2d303fEDa3042363BC52e486F974601856DF30d9 and it was confirmed with success

```sh
npx ts-node --files ./scripts/DelegateVotes.ts 0xb553C4DF4009a867216b45d6c5199010a7226bca 0x2d303fEDa3042363BC52e486F974601856DF30d9
```

Address to delegateVote:<br>
The address:  0x2d303fEDa3042363BC52e486F974601856DF30d9<br>
Confirm? (Y/n)<br>
y<br>
Transaction hash: 0x6816aa6a410b904014300768ad72116b9b117cec9bee1ec4284eaa39f6134206<br>
Waiting for confirmations...<br>
Transaction confirmed<br>




### 4) Tried to invoke vote function to vote for the second proposal(argument: 1) and it was confirmed with success.

```sh
npx ts-node --files ./scripts/CastVote.ts 0xb553C4DF4009a867216b45d6c5199010a7226bca 1
```

Proposal selected:<br> 
Voting to proposal arg2<br>
Confirm? (Y/n)<br>
y<br>
Transaction hash: 0x246cfdb9e10705c22c2748841d9725b3078ab64d1557e052261cc44e53a38d5c<br>
Waiting for confirmations...<br>
Transaction confirmed<br>




### 5) Tried to invoke winnerName function to query the winner and it was confirmed.

```sh
npx ts-node --files ./scripts/QueryResults.ts 0xb553C4DF4009a867216b45d6c5199010a7226bca
```

result: The winning proposal is:  arg2
