import { useEffect, useState } from 'react'
import useProvider from './useProvider';
import { ethers } from 'ethers';
import abi from "../abi/sportBook.json";

const useSportBook = () => {
    const {provider} = useProvider();
    const [sportBook, setContract] = useState(null);
    const contractAddress = "0x49f5A67B9D4ecdf81E656d266966BFb46BebaCe0"


    useEffect(() => {
        if (provider) {
          const signer = provider.getSigner();
          setContract(new ethers.Contract(contractAddress, abi, signer));
        }
      }, [provider]);
  return {
    sportBook
  }
}

export default useSportBook