import { useStoreApi } from "./storeApi";
import useWeb3 from "./useWeb3";
import { Button, TextField } from "@material-ui/core";
import React, { useEffect } from 'react';

import "./App.css";
import Metalogo from "./asset/metamask-fox.svg";

function App() {
  const { balance, address, setAddress, setBalance } = useStoreApi();
  const web3 = useWeb3();


  useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeAllListeners('accountsChanged');
    }
  },)

  const handleAccountsChanged = (accounts) => {
      getUserAccount();
    }

  // get user account on button click
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        web3.eth.getAccounts().then(accounts => {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please Download Metamask To Use This App!");
    }
  };

  const updateBalance = async fromAddress => {
    await web3.eth.getBalance(fromAddress).then(value => {
      setBalance(web3.utils.fromWei(value, "ether"));
    });
  };

  const sendTransaction = async e => {
    e.preventDefault();
    const amount = e.target[0].value;
    const recipient = e.target[1].value;
    await web3.eth.sendTransaction({
      from: address,
      to: recipient,
      value: web3.utils.toWei(amount, "ether")
    });
    updateBalance(address);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={Metalogo} className="App-logo" alt="logo" />
        <p>
          <code>Welcome to DApp</code>
        </p>
        {address ? (
          <>
            <p> Account: {address}</p>
            <p> Balance: {balance} ETH</p>
          </>
        ) : <Button
          onClick={() => getUserAccount()}
          variant="contained"
          color="primary"
        >
          Connect
        </Button> }
        
        {address ? (
        <>
        <form onSubmit={e => sendTransaction(e)}>
          <TextField
            required
            label="Amount"
            inputProps={{ step: "any" }}
            type="number"
            variant="filled"
          />
          <TextField required label="Recipient Address" variant="filled" />
          <Button
            style={{ margin: "10px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </form> 
        </>
        ) : null }
        
      </header>
    </div>
  );
}

export default App;