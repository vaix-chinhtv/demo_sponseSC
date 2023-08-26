import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { utils } from 'near-api-js';
import { Wallet } from './near-wallet';
import { UsdtContract } from './usdt-interface';
function Body() {
    const [wallet, setWallet] = useState();
    console.log("wallet: ", wallet)
    const [contract2, setContract2] = useState();
    useEffect(() => {
        window.Buffer = window.Buffer || require("buffer").Buffer;
        const loadWallet = async() => {
        const wallet = new Wallet({
            createAccessKeyFor: "hkt2plats.testnet",
            network: "testnet"
        })
        const contract2 = new UsdtContract({
        contractId: "ft1.tranchinh2001.testnet",
        walletToUse: wallet
    })
    setContract2(contract2)
    setWallet(wallet);
    await wallet.startUp();
}

   loadWallet();
  }, [])
  const handleUsdtSponse = async () => {
    const newAmount = utils.format.parseNearAmount(10);
    await contract2.sponseUsdt("00009", newAmount);
  }
  const handleClick = () => {
    if(!wallet?.accountId) {
        wallet.signIn()
    }
    else {
        handleUsdtSponse();
    }
  }

  return (
    <div>
        <div className='w-full max-w-[1110px] h-[84px] mx-auto' >
        <div className='flex gap-[55px]' >
            <div className='flex-[0.667] mt-[15px]' >
                <div className='pt-[20px]' >
                    <img src = "https://d1i707o6seb2vk.cloudfront.net/public/images/202308/MicrosoftTeams-image-2-1024x728_2792942161.jpg" />
                </div>
                <div>
                    <h1 className='font-bold text-[30px] leading-[52px] tracking-[0.2px] mt-[32px] font-[""]'>THE GREENHOUSE | 1:1 Start-up & VCs Pitching</h1>
                    <div className='mt-1' >
                        <div className='flex items-center' >
                            <Icon className='h-[14px]' icon="zmdi:alarm-check" />
                            <p className='mx-1' >2023-08-16 16:54</p>
                            <Icon className='h-[12px]' icon="zmdi:account" />
                            <p className='mx-1' >Admin</p>
                            <Icon className='h-[12px]' icon="zmdi:favorite-outline" />
                            <p>335 Likes</p>
                        </div>
                    </div>
                    <p className='font-light text-[18px] leading-[30px] tracking-[0.2px] text-[#666] mt-4 font-["roboto"]' >
                        The program will feature a 1:1 pitching session with top VCs, as well as networking opportunities with other founders and mentors. To apply, startups must submit a proposal by 8th August, 2023. The Greenhouse team will work with VCs to select startups to participate in the program.
                    </p>
                </div>
            </div>
            <div className='flex-[0.333] mt-[15px]' >
                <div className='px-[30px] py-[20px] shadow rounded-xl' >
                    <h1 className='pt-[29px] text-left text-[#111343] leading-5 text-[30px]' >Sponsor</h1>
                    <div>
                        <h2 className='pt-[27px] text-[17px] font-bold text-left' >Cardano event</h2>
                        <p className='min-h-[100px] max-h-[150px] overflow-auto text-[#333] py-[3px] leading-[20px] font-normal' >The program will feature a 1:1 pitching session with top VCs, as well as networking opportunities with other founders and mentors.</p>
                    </div>
                    <div className='p-[10px] bg-[#ffe0f6] rounded-[10px] -mt-[2px]' >
                        <div>
                            <p className='pt-[5px] leading-[20px] text-[#333] text-left font-normal text-[16px]' >Reward: $100</p>
                            <p className='pt-[5px] leading-[20px] text-[#333] text-left font-normal text-[16px]'>Bonus: $0</p>
                        </div>
                        <hr className='m-[10px] border-t-[1px] border-[#0000001a]' />
                        <div>
                            <p className='pt-[5px] leading-[20px] text-[#333] text-left font-normal text-[16px]'>Total: $100</p>
                        </div>
                    </div>
                    <div className='mt-[10px] rounded-[5px] border-[1px] border-[#D1D1D1] flex items-center justify-center gap-[4px]' >
                        <button onClick={() => wallet.signOut()} className='pt-[5px] pb-[7px] px-[10px] rounded-[10px] my-[15px] text-[#fff] bg-[#008B8B]' >Connect Wallet</button>
                        <button onClick={() => handleClick()} className='pt-[5px] pb-[7px] px-[10px] rounded-[10px] my-[15px] text-[#fff] bg-[#187fe2]'>Submit</button>
                    </div>
                    <h2 className='text-[20px] pt-[23px] text-left text-[#111343] leading-6' >Top events</h2>
                </div>
            </div>
        </div>
    </div>
    <div className='pt-[50px] pb-[40px] bg-[#2D2E32] mt-[800px]' >
        </div>
    </div>
  )
}

export default Body