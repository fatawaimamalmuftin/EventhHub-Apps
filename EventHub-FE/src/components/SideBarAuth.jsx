import dina from '../assets/dina.jpg'
import kevin from '../assets/kevin.jpg'
import { Link } from 'react-router'

export default function SideBarAuth() {
  return (
    <aside className="relative overflow-hidden bg-black text-white">
        <div className=" absolute bg-linear-to-bl from-black to-orange-900">
            <main className="relative z-10 flex flex-col gap-8 px-20 py-10">
                <header className="flex gap-2 items-center">
                    <div className="btnBordColor rounded-xl font-bold text-sm">
                        <Link to={'/'}>
                          E
                        </Link>
                    </div>
                    <div className="text-xl font-semibold">EventHub</div>
                </header>

                <div>
                    <div>
                        <div className="font-bold text-5xl pr-20">
                            Discover events that shape careers.
                        </div>
                        <div className="mt-2 text-white/30 text-xl">
                            Workshops, conferences, and community meetups from Indonesia's most active tech communities — all in one place.
                        </div>
                    </div>

                    <div className='hover:bg-white/20 mt-8 bg-white/10 rounded-2xl w-full px-15 py-5'>
                        <div>
                            "Found my last three workshops here. The community is fantastic."
                        </div>

                        <div className='flex gap-5 items-center'>
                            <img src={dina} alt="dina" className='h-8 w-8 rounded-2xl'/>
                            <div>
                                <div className='font-semibold'>Dina Rahayu</div>
                                <div className='text-md text-white/30'>Backend Lead, Cakrawala Digital</div>
                            </div>
                        </div>
                    </div>

                     <div className='hover:bg-white/20 mt-5 bg-white/10 rounded-2xl w-full px-15 py-5'>
                        <div>
                            "EventHub is where Jakarta's tech scene actually happens."
                        </div>

                        <div className='flex gap-5 items-center'>
                            <img src={kevin} alt="kevin" className='h-8 w-8 rounded-2xl'/>
                            <div>
                                <div className='font-semibold'>Kevin Santoso</div>
                                <div className='text-md text-white/30'>ML Engineer, Nusantara Labs</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col items-center mt-5'>
                            <div className='font-semibold text-2xl'>12k+</div>
                            <div className='text-white/30'>Members</div>
                        </div>

                        <div className='flex flex-col items-center mt-5'>
                            <div className='font-semibold text-2xl'>200+</div>
                            <div className='text-white/30'>Events/year</div>
                        </div>

                        <div className='flex flex-col items-center mt-5'>
                            <div className='font-semibold text-2xl'>50+</div>
                            <div className='text-white/30'>Communities</div>
                        </div>
                    </div>
                </div>

                <div className='text-white/30 mt-10'>© 2026 EventHub · Indonesia</div>
            </main>
        </div>
    </aside>
  )
}
