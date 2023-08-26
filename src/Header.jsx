import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <header className='border-b-[1px] border-[#3EA2FF]' >
            <div className='w-full max-w-[1110px] h-[84px] mx-auto' >
                <div className='flex items-center justify-between h-full' >
                    <Link to = "/" >
                        <img className='w-[90%]' src = "https://test-event.plats.network/events/logo-event.svg" />
                    </Link>
                    <div className='flex gap-[5px]' >
                        <Link className='text-[16px] px-[10px] h-[40px] leading-[39px] duration-500 hover:text-[#007bff]' >Create Event</Link>
                        <Link className='text-[16px] px-[10px] h-[40px] leading-[39px] duration-500 hover:text-[#007bff]'>Solutions</Link>
                        <Link className='text-[16px] px-[10px] h-[40px] leading-[39px] duration-500 hover:text-[#007bff]'>Templates</Link>
                        <Link className='text-[16px] px-[10px] h-[40px] leading-[39px] duration-500 hover:text-[#007bff]'>Pricing</Link>
                        <Link className='text-[16px] px-[10px] h-[40px] leading-[39px] duration-500 hover:text-[#007bff]'>Resources</Link>
                        <Link className='text-[16px] px-[10px] h-[40px] leading-[39px] duration-500 hover:text-[#007bff]'>Contact</Link>
                    <div className='border-l-[1px] border-gray-300' >
                        <div className='ml-[10px] rounded-full bg-red-600 border-[#3EA2FF] border-2 w-[44px] h-[44px]' >
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header