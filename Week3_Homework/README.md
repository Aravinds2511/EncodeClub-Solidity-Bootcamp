# EncodeClub Solidity Bootcamp - Week 3 Homework

## Weekend Project

This is a group activity for at least 3 students:

-   Complete the contracts together
-   Develop and run scripts for `TokenizedBallot.sol` within your group to give voting tokens, delegating voting power, casting votes, checking vote power and querying results
-   Write a report with each function execution and the transaction hash, if successful, or the revert reason, if failed
-   Submit your weekend project by filling the form provided in Discord
-   Share your code in a github repo in the submission form <br>
Assignment Link: https://github.com/Encode-Club-Solidity-Bootcamp/Lesson-12?tab=readme-ov-file#weekend-project

# Group 7 
Team Members:  <br> 
cax8Mr - [addi1402](https://github.com/addi1402) <br>
1Lbxcy - [Aravinds2511](https://github.com/Aravinds2511) <br>
Pmo958 - [vermasrijan](https://github.com/vermasrijan) <br>
IG8lqp - [aashisham](https://github.com/aashisham) <br>
VEVWKu - @Chae-Ryeong(Chloe) Yeo  <br>



# Project Report: Tokenized Voting - Contract 1

## Overview

This report outlines the deployment and interaction of the MyToken ERC20 contract and the TokenizedBallot voting system on the Ethereum blockchain. The key stages included deploying the token contract, delegating voting power, transferring tokens, deploying the voting contract, casting votes, and querying results.

## 1. Deploying MyToken Contract

**Command:**

```bash
npx ts-node --files ./scripts/DeployMyERC20.ts 1000
```

**Output:**

- **Last block number:** 6118518
- **Deployer address:** 0x2d303fEDa3042363BC52e486F974601856DF30d9
- **Deployer balance:** 4.331141622857495937 ETH

**Deployment Details:**

- **Transaction hash:** 0xc10026620e8b509a118c6e7b78f1493efb2d40700e6e588e921abf5a4595a9a9
- **Contract address:** 0x6164f2d4a223cd8e473fcd7ad7eaba6879af110f
- **Token Name:** MyToken
- **Token Symbol:** MTK

## 2. Delegating Voting Power

**Command:**

```bash
npx ts-node --files ./scripts/DelegatingVotingPower.ts 0x6164f2d4a223cd8e473fcd7ad7eaba6879af110f 0x2d303fEDa3042363BC52e486F974601856DF30d9
```

**Output:**

- **Address to delegate:** 0x2d303fEDa3042363BC52e486F974601856DF30d9
- **Confirmation:** y
- **Transaction hash:** 0x6e0f72eadebbad336d9845af141227028eac89238d46b12feaff0270e2495b02
- **Status:** Transaction confirmed

## 3. Checking Voting Power

**Command:**

```bash
npx ts-node --files ./scripts/CheckingVotingPower.ts 0x6164f2d4a223cd8e473fcd7ad7eaba6879af110f 0x2d303fEDa3042363BC52e486F974601856DF30d9
```

**Output:**

- **Account:** 0x2d303fEDa3042363BC52e486F974601856DF30d9
- **Voting power:** 1000000000000000000000 units

## 4. Giving Voting Tokens

**Command:**

```bash
npx ts-node --files ./scripts/GiveVotingTokens.ts 0x6164f2d4a223cd8e473fcd7ad7eaba6879af110f 0x48859b652d18afFA7Dbff03414DBD2FD4050d5Ec 10
```

**Output:**

- **Address:** 0x48859b652d18afFA7Dbff03414DBD2FD4050d5Ec
- **Amount:** 10
- **Confirmation:** y
- **Transaction hash:** 0x02722deda22c9efbf73d3f40a94f6254f7981bc3ab6ae3a86bce58b8ed68d2c7
- **Status:** Transaction confirmed

## 5. Deploying TokenizedBallot Contract

**Command:**

```bash
npx ts-node --files ./scripts/DeployTokenisedVote.ts
```

**Output:**

- **Last block number:** 6118819
- **Deployer address:** 0x2d303fEDa3042363BC52e486F974601856DF30d9
- **Deployer balance:** 4.331132354376130651 ETH

**Deployment Details:**

- **Transaction hash:** 0xe23b9c176d175f19bf9bf2a3a27caddeba2ebf19e08d560db2a00f3ca5a6e96f
- **Contract address:** 0x82490d26f8bb201807de1ed176b58b5554a45735

**Proposals:**

- **Proposal 1**
- **Proposal 2**
- **Proposal 3**

## 6. Casting Votes

**Command:**

```bash
npx ts-node --files ./scripts/CastingVotes.ts 0x82490d26f8bb201807de1ed176b58b5554a45735 1 10
```

**Output:**

- **Proposal selected:** Proposal 2
- **Confirmation:** y
- **Transaction hash:** 0x2725b0a9c1142a51d3df5782b3628d963457137ff9d3e074b1227578e5c8bc6a
- **Status:** Transaction confirmed

## 7. Querying Results

**Command:**

```bash
npx ts-node --files ./scripts/QueringResults.ts 0x82490d26f8bb201807de1ed176b58b5554a45735
```

**Output:**

- **Winning proposal:** Proposal 2
- **Block number:** 6118829 

<br> <br>


# Tokenized Voting: Contract Deployment & Interaction Report - Contract 2 <br>

1.  **Token contract deployed on the sepolia testnet with 10,000 initial supply.**
   
	cmd: `npx ts-node --files .\scripts\DeployERC20Token.ts "initialTokenSupply"` <br>

	Last block number: `6126542n`

	Deployer address: `0x36956b321bdd1c78C340c9241d5F870937730208`

	Deploying `MyToken` Contract

	Transaction hash: `0xec52bf6042b562a920dcbe93ff45bf1ef2ac4fe976775c9018841d3fafc71042`

	Waiting for confirmations...

	*`MyToken`* contract deployed to: `0x38111971b44299b1c4a00b00dc90a120aad862d1`

	Token Name: *MyToken*

	Token Symbol: *MTK*

	contract : https://sepolia.etherscan.io/address/0x38111971b44299b1c4a00b00dc90a120aad862d1 <br>

  
 

2. **Gave 1000 voting tokens to address `0x36956b321bdd1c78C340c9241d5F870937730208`**

  

	cmd: `npx ts-node --files .\scripts\GiveVotingTokens.ts "tokenContractAddress" "addressToGiveVotingTokens" "tokensValue"` <br>

	Address to Give tokens and amount:

	The address: `0x36956b321bdd1c78C340c9241d5F870937730208`

	The amount 1000


	Transaction hash: `0x09f1d6c97e5545897dd907280106c68f059e7bb24ee37f63d353de196071cf13`

	Waiting for confirmations...

	Transaction confirmed <br>
  

3. **Checked voting power of address `0x36956b321bdd1c78C340c9241d5F870937730208` (before self delegation)**

	cmd: `npx ts-node --files .\scripts\CheckingVotingPower.ts "tokenContractAddress" "addressToCheckVotingPower"` <br>

	Account `0x36956b321bdd1c78C340c9241d5F870937730208` has 0 units of voting power . <br>

  

4. **Self delegated voting power of address : `0x36956b321bdd1c78C340c9241d5F870937730208`**

  

	cmd:  `npx ts-node --files .\scripts\DelegatingVotingPower.ts "tokenContractAddress" "addressToDelegateVotingPower"` <br>
	
	Address to delegate:

	The address: `0x36956b321bdd1c78C340c9241d5F870937730208`


	Transaction hash: `0xb5c44f9e8bd844e596331f63d6852b3e77ec1d038e98291bb4e88459f0da398b`

	Waiting for confirmations...

	Transaction confirmed

	The block number: `6126570` <br>

  

5. **Checked voting power of address `0x36956b321bdd1c78C340c9241d5F870937730208` after delegation.** 

	cmd: `npx ts-node --files .\scripts\CheckingVotingPower.ts "tokenContractAddress" "addressToCheckVotingPower"`  <br>

	Account `0x36956b321bdd1c78C340c9241d5F870937730208` has `10000000000000000000000` units of voting power after self delegating <br>



6.  **Tokenized ballot deployed on the sepolia testnet.**


	cmd: `npx ts-node --files .\scripts\DeployTokenizedVote.ts "Proposal1, Proposal2, Proposal3" "tokenContractAddress"  "lastBlockNumberofDelegateVotingPower"`  <br>

	Last block number: `6126578n`

	Deployer address: `0x36956b321bdd1c78C340c9241d5F870937730208`


	Deploying `TokenizedBallot` Contract

	Transaction hash: `0x32f51139975a9660d07645bd58f3e0bec06f55b41bded075fcd6a56b1b6af790`

	Waiting for confirmations...

	`TokenizedBallot` contract deployed to: `0xda699b94f7c948eb2f55def9dc46b1f2898f3df8`


	contract: https://sepolia.etherscan.io/address/0xda699b94f7c948eb2f55def9dc46b1f2898f3df8 <br>

  
7. **Tried casting vote more than voting power i have. 1100 vote.**

	cmd: `npx ts-node --files .\scripts\CastingVotes.ts "tokenizedBallotContractAddress" "purposalIndex" "votingAmount"` <br>

	Proposal selected:

	Voting to proposal *Proposal2*

	got this error : 

    TransactionExecutionError: Execution reverted with reason: The amount to vote is too high. <br>

8. **Casted vote on the ballot with `5000000000000000000000` votes on *Proposal2*.**

	cmd: `npx ts-node --files .\scripts\CastingVotes.ts "tokenizedBallotContractAddress" "purposalIndex" "votingAmount"` <br>


	Proposal selected:
    Voting to proposal *Proposal2*

	Transaction hash: `0x9a5e8e9330808ebdce225d06542147bbe6347df4727202582b877562f94528ea`

	Waiting for confirmations...

	Transaction confirmed <br>


9. **Casted another vote on the ballot with `500000000000000000000` votes on *Proposal3*.**

	cmd: `npx ts-node --files .\scripts\CastingVotes.ts "tokenizedBallotContractAddress" "purposalIndex" "votingAmount"`  <br>
	
	Proposal selected:
    Voting to proposal *Proposal2*

	Transaction hash: `0x9b8fb0b237aba197d2d58eafb3791a202e3fff62af6b19ed51ca2d825c0d41a7`

	Waiting for confirmations...

	Transaction confirmed  <br>


10. **Tried voting more than voting power i have ( voted : `20000000000000000000000` votes.**

	cmd: `npx ts-node --files .\scripts\CastingVotes.ts "tokenizedBallotContractAddress" "purposalIndex" "votingAmount"` <br>

	Proposal selected:

	Voting to proposal *Proposal2*

	got this error :  `TransactionExecutionError: Execution reverted with reason: The amount to vote is too high.` <br>


11. **Queried the final result.**
    cmd: `npx ts-node --files .\scripts\QueryingResult.ts "ballotContractAddress"` <br>

	The winning proposal is: *Proposal2*

	The block number: `6126623` <br>
