import { useState } from "react";
import search from "../../assets/search.svg";
import Comunity from "../../lib/dummyComunity.js";
import CardComunities from "../../components/CardComunities.jsx";
import Modal from "../../components/Modal.jsx";

const radioBtn1 = ['All','Joined','Not Joined']

const radioBtn2 = ['All Categories','Technology','Design','Business','Career','Ai','Programming','Music']

export default function Comunities() {

    const [status, setStatus] = useState("All");
    const [category, setCategory] = useState("All Categories");
    const [isShow,setIsShow] = useState(false)


  return (
    <>
        <Modal show={isShow} setShow={setIsShow}/>

        <header className="borderFooter w-full px-90 mx-0 rounded-none">
            <div className="font-bold text-4xl">
                Explore Communities
            </div>

            <div className="text-trFooter text-center">
                Join communities that match your interests and get personalized event recommendations.
            </div>

            <label className='veryCenter w-full bg-borderClr p-2 rounded-2xl'>
                <img src={search} alt="search" className='h-7 w-7'/>
                <input className='veryCenter px-2 py-1 outline-none w-full text-black'
                type="text" placeholder='Search events...'/>
            </label>
            
        </header>

        <header className='flex gap-4 px-14 pb-5'>
            <div className="flex w-fit rounded-xl myBorder p-1">
                {radioBtn1.map((v,i)=>{
                    return(
                        <label key={i} className={`cursor-pointer rounded-lg px-5 py-2 ${
                            status === v ? "btnBordColor" : "text-gray-600"
                        }`}>
                            <input 
                            type="radio"
                            name="status"
                            value={v}
                            checked={status === v}
                            onChange={()=> setStatus(v)}
                            className='hidden'
                            />
                            {v}
                        </label>
                    )
                })}
            </div>

            <div className="flex w-fit p-1 gap-2">
                {radioBtn2.map((v,i)=>{
                    return(
                        <label key={i} className={`cursor-pointer rounded-lg px-5 py-2 ${
                            category === v ? "btnBordColor" : "myBorder"
                        }`}>
                            <input 
                            type="radio"
                            name="category"
                            value={v}
                            checked={category === v}
                            onChange={()=> setCategory(v)}
                            className='hidden'
                            />
                            {v}
                        </label>
                    )
                })}
            </div>    
        </header>

        <main className="mainEvent">
            <div className='myBorder w-fit hover:hover'>
                <span className='font-bold'>{Comunity.length} </span><span>events found</span>
            </div>
        </main>

        <section className='grid md:grid-cols-4 grid-cols-1 gap-3 px-14 mb-5'>
            {Comunity.map((v)=><CardComunities key={v.id} Comunities={v} setShow={setIsShow}/>)}
        </section>

    </>
  )
}
