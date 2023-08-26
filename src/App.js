import { useEffect, useState } from 'react';
import { Wallet } from './near-wallet';
import { Contract, utils } from 'near-api-js';
import { Buffer } from 'buffer';
import { NearContract } from './near-interface';
import { UsdtContract } from './usdt-interface';
import { getTransactionLastResult } from 'near-api-js/lib/providers';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
    const [idEventFinish, setIdEventFinish] = useState("")
    const [params, setParams] = useState("")
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const location = useLocation();
    console.log("location: ", location.search)
    const navigate = useNavigate();

    useEffect(() => {
        window.Buffer = window.Buffer || require("buffer").Buffer;
        const loadWallet = async () => {
            const wallet = new Wallet({
                createAccessKeyFor: "hkt2plats.testnet",
                network: "testnet"
            })

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

    useEffect(() => {
        if (!location.search.includes("error") && location.search.split("=")[1]) {
            setParams(location.search.split("=")[1])
        }
    }, [location.search])

    useEffect(() => {
        console.log(wallet);
        const status = async () => {
            if (location.search.includes("error")) {
                navigate("/")
                return;
            }
            const data = await wallet.getTransactionResult(params);
            return data;
        }
        setTransactionSuccess(status);
    }, [location.search])

    const handleGetAllEvent = async () => {
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
    const handleFinishEvent = async (eventId) => {
        await contract.finishEvent(eventId);
    }
    const handleSponseEvent = async (eventId, amount) => {
        const newAmount = utils.format.parseNearAmount(amount);
        const result = await contract.sponseNative(eventId, newAmount);
    }
    const handleMoreSponseEvent = async (eventId, amount) => {
        const newAmount = utils.format.parseNearAmount(amount);
        const result = await contract.moreSponseNative(eventId, newAmount);
    }
    const handleGetBalanceOf = async (accountId) => {
        const result = await contract2.getBalanceOf(accountId);
        setBalance(utils.format.formatNearAmount(result));
    }

    const handleUsdtSponse = async (eventId, amount) => {
        const newAmount = utils.format.parseNearAmount(amount / 1000000);
        const result = await contract2.sponseUsdt(eventId, newAmount);
    }

    const handleUsdtMoreSponse = async (eventId, amount) => {
        const newAmount = utils.format.parseNearAmount(amount / 1000000);
        let newEventId = `more ${eventId}`
        await contract2.moreSponseUsdt(newEventId, newAmount);

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
                        return (
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
                        return (
                            <>
                                <p>{item}</p>
                            </>
                        )
                    })
                }

            </div>

            <div style={{ marginTop: "16px", padding: "10px", backgroundColor: "#ADC4CE" }} >
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
                                return (
                                    <>
                                        <p style={{ marginLeft: "20px" }} >{item}</p>
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
                <input value={idEventFinish} onChange={(e) => setIdEventFinish(e.target.value)} placeholder='idEvent vd: 001' />
                <br />
                <button onClick={() => handleFinishEvent(idEvent)} >Finish Event</button>
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
                    <button onClick={() => handleUsdtMoreSponse(idEventUsdtMoreSponse, amountUsdtMoreSponse)} >more sponse usdt</button>
                </div>
            </div>

        </div>
    );
}

export default App;