import users from '../assets/users.svg'
import calendar from '../assets/calender.svg'

export default function CardComunities({Comunities, setShow}) {

  return (
    <>
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white border-borderClr border-2 transition duration-300 hover:-translate-y-2">
      <div className=" relative">
        <img 
        className="h-56 w-full object-cover"
        src={Comunities.image} 
        alt={Comunities.title} />
      </div>

      <div className='px-2 flex flex-col gap-2'>
      <h2 className="mt-4 text-xl font-semibold">
        {Comunities.title}
      </h2>

      <p className="text-gray-400 line-clamp-2">
        {Comunities.description}
      </p>

      <div className='flex gap-2'>
        {Comunities.categories.map((e,i)=>(
          <span
          key={i}
          className="rounded-full bg-black/20 px-3 py-1 text-sm text-white"
          >
            {e}
          </span>
        ))}
      </div>

      <div className='flex gap-4'>
        <span
        className='mb-3 flex items-center gap-2 text-gray-500'>
          <img src={users} alt='users' className='h-4 w-4'/>
          {Comunities.members} member
        </span>

        <span
        className='mb-3 flex items-center gap-2 text-gray-500'>
          <img src={calendar} alt='calendar' className='h-4 w-4'/>
          {Comunities.upcoming} upcoming
        </span>
      </div>
      </div>

      <div className='p-2'>
        <button className=' btnBordColor w-full hover:bg-green-400'
        onClick={(()=>setShow(true))}
        >Join Community</button>
      </div>
    </div>
    </>
  )
}
