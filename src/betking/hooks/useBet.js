import { ethers } from "ethers";
import useSportBook from "./useSportBook";
import useOracle from "./useOracle";

const useBet = () => {
  const {sportBook} = useSportBook();
  const {oracle} = useOracle();

  const deposit = async (amount, round) => {
    try {
      const txn1 = await sportBook?.createBet(1);
      await txn1.wait();
      const txn = await sportBook?.deposit(
         1,
         ethers.utils.parseUnits(round === "home" ? String(amount) : "0", "ether"),
         ethers.utils.parseUnits(round === "away" ? String(amount) : "0", "ether"),
         ethers.utils.parseUnits(round === "tie" ? String(amount) : "0", "ether"),
      );
      await txn.wait();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const matchData = async () => {
    try {
      const data = await oracle?.matchData(1);
      return data
    } catch (error) {
      console.log(error);
    }
  };
  const betData = async () => {
    try {
      const data = await sportBook?.getPoolOdds(1);
      return data
    } catch (error) {
      console.log(error);
    }
  };

  return {
    deposit,
    matchData,
    betData
  };
};

export default useBet;
