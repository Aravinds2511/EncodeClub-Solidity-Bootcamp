import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { provider, signer, lotteryContract } from '../Lottery';
import styles from '../styles/Home.module.css';
import {abi} from '../../../artifacts/contracts/LotteryToken.sol/LotteryToken.json'

const Home: React.FC = () => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [accountIndex, setAccountIndex] = useState<number>(0);

  const [buyAmount, setBuyAmount] = useState<string>('');
  const [buyOutput, setBuyOutput] = useState<string>('');

  const [betAmount, setBetAmount] = useState<string>('');
  const [betOutput, setBetOutput] = useState<string>('');

  const [burnAmount, setBurnAmount] = useState<string>('');
  const [burnOutput, setBurnOutput] = useState<string>('');

  const [duration, setDuration] = useState<string>('');
  const [openBetsOutput, setOpenBetsOutput] = useState<string>('');

  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [withdrawOutput, setWithdrawOutput] = useState<string>('');

  const [checkStateOutput, setCheckStateOutput] = useState<string>('');
  const [closeBetsOutput, setCloseBetsOutput] = useState<string>('');
  const [checkPrizeOutput, setCheckPrizeOutput] = useState<string>('');

  useEffect(() => {
    const fetchAccounts = async () => {
      const accounts = await provider.listAccounts();
      setAccounts(accounts);
    };
    fetchAccounts();
  }, []);

  const connectWallet = async () => {
    await provider.send('eth_requestAccounts', []);
    const accounts = await provider.listAccounts();
    setAccounts(accounts);
    setAccountIndex(0);
  };

  const checkState = async () => {
    const state = await lotteryContract.betsOpen();
    setCheckStateOutput(`The lottery is ${state ? 'open' : 'closed'}`);
  };

  const openBets = async () => {
    if (duration) {
      const timestamp = Math.floor(Date.now() / 1000);
      const tx = await lotteryContract.openBets(timestamp + parseInt(duration, 10));
      await tx.wait();
      setOpenBetsOutput('Bets opened');
    }
  };

  const topUpAccount = async () => {
    if (buyAmount) {
      const amt = ethers.utils.parseEther(buyAmount);
      const ratio = await lotteryContract.purchaseRatio();
      const val = amt.div(ratio);
      const tx = await lotteryContract.purchaseTokens({
        value: val.toString(),
      });
      await tx.wait();
      setBuyOutput('Tokens bought');
    }
  };

  const bet = async () => {
    if (betAmount) {
      const txBet = await lotteryContract.betMany(ethers.BigNumber.from(betAmount));
      await txBet.wait();
      setBetOutput('Bets placed');
    }
  };

  const closeBets = async () => {
    const tx = await lotteryContract.closeLottery();
    await tx.wait();
    setCloseBetsOutput('Bets closed');
  };

  const checkPrize = async () => {
    const prize = await lotteryContract.prize(accounts[accountIndex]);
    setCheckPrizeOutput(`The account has earned a prize of ${ethers.utils.formatEther(prize)} Tokens`);
    if (prize.gt(0)) {
      const claim = confirm('Do you want to claim your prize?');
      if (claim) {
        const tx = await lotteryContract.prizeWithdraw(prize);
        await tx.wait();
        setCheckPrizeOutput('Prize claimed');
      }
    }
  };

  const withdraw = async () => {
    if (withdrawAmount) {
      const tx = await lotteryContract.ownerWithdraw(ethers.utils.parseEther(withdrawAmount));
      await tx.wait();
      setWithdrawOutput('Withdraw confirmed');
    }
  };


  const burnTokens = async () => {
    try {
      if (burnAmount) {
        const amt = ethers.utils.parseEther(burnAmount);
        const accounts = await provider.listAccounts();
        const signer = provider.getSigner(accounts[0]);
        const contract = lotteryContract.connect(signer);
  
        const tokenAddress = await contract.paymentToken();
        const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
  
        const allowanceTx = await tokenContract.approve(contract.address, ethers.constants.MaxUint256);
        await allowanceTx.wait();
        console.log(`Allowance confirmed (${allowanceTx.hash})\n`);
  
        // const ratio = await contract.purchaseRatio();
        // const val = amt.mul(ratio);
  
        const tx = await contract.returnTokens(amt);
        await tx.wait();
        setBurnOutput('Tokens burned and ETH returned');
      }
    } catch (error) {
      console.error('Error in burnTokens:', error);
      if (error instanceof Error) {
        setBurnOutput(`Error: ${error.message}`);
      } else {
        setBurnOutput('An unknown error occurred');
      }
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>Lottery DApp</h1>
      <div className={styles.menu}>
        <button className={styles.button} onClick={connectWallet}>Connect Wallet</button>
      </div>
      <div className={styles.box}>
        <h2>Check State</h2>
        <button className={styles.button} onClick={checkState}>Check State</button>
        <div className={styles.output}>{checkStateOutput}</div>
      </div>
      <div className={styles.box}>
        <h2>Open Bets</h2>
        <div className={styles.promptInput}>
          <label>Duration (in seconds):</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          <button className={styles.button} onClick={openBets}>Open Bets</button>
          <div className={styles.output}>{openBetsOutput}</div>
        </div>
      </div>
      <div className={styles.box}>
        <h2>Buy Tokens</h2>
        <div className={styles.promptInput}>
          <label>Amount of ETH to spend:</label>
          <input
            type="text"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
          />
          <button className={styles.button} onClick={topUpAccount}>Buy Tokens</button>
          <div className={styles.output}>{buyOutput}</div>
        </div>
      </div>
      <div className={styles.box}>
        <h2>Bet</h2>
        <div className={styles.promptInput}>
          <label>Bet how many times:</label>
          <input
            type="text"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
          />
          <button className={styles.button} onClick={bet}>Place Bet</button>
          <div className={styles.output}>{betOutput}</div>
        </div>
      </div>
      <div className={styles.box}>
        <h2>Close Bets</h2>
        <button className={styles.button} onClick={closeBets}>Close Bets</button>
        <div className={styles.output}>{closeBetsOutput}</div>
      </div>
      <div className={styles.box}>
        <h2>Check Prize</h2>
        <button className={styles.button} onClick={checkPrize}>Check Prize</button>
        <div className={styles.output}>{checkPrizeOutput}</div>
      </div>
      <div className={styles.box}>
        <h2>Withdraw Tokens</h2>
        <div className={styles.promptInput}>
          <label>Amount of Tokens to withdraw:</label>
          <input
            type="text"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
          <button className={styles.button} onClick={withdraw}>Withdraw Tokens</button>
          <div className={styles.output}>{withdrawOutput}</div>
        </div>
      </div>
      <div className={styles.box}>
        <h2>Burn Tokens</h2>
        <div className={styles.promptInput}>
          <label>Amount of Tokens to burn:</label>
          <input
            type="text"
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
          />
          <button className={styles.button} onClick={burnTokens}>Burn Tokens</button>
          <div className={styles.output}>{burnOutput}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
