import { useEffect } from 'react';

function AccountChange({ getUserAccount }) {

useEffect(() => {
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    return () => {
      window.ethereum.removeAllListeners('accountsChanged');
    }
  },)

  const handleAccountsChanged = (accounts) => {
      getUserAccount();
    }
    return null;
}

export default AccountChange;
