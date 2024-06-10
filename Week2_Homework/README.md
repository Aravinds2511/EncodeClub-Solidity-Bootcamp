# EncodeClub Solidity Bootcamp - Week 2 Homework

## Weekend Project
This is a group activity for at least 3 students:
-   Develop and run scripts for `Ballot.sol` within your group to give voting rights, casting votes, delegating votes and querying results
-   Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
-   Submit your weekend project by filling the form provided in Discord
-   Submit your code in a github repository in the form
Assignment Link: https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-08?tab=readme-ov-file#weekend-project

# Group 7 
Team Members:  <br> 
cax8Mr - [addi1402](https://github.com/addi1402) <br>
1Lbxcy - [Aravinds2511](https://github.com/Aravinds2511) <br>
Pmo958 - [vermasrijan](https://github.com/vermasrijan) <br>
IG8lqp - [aashisham](https://github.com/aashisham) <br>
VEVWKu - @Chae-Ryeong(Chloe) Yeo 



## Contract Deployment and Interaction on Sepolia Testnet (Report by Aravind ([aravinds2511](https://github.com/Aravinds2511) - 1Lbxcy )

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

result: The winning proposal is:  arg2 <br> <br>


## Report by Ashish ([aashisham](https://github.com/aashisham) - IG8lqp)


1.  **Contract creation - Deployed the contract on the sepolia testnet.** <br>
Contract address: [0x3536773d2c3e652a6015f60964dec3fb7cf218b4](https://sepolia.etherscan.io/address/0x3536773d2c3e652a6015f60964dec3fb7cf218b4)

    Last block number: `6077938n` <br>
    Deployer address: `0x36956b321bdd1c78C340c9241d5F870937730208` <br>
    Deployer balance: 0.061346402631284169 ETH <br>
    Deploying Ballot contract.... <br>
    Transaction hash: `0xb33335052ecd74092e02e7235aead1c518d41bc4398c3e9556f90f4c8049626d` <br>
    Ballot contract deployed to: `0x3536773d2c3e652a6015f60964dec3fb7cf218b4` <br>


2.  **Tried to invoke `giveRightToVote` function to give right to address `0x81Afe9cA68acfa0Bf22d46B1EAfC738DE8ECD198` and it was confirmed with success.** <br>

    Address to give `rightToVote`: <br>
    The address: `0x81Afe9cA68acfa0Bf22d46B1EAfC738DE8ECD198` <br>
    Transaction hash: `0xcb2294ddfe1c8739ed2836356651599c4deceb5ef128b69f3193a259ccb6006f` <br>

3.  **Tried to invoke `delegateVote` function to delegate vote (of `0x81Afe9cA68acfa0Bf22d46B1EAfC738DE8ECD198` ) to address `0x36956b321bdd1c78C340c9241d5F870937730208` and it was confirmed with success** <br>

    Address to `delegateVote`: <br>
    The address: `0x36956b321bdd1c78C340c9241d5F870937730208` <br>
    Transaction hash: `0x0dc34eb9dac7ccc09fa01843a60ca94e1878e774d9e3d1744ef6f8ecedb22d34` <br>


4.  **Tried to invoke `castVote` function to vote for the second proposal(argument: 1) and it was confirmed with success** <br>

    Proposal selected: <br>
    Voting to proposal arg2 <br>
    Transaction hash: `0x3be2a772caa9317affd9d9defae2af6d572d59ad6b794ed8c0dc044873a2d7ee` <br>


5.  **Tried to invoke `castVote` function to vote for the third proposal(argument: 2) with same address and it failed with error message “*Already voted*”** <br>

    return new TransactionExecutionError(cause, {
    TransactionExecutionError: Execution reverted with reason: Already voted..
    }
   <br>
  
6.  **Tried to invoke the `winnerName` function to query the winner and it was confirmed.** <br>

    result: The winning proposal is: arg2

