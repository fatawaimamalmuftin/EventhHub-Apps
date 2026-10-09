import { useState, useEffect, useContext } from "react"
import search from "../../assets/search.svg"
import CardEvent from "../../components/CardEvent"
import CardComunities from "../../components/CardComunities"
import EventDetail from "../../components/EventDetail.jsx"
import selectedContext from "../../context/selected/selectedContext.js"
import Events from "../../lib/dummyEvent"
import Comunity from "../../lib/dummyComunity"
import testimonials from '../../lib/dummyTestimonials.js'
import { useSearchParams } from "react-router"

export default function Explore() {

    const [searchParam, setSearchParam] = useSearchParams()

    const [searchEvent,setSearchEvent] = useState(
        searchParam.get("search") || ""
    )
    const [categorie,setCategorie] = useState("")

    const [,setShow] = useState(false)
    const [showDetail,setShowDetail] = useState(false)

    const selectedData = useContext(selectedContext)

    useEffect(() => {
        if (showDetail) {
            window.scrollTo({top: 0})
        }
    }, [showDetail,selectedData])

    const categories = ["Technology","Ai","Design","Business","Programming","Music"]

    const filterEvent = Events.filter((e)=>{
        const searchValue = searchEvent.toLowerCase()
        const categorieValue = categorie.toLowerCase()

        const baseOnSearch = 
        e.title.toLowerCase().includes(searchEvent) ||
        e.location.toLowerCase().includes(searchValue) ||
        e.categories.some((e) => e.toLowerCase() === searchValue.toLowerCase())

        const baseOnCate = categorieValue === "" ||
        e.categories.some((c)=> c.toLowerCase() === categorieValue)
        
        return baseOnSearch && baseOnCate
    })

    const recommended = filterEvent.slice(0,3)
    const upcoming = filterEvent.slice(0,6)
    const popular = Comunity.slice(0,4)

    const dataEvent = showDetail
        ? filterEvent.slice(0,3)
        : filterEvent

    return (
        <main>

            <section className={`bg-blackFigma text-white px-5 py-15 text-center ${showDetail && "hidden"}`}>
                <div className="max-w-3xl mx-auto">

                    <div className="inline-block rounded-full bg-orangeFigma/10 text-orangeFigma text-xs px-3 py-1 mb-5">
                        ✦ Discover · Connect · Participate
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                        Find events that
                        <br />
                        <span className="text-orangeFigma">
                            actually matter
                        </span>
                        {" "}to you
                    </h1>

                    <p className="text-gray-400 mt-4 max-w-xl mx-auto">
                        Join workshops, conferences, and meetups in Indonesia's best
                        communities — or create your own.
                    </p>

                    <form className="max-w-xl mx-auto mt-7 flex bg-white rounded-xl p-1">
                        <div className="flex items-center gap-2 px-3 flex-1">
                            <img src={search} alt="search" className="w-5 h-5" />

                            <input
                                type="text"
                                placeholder="Search events, topics, or locations..."
                                value={searchEvent}
                                onChange={(e)=>{
                                    setSearchEvent(e.target.value),

                                    setSearchParam((param)=>{
                                        param.set("search", e.target.value)
                                        return param
                                    })
                                }}
                                className="w-full outline-none text-sm text-black"
                            />
                        </div>

                        <button
                            type="button"
                            className="btnBordColor py-2 px-5"
                        >
                            Search
                        </button>
                    </form>

                    <div className="flex justify-center gap-5 mt-4 flex-wrap">
                        {categories.map((category,i)=>(
                            <button
                                key={i}
                                type="button"
                                className="text-xs text-gray-500 hover:text-orangeFigma cursor-pointer"
                                onClick={()=>{
                                    setCategorie(category),
                                    setSearchParam((param)=>{
                                        param.set("categories", category)
                                        return param 
                                    })
                                }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                </div>
            </section>


            <EventDetail
                showDetail={showDetail}
                setShowDetail={setShowDetail}
            />


            {showDetail ?

            <main className="mainEvent">

                <div className="myBorder w-fit mb-5 hover:hover">
                    <span className="font-bold">
                        {dataEvent.length}
                    </span>
                    <span>
                        {" "}events found
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {dataEvent.map((event)=>(
                        <CardEvent
                            key={event.id}
                            event={event}
                            isShow={setShow}
                            setShowDetail={setShowDetail}
                        />
                    ))}

                </div>

            </main>

            :

            <>

                <section className="mainEvent">

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs text-orangeFigma uppercase">
                                ↗ Recommended for you
                            </p>

                            <h2 className="font-semibold">
                                Because you joined{" "}
                                <span className="text-orangeFigma">
                                    Bandung Go Community
                                </span>
                            </h2>
                        </div>

                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-orangeFigma cursor-pointer"
                        >
                            See all →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {recommended.map((event)=>(
                            <CardEvent
                                key={event.id}
                                event={event}
                                isShow={setShow}
                                setShowDetail={setShowDetail}
                            />
                        ))}

                    </div>

                </section>


                <section className="mainEvent">

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">
                            All Upcoming Events
                        </h2>

                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-orangeFigma cursor-pointer"
                        >
                            See all →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {upcoming.map((event)=>(
                            <CardEvent
                                key={event.id}
                                event={event}
                                isShow={setShow}
                                setShowDetail={setShowDetail}
                            />
                        ))}

                    </div>

                </section>


                <section className="mainEvent">

                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold">
                            Popular Communities
                        </h2>

                        <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-orangeFigma cursor-pointer"
                        >
                            See all →
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {popular.map((comunity)=>(
                            <CardComunities
                                key={comunity.id}
                                Comunities={comunity}
                                setShow={setShow}
                            />
                        ))}

                    </div>

                </section>


                <section className="mainEvent">

                    <h2 className="font-semibold mb-4">
                        What the community says
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {testimonials.map((testimonial)=>(
                            <div
                                key={testimonial.id}
                                className="border-2 border-borderClr rounded-xl p-5"
                            >

                                <div className="text-orangeFigma text-xl mb-4">
                                    "
                                </div>

                                <p className="text-sm text-gray-500 leading-6">
                                    {testimonial.text}
                                </p>

                                <div className="flex items-center gap-3 mt-5">

                                    <div className="veryCenter w-8 h-8 rounded-full bg-orangeFigma text-white text-xs">
                                        {testimonial.profile}
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold">
                                            {testimonial.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {testimonial.job}
                                        </p>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </section>

            </>

            }

        </main>
    )
}