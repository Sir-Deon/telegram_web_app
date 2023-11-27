import React, { useEffect, useState } from 'react'
import useProvider from './useProvider';
import { ethers } from 'ethers';
import abi from "../abi/oracle.json";


const useOracle = () => {
    const {provider} = useProvider();
    const [oracle, setContract] = useState(null);
    const contractAddress = "0x73A11CB78850a94D0436748FD4546cAb3C5981A7"

    useEffect(() => {
        if (provider) {
          const signer = provider.getSigner();
          setContract(new ethers.Contract(contractAddress, abi, signer));
        }
      }, [provider]);
  return {
    oracle
  }
}

export default useOracle