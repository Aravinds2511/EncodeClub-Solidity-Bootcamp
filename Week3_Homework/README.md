# Project Report: Tokenized Voting Contract

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
