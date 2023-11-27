import { useState, useEffect } from "react";
import "./App.css";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import useBet from "./betking/hooks/useBet";

const tele = window.Telegram.WebApp;

function App() {
  const { open } = useWeb3Modal();
  const { address } = useAccount();
  const [round, setRound] = useState("home");
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  const { deposit, matchData, betData } = useBet();
  const [data, setData] = useState({});
  const [details, setDetails] = useState({});

  useEffect(() => {
    tele.ready();
   
  }, [tele]);

  useEffect(() => {
    matchData().then((data) => {
      setData({
        home: data[0],
        away: data[1]
      })
    });
    betData().then((data) => {
        setDetails({
          home: +data[0]._hex,
          away: +data[1]._hex,
          tie: +data[2]._hex
        })
    })
  }, [matchData]);

  // const onCheckout = () => {
  //   tele.MainButton.text = "Pay :)";
  //   tele.MainButton.show();
  // };

  const bet = async () => {
    try {
      setLoading(true);
      await deposit(amount, round);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (!address) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <button
          onClick={() => open()}
          style={{
            padding: 10,
            backgroundColor: "orange",
            borderRadius: 10,
            border: "none",
            color: "white",
          }}
        >
          Connect Wallet
        </button>
      </div>
    );
  }
  return (
    <div>
      <div
        className="header"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "orange",
        }}
      >
        bBetter
      </div>
      <div
        className="teams"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          flexDirection: "column",
          fontWeight: "bold",
        }}
      >
        <p>{data?.home}</p>
        <p>VS</p>
        <p>{data?.away}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 20,
          fontWeight: "bold",
        }}
      >
        <p
          onClick={() => setRound("home")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            height: 50,
            width: 50,
            background: round === "home" ? "lightblue" : "red",
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          Home
        </p>
        <p
          onClick={() => setRound("tie")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            height: 50,
            width: 50,
            background: round === "tie" ? "lightblue" : "red",
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          Tie
        </p>
        <p
          onClick={() => setRound("away")}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
            background: round === "away" ? "lightblue" : "red",
            height: 50,
            width: 50,
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          Away
        </p>
      </div>

      <div
        className="field"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            height: 40,
            width: "80%",
            paddingRight: 15,
            paddingLeft: 15,
            borderRadius: 15,
          }}
        >
          <input
            placeholder="Place Bet"
            style={{
              border: "none",
              outline: "none",
            }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
          <p
            style={{
              marginLeft: 30,
              color: "#aaa",
            }}
          >
            USDC
          </p>
        </div>
      </div>
      <div
        className="details"
        style={{
          padding: 30,
        }}
      >
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          Current Bet
        </p>
        <ul className="detail">
          <li>
            <p>Home Win</p>
            <p>{details?.home.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          </li>
          <li>
            <p>Tie</p>
            <p>{details?.tie.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          </li>
          <li>
            <p>Away Win</p>
            <p>{details?.away.toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
          </li>
        </ul>
      </div>
      <div
        className="footer"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            width: "100%",
            height: 40,
            background: "blue",
            border: "none",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={bet}
        >
          {loading ? "Loading..." : "Place Bet"}
        </button>
      </div>
    </div>
  );
}

export default App;
