import { expect } from "chai";
import { toHex, hexToString } from "viem";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function deployContract() {
    const publicClient = await viem.getPublicClient();
    const [deployer, otherAccount, spareAccount, otherAccount1, otherAccount2, otherAccount3] = await viem.getWalletClients();
    const ballotContract = await viem.deployContract("Ballot", [
      PROPOSALS.map((prop) => toHex(prop, { size: 32 })),
    ]);
    return { publicClient, deployer, otherAccount, ballotContract, spareAccount, otherAccount1, otherAccount2, otherAccount3 };
}
describe("Ballot", async () => {
  describe("when the contract is deployed", async () => {
    it("has the provided proposals", async () => {
        const { ballotContract } = await loadFixture(deployContract);
        for (let index = 0; index < PROPOSALS.length; index++) {
          const proposal = await ballotContract.read.proposals([BigInt(index)]);
          expect(hexToString(proposal[0], { size: 32 })).to.eq(PROPOSALS[index]);
        }
    });

    it("has zero votes for all proposals", async () => {
        const { ballotContract } = await loadFixture(deployContract);
        for (let index = 0; index < PROPOSALS.length; index++) {
            const proposal = await ballotContract.read.proposals([BigInt(index)]);
            expect(proposal[1]).to.eq(0n);
          }
    });
    it("sets the deployer address as chairperson", async () => {
        const { ballotContract, deployer } = await loadFixture(deployContract);
        const chairperson = await ballotContract.read.chairperson();
        expect(chairperson.toLowerCase()).to.eq(deployer.account.address);
    });
    it("sets the voting weight for the chairperson as 1", async () => {
        const { ballotContract } = await loadFixture(deployContract);
        const chairperson = await ballotContract.read.chairperson();
        const chairpersonVoter = await ballotContract.read.voters([chairperson]);
        expect(chairpersonVoter[0]).to.eq(1n);
    });
  });

  describe("when the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("gives right to vote for another address", async () => {
        const { ballotContract, deployer, otherAccount, publicClient } = await loadFixture(deployContract);
          const txHash = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
          ]);
          const receipt = await publicClient.getTransactionReceipt({ hash: txHash });
          expect(receipt.status).to.equal("success");
          const otherAccountVoter = await ballotContract.read.voters([otherAccount.account.address]);
          expect(otherAccountVoter[0]).to.equal(1n);
    });
    it("can not give right to vote for someone that has voted", async () => {
        const { ballotContract, otherAccount, publicClient } = await loadFixture(deployContract);
        const txHash1 = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ]);  
        const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
        expect(receipt1.status).to.equal("success");

        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        const txHash2 = await ballotContractAsOtherAccount.write.vote([BigInt(1)]);  
        const receipt2 = await publicClient.getTransactionReceipt({ hash: txHash2 });
        expect(receipt2.status).to.equal("success");

        await expect(ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ])).to.be.rejectedWith("The voter already voted.");
    });
    it("can not give right to vote for someone that has already voting rights", async () => {
        const { ballotContract, otherAccount, publicClient } = await loadFixture(deployContract);
        const txHash1 = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ]);  
        const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
        expect(receipt1.status).to.equal("success");

        await expect(ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ])).to.be.rejectedWith("");
    });
  });

  describe("when the voter interacts with the vote function in the contract", async () => {
    // TODO
    it("should register the vote", async () => {
        const { ballotContract, otherAccount, publicClient } = await loadFixture(deployContract);
        const txHash1 = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ]);  
        const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
        expect(receipt1.status).to.equal("success");

        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        const txHash2 = await ballotContractAsOtherAccount.write.vote([BigInt(1)]);  
        const receipt2 = await publicClient.getTransactionReceipt({ hash: txHash2 });
        expect(receipt2.status).to.equal("success");  

        const otherAccountVoter = await ballotContract.read.voters([otherAccount.account.address]);
        await expect(otherAccountVoter[1]).to.eq(true);
    });
  });

  describe("when the voter interacts with the delegate function in the contract", async () => {
    it("should transfer voting power", async () => {
        const { ballotContract, deployer, otherAccount, publicClient } = await loadFixture(deployContract);
        const txHash1 = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ]);  
        const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
        expect(receipt1.status).to.equal("success");

        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        const txHash2 = await ballotContractAsOtherAccount.write.delegate([
            deployer.account.address,
        ]);  
        const receipt2 = await publicClient.getTransactionReceipt({ hash: txHash2 });
        expect(receipt2.status).to.equal("success");

        const deployerVoter = await ballotContract.read.voters([deployer.account.address]);
        expect(deployerVoter[0]).to.eq(2n);
    });
  });

  describe("when an account other than the chairperson interacts with the giveRightToVote function in the contract", async () => {
    it("should revert", async () => {
        const { ballotContract, spareAccount, otherAccount } = await loadFixture(deployContract);
        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );

        await expect(ballotContractAsOtherAccount.write.giveRightToVote([spareAccount.account.address])).to.rejectedWith("Only chairperson can give right to vote.")  
    });
  });

  describe("when an account without right to vote interacts with the vote function in the contract", async () => {
    it("should revert", async () => {
        const { otherAccount, ballotContract } = await loadFixture(deployContract);
        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        await expect(ballotContractAsOtherAccount.write.vote([BigInt(1)])).to.rejectedWith("Has no right to vote");  
    });
  });

  describe("when an account without right to vote interacts with the delegate function in the contract", async () => {
    it("should revert", async () => {
        const { otherAccount, deployer, ballotContract } = await loadFixture(deployContract);
        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        await expect(ballotContractAsOtherAccount.write.delegate([deployer.account.address])).to.rejectedWith("You have no right to vote");
    });
  });

  describe("when someone interacts with the winningProposal function before any votes are cast", async () => {
    it("should return 0", async () => {
        const { ballotContract } = await loadFixture(deployContract);
        const winningProposalfunc = await ballotContract.read.winningProposal();
        expect(winningProposalfunc).to.eq(0n);
    });
  });

  describe("when someone interacts with the winningProposal function after one vote is cast for the first proposal", async () => {
    it("should return 0", async () => {
      const { ballotContract, otherAccount, publicClient } = await loadFixture(deployContract);
        const txHash1 = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ]);  
        const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
        expect(receipt1.status).to.equal("success");

        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        const txHash2 = await ballotContractAsOtherAccount.write.vote([BigInt(0)]);  
        const receipt2 = await publicClient.getTransactionReceipt({ hash: txHash2 });
        expect(receipt2.status).to.equal("success"); 
        
        const winningProposalfunc = await ballotContract.read.winningProposal();
        expect(winningProposalfunc).to.eq(0n);
    });
  });

  describe("when someone interacts with the winnerName function before any votes are cast", async () => {
    it("should return name of proposal 0", async () => {
      const { ballotContract } = await loadFixture(deployContract);
      const winningNamefunc = await ballotContract.read.winnerName();
      expect(hexToString(winningNamefunc, {size: 32})).to.eq(PROPOSALS[0]);
    });
  });

  describe("when someone interacts with the winnerName function after one vote is cast for the first proposal", async () => {
    it("should return name of proposal 0", async () => {
      const { ballotContract, otherAccount, publicClient } = await loadFixture(deployContract);
        const txHash1 = await ballotContract.write.giveRightToVote([
            otherAccount.account.address,
        ]);  
        const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
        expect(receipt1.status).to.equal("success");

        const ballotContractAsOtherAccount = await viem.getContractAt(
            "Ballot",
            ballotContract.address,
            { client: { wallet: otherAccount } }
          );
        const txHash2 = await ballotContractAsOtherAccount.write.vote([BigInt(0)]);  
        const receipt2 = await publicClient.getTransactionReceipt({ hash: txHash2 });
        expect(receipt2.status).to.equal("success"); 
        
        const winningNamefunc = await ballotContract.read.winnerName();
        expect(hexToString(winningNamefunc, {size: 32})).to.eq(PROPOSALS[0]);
    });
  });

  describe("when someone interacts with the winningProposal function and winnerName after 5 random votes are cast for the proposals", async () => {
    it("should return the name of the winner proposal", async () => {
      const { ballotContract, deployer, otherAccount, publicClient, otherAccount1, otherAccount2, otherAccount3 } = await loadFixture(deployContract);
      // const [,] = await viem.getWalletClients();

      //Right to Vote function
      const txHasha = await ballotContract.write.giveRightToVote([otherAccount.account.address]);  
      const receipta = await publicClient.getTransactionReceipt({ hash: txHasha });
      expect(receipta.status).to.equal("success");

      const txHashb = await ballotContract.write.giveRightToVote([otherAccount1.account.address]);  
      const receiptb = await publicClient.getTransactionReceipt({ hash: txHashb });
      expect(receiptb.status).to.equal("success");

      const txHashc = await ballotContract.write.giveRightToVote([otherAccount2.account.address]);  
      const receiptc = await publicClient.getTransactionReceipt({ hash: txHashc });
      expect(receiptc.status).to.equal("success");

      const txHashd = await ballotContract.write.giveRightToVote([otherAccount3.account.address]);  
      const receiptd = await publicClient.getTransactionReceipt({ hash: txHashd });
      expect(receiptd.status).to.equal("success");
      
      //Vote Function
      const txHash1 = await ballotContract.write.vote([BigInt(0)]);  
      const receipt1 = await publicClient.getTransactionReceipt({ hash: txHash1 });
      expect(receipt1.status).to.equal("success"); 
      
      const ballotContractAsOtherAccount = await viem.getContractAt(
        "Ballot",
        ballotContract.address,
        { client: { wallet: otherAccount } }
      );
      const txHash2 = await ballotContractAsOtherAccount.write.vote([BigInt(1)]);  
      const receipt2 = await publicClient.getTransactionReceipt({ hash: txHash2 });
      expect(receipt2.status).to.equal("success"); 
        
      const ballotContractAsOtherAccount1 = await viem.getContractAt(
        "Ballot",
        ballotContract.address,
        { client: { wallet: otherAccount1 } }
      );
      const txHash3 = await ballotContractAsOtherAccount1.write.vote([BigInt(1)]);  
      const receipt3 = await publicClient.getTransactionReceipt({ hash: txHash3 });
      expect(receipt3.status).to.equal("success"); 

      const ballotContractAsOtherAccount2 = await viem.getContractAt(
        "Ballot",
        ballotContract.address,
        { client: { wallet: otherAccount2 } }
      );
      const txHash4 = await ballotContractAsOtherAccount2.write.vote([BigInt(1)]);  
      const receipt4 = await publicClient.getTransactionReceipt({ hash: txHash4 });
      expect(receipt4.status).to.equal("success"); 

      const ballotContractAsOtherAccount3 = await viem.getContractAt(
        "Ballot",
        ballotContract.address,
        { client: { wallet: otherAccount3 } }
      );
      const txHash5 = await ballotContractAsOtherAccount3.write.vote([BigInt(2)]);  
      const receipt5 = await publicClient.getTransactionReceipt({ hash: txHash5 });
      expect(receipt5.status).to.equal("success");
      
      const Winner = await ballotContract.read.winnerName();
      expect(hexToString(Winner, {size: 32})).to.eq(PROPOSALS[1]);
    });
  });
});