import { useEffect, useState } from 'react';
import { Wallet } from './near-wallet';
import { Contract } from 'near-api-js';
import { Buffer } from 'buffer';
import { NearContract } from './near-interface';
import { UsdtContract } from './usdt-interface';

function App() {
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");
  const [wallet, setWallet] = useState();
  const [contract, setContract] = useState();
  const [contract2, setContract2] = useState();
  const [allEvents, setAllEvents] = useState([]);
  const [allActiveEvents, setAllActiveEvents] = useState([]);
  const [allUnActiveEvents, setUnAllActiveEvents] = useState([]);
  const [allSponser, setAllSponser] = useState([]);
  const [totalEvent, setTotalEvent] = useState("");
  const [detailEvent, setDetailtEvent] = useState("")
  const [ipAllSponser, setIpAllSponser] = useState("");
  const [ipTokenEvent, setIpTokenEvent] = useState("");
  const [ipDetailEvent, setIpDetailEvent] = useState("");
  const [idEvent, setIdEvent] = useState("")
  const [nameEvent, setNameEvent] = useState("")
  const [idEventSponser, setIdEventSponser] = useState("")
  const [amountSponser, setAmountSponser] = useState("")
  const [idEventMoreSponser, setIdEventMoreSponser] = useState("")
  const [amountMoreSponser, setAmountMoreSponser] = useState("")
  const [idEventUsdtSponse, setIdEventUsdtSponse] = useState("");
  const [amountUsdtSponse, setAmountUsdtSponse] = useState("")
  const [idEventUsdtMoreSponse, setIdEventUsdtMoreSponse] = useState("");
  const [amountUsdtMoreSponse, setAmountUsdtMoreSponse] = useState("")

  useEffect(() => {
    window.Buffer = window.Buffer || require("buffer").Buffer;
   const loadWallet = async() => {
    const wallet = new Wallet({
      createAccessKeyFor: "hkt2plats.testnet",
      network: "testnet"
    })
    console.log("walleet: ", wallet)

    const contract = new NearContract({
      contractId: "hkt2plats.testnet",
      walletToUse: wallet
    })

    const contract2 = new UsdtContract({
      contractId: "ft1.tranchinh2001.testnet",
      walletToUse: wallet
    })
    setContract2(contract2)
    setContract(contract)
    setWallet(wallet);
    await wallet.startUp();
   }
   loadWallet();
  }, [])

  const handleGetAllEvent = async() => {
    const result = await contract.getAllEvents();
    setAllEvents(result);
  }
  const handleGetAllActiveEvent = async () => {

    const result = await contract.getAllActiveEvents();
    setAllActiveEvents(result);
  }
  const handleGetAllUnActiveEvent = async () => {
    const result = await contract.getAllUnActiveEvents();
    setUnAllActiveEvents(result);
  }

  const handleGetAllSponserEvent = async (eventId) => {
    const result = await contract.getAllSponserEvent(eventId);
    setAllSponser(result);
  }
  const handleGetTotalTokenEvent = async (eventId) => {
    const result = await contract.getTotalTokenEvent(eventId);
    setTotalEvent(result);
  }

  const handleGetDetailEvent = async (eventId) => {
    const result = await contract.getDetailEvent(eventId);
    setDetailtEvent(result)
  }
  const handleCreateEvent = async (eventId, nameEvent) => {
    const result = await contract.createEvent(eventId, nameEvent);
  }
  const handleSponseEvent = async (eventId, amount) => {
    const result = await contract.sponseNative(eventId, amount);
  }
  const handleMoreSponseEvent = async (eventId, amount) => {
    const result = await contract.moreSponseNative(eventId, amount);
  }
  const handleGetBalanceOf = async(accountId) => {
    const result = await contract2.getBalanceOf(accountId);
    setBalance(result);
  }

  const handleUsdtSponse = async (eventId, amount) => {
    await contract2.sponseUsdt(eventId, amount);
  }

  const handleUsdtMoreSponse = async (eventId, amount) => {
    let newEventId = `more ${eventId}`
    await contract2.moreSponseUsdt(newEventId, amount);
  }

  return (
    <div className="App">
      <div>
      <button onClick={() => wallet.signIn()} >Login</button>
      </div>

      <div>
      <button onClick={() => wallet.signOut()} >Logout</button>
      </div>

      <div>
      <button onClick={() => handleGetAllEvent()} >get all event</button>
      {
        allEvents?.map((item) => {
          return(
            <>
              <p>EventID: {item[0]}-Event_Name: {item[1]}</p>
            </>
          )
        })
      }
      </div>
      <div>
      <button onClick={() => handleGetAllActiveEvent()} >get all active event</button>
        {
          allActiveEvents?.map((item) => {
            return (
              <>
                <p>EventID: {item[0]}-Event_Name: {item[1]}</p>
              </>
            )
          })
        }
      </div>

      <div>
      <button onClick={() => handleGetAllUnActiveEvent()} >get all unactive event</button>
        {
          allUnActiveEvents?.map((item) => {
            return (
              <>
                <p>EventID: {item[0]}-Event_Name: {item[1]}</p>
              </>
            )
          })
        }
      </div>
      <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE" }}>
        <input value={ipAllSponser} onChange={(e) => setIpAllSponser(e.target.value)} placeholder='event_id ViDU: 001' />
        <br />
      <button onClick={() => handleGetAllSponserEvent(ipAllSponser)} >get all sponser event</button>
      {
        allSponser?.map((item) => {
          return(
            <>
              <p>{item}</p>
            </>
          )
        })
      }

      </div>

      <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE"}} >
        <input value={ipTokenEvent} onChange={(e) => setIpTokenEvent(e.target.value)} placeholder='event_id' />
        <br />
      <button onClick={() => handleGetTotalTokenEvent(ipTokenEvent)} >get totalToken event</button>
      {
        totalEvent ? (
          <>
            <p>TokenNear: {totalEvent.token_near}</p>
            <p>TokenUsdt: {totalEvent.token_usdt}</p>
          </>
        ) : ""
      }
      </div>

      <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE" }}>
        <input value={ipDetailEvent} onChange={(e) => setIpDetailEvent(e.target.value)} placeholder='event_id' />
        <br />
      <button onClick={() => handleGetDetailEvent(ipDetailEvent)} >get detail event</button>
        {
          detailEvent ? (
            <>
              <p>id: {detailEvent.id}</p>
              <p>name: {detailEvent.name}</p>
              <p>owner: {detailEvent.owner}</p>
              <div>sponsers: {detailEvent.sponsers.map((item) => {
                return(
                  <>
                    <p style={{marginLeft: "20px"}} >{item}</p>
                  </>
                )
              })}</div>
              <p>status: {detailEvent.status}</p>
              <p>total_near: {detailEvent.total_near}</p>
              <p>total_usdt: {detailEvent.total_usdt}</p>
            </>
          ) : ""
        }
      </div>
      <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE" }}>
        <input value={idEvent} onChange={(e) => setIdEvent(e.target.value)} placeholder='idEvent vd: 001' />
        <br />
        <input placeholder='nameEvent' value={nameEvent} onChange={(e) => setNameEvent(e.target.value)} />
        <br />
      <button onClick={() => handleCreateEvent(idEvent, nameEvent)} >createEvent</button>
      </div>

      <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE" }}>
        <input placeholder='idEvent' value={idEventSponser} onChange={(e) => setIdEventSponser(e.target.value)} />
        <br />
        <input placeholder='Amount' value={amountSponser} onChange={(e) => setAmountSponser(e.target.value)} />
        <br />
      <button onClick={() => handleSponseEvent(idEventSponser, amountSponser)} >sponseEvent</button>
      </div>

      <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE" }}>
        <input placeholder='IdEvent' value={idEventMoreSponser} onChange={(e) => setIdEventMoreSponser(e.target.value)} />
        <br />
        <input placeholder='Amount' value={amountMoreSponser} onChange={(e) => setAmountMoreSponser(e.target.value)} />
        <br />
      <button onClick={() => handleMoreSponseEvent(idEventMoreSponser, amountMoreSponser)} >moresponseEvent</button>
      </div>

        <div>
          <h1>DEPOSIT USDT</h1>

       <div>
        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='address' />
        <br />
          <button onClick={() => handleGetBalanceOf(address)} >get balance of</button>
          {balance && <p>TOken: {balance} Yocto</p>}
       </div>
        <br />
       <div>
          <input placeholder='IdEvent' value={idEventUsdtSponse} onChange={(e) => setIdEventUsdtSponse(e.target.value)} />
          <br />
          <input placeholder='Amount' value={amountUsdtSponse} onChange={(e) => setAmountUsdtSponse(e.target.value)} />
          <br />
        <button onClick={() => handleUsdtSponse(idEventUsdtSponse, amountUsdtSponse)} >sponse usdt</button>
       </div>
        <br />

        <div>
          <input placeholder='IdEvent' value={idEventUsdtMoreSponse} onChange={(e) => setIdEventUsdtMoreSponse(e.target.value)} />
          <br />
          <input placeholder='Amount' value={amountUsdtMoreSponse} onChange={(e) => setAmountUsdtMoreSponse(e.target.value)} />
          <br />
          <button onClick={() => handleUsdtMoreSponse(idEventUsdtMoreSponse, amountUsdtMoreSponse)} >sponse usdt</button>
        </div>

        </div>

    </div>
  );
}

export default App;
