// import { useState } from 'react'
import Ticket from '../assets/ticket.svg'
import { useNavigate } from 'react-router'

export default function Modal({show,setShow}) {

    const navigate = useNavigate()
    
    if(!show){
        return null
    }

  return (
    <div className={
        show ? 
        "flex justify-center z-3 w-screen h-screen bg-black/50 fixed" 
        : "hidden"}
        onClick={()=>setShow(false)}
    >
        <div className="bg-white max-w-118 rounded-2xl mb-auto mt-30">
            <div className='veryCenter border-b-2 border-gray-300 p-5'>
                <div className='font-semibold'>Sign in to continue</div>
                <div className='ml-auto cursor-pointer hover:text-red-500'
                onClick={()=>setShow(false)}>X</div>
            </div>

            <div className='veryCenter flex-col p-5 gap-4'>
                <div className='bg-red-100 p-2 rounded-2xl'>
                    <img src={Ticket} alt="Ticket" className='h-10 w-10  '/>
                </div>
                <div className='veryCenter text-center'>
                    Create a free account to register for events, save favourites, join communities, and get personalised recommendations.
                </div>
            </div>

            <div className='veryCenter w-fit gap-3 p-5 ml-auto'>
                <button className=' myBorder hover:bg-red-500 hover:border-red-500 hover:text-white'
                onClick={()=>setShow(false)}
                >Keep browsing</button>

                <button className=' btnBordColor hover:bg-green-500 hover:border-green-500 hover:text-white'
                onClick= {(()=>navigate('/login'))}
                >Sign In</button>
            </div>
        </div>
    </div>
  )
}
