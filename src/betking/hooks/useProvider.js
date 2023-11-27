import { ethers } from 'ethers';
import { useEffect, useState } from 'react'
import { useWalletClient } from 'wagmi';

const useProvider = () => {
    const { data } = useWalletClient();
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        if (data) {
          // Set Provider
          setProvider(new ethers.providers.Web3Provider(data));
        }
      }, [data]);

      
  return {
    provider
  }
}

export default useProvider