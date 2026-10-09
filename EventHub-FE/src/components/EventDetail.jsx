import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addCart,removeCart } from "../Redux/slice/userSlice.js"
import selectedContext from "../context/selected/selectedContext"

export default function EventDetail({showDetail, setShowDetail}) {
    const selectedData = useContext(selectedContext)
    const dispatch = useDispatch()

    const userLogind = useSelector(
        (state) => state.userState.user
    )

    const isRegistered = userLogind?.cart?.some(
        (item) => item.id === selectedData.selected.id
    )

    const img = selectedData.selected.image
    const title = selectedData.selected.title
    const categories = selectedData.selected.categories
    const date = selectedData.selected.date
    const time = selectedData.selected.time
    const location = selectedData.selected.location
    const attendees = selectedData.selected.attendees
    const capacity = selectedData.selected.capacity

    const [showJoin, setShowJoin] = useState(false)

    return (
            <main className={`min-h-screen bg-gray-50 ${!showDetail && "hidden"}`}>

                <div className="px-6 py-5 md:px-16">
                    <button className="veryCenter cursor-pointer hover:text-orangeFigma text-sm text-gray-500"
                    onClick={()=>setShowDetail(false)}
                    >
                        ← Back to Events
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-6 px-6 pb-10 lg:grid-cols-3 lg:px-16">

                    <main className="lg:col-span-2">

                        <img
                            src={img}
                            alt={title}
                            className="h-72 w-full rounded-lg object-cover md:h-96"
                        />

                        <div className="flex gap-2 mt-4">
                            {categories?.map((e,i)=>(
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600"
                                    key={i}
                                    >
                                        {e}
                                    </span>
                                
                            ))}
                        </div>

                        <h1 className="mt-3 text-3xl font-bold text-gray-900">
                            {title}
                        </h1>

                        <div className="mt-6">

                            <h2 className="font-semibold text-gray-900">
                                About this event
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                A deep-dive workshop into Go concurrency patterns —
                                goroutines, channels, select statements, and real-world
                                use cases. Suitable for intermediate Go developers ready
                                to write production-grade concurrent code.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                We'll cover common pitfalls, race conditions, and how to use
                                the sync package effectively. Bring your laptop and be ready
                                to write a lot of code.
                            </p>

                        </div>

                        <div className="mt-7">

                            <h2 className="font-semibold text-gray-900">
                                Speakers
                            </h2>

                            <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2">

                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">

                                    <img
                                        src="https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                                        alt="Ahmad Fauzan"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Ahmad Fauzan
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Staff Engineer, Tokopedia
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">

                                    <img
                                        src="https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                                        alt="Dina Rahayu"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Dina Rahayu
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            Backend Lead, Traveloka
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="mt-7">

                            <div className="flex items-center gap-2">
                                <h2 className="font-semibold text-gray-900">
                                    Discussion
                                </h2>

                                <span className="text-xs text-gray-400">
                                    (3)
                                </span>
                            </div>

                            <div className="mt-3 space-y-3">

                                <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3">

                                    <img
                                        src="https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                                        alt="Dian Purnama"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />

                                    <div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-semibold">
                                                Dian Purnama
                                            </p>

                                            <span className="text-[10px] text-gray-400">
                                                2d ago
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-gray-600">
                                            Super excited for this one — will there be any
                                            live coding exercises?
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3">

                                    <img
                                        src="https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                                        alt="Ahmad Fauzan"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />

                                    <div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-semibold">
                                                Ahmad Fauzan
                                            </p>

                                            <span className="text-[10px] text-gray-400">
                                                1d ago
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-gray-600">
                                            Yes! The afternoon session is entirely hands-on.
                                            Bring your laptop with Go 1.22+ installed.
                                        </p>

                                    </div>

                                </div>

                                <div className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3">

                                    <img
                                        src="https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                                        alt="Siti Rahayu"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />

                                    <div>

                                        <div className="flex items-center gap-2">
                                            <p className="text-xs font-semibold">
                                                Siti Rahayu
                                            </p>

                                            <span className="text-[10px] text-gray-400">
                                                12h ago
                                            </span>
                                        </div>

                                        <p className="mt-1 text-xs text-gray-600">
                                            Is there parking nearby? Coming from outside Bandung.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center gap-2 mt-3 rounded-lg border border-gray-200 bg-white px-3 py-2">

                                <input
                                    type="text"
                                    placeholder="Add to the discussion..."
                                    className="w-full text-xs outline-none"
                                />

                                <button className="text-orange-500">
                                    ➤
                                </button>

                            </div>

                        </div>

                        <div className="mt-8">

                            <h2 className="font-semibold text-gray-900">
                                You might also like
                            </h2>

                        </div>

                    </main>


                    <aside className="space-y-4">

                        <div className="rounded-lg border border-gray-200 bg-white p-4">

                            <p className="text-xs font-semibold text-gray-500">
                                EVENT INFO
                            </p>

                            <div className="mt-4 space-y-3 text-xs text-gray-600">

                                <div className="flex gap-2">
                                    <span>📅</span>
                                    <span>{date}</span>
                                </div>

                                <div className="flex gap-2">
                                    <span>◷</span>
                                    <span>{time}</span>
                                </div>

                                <div className="flex gap-2">
                                    <span>📍</span>
                                    <span>{location}</span>
                                </div>

                            </div>

                            <div className="my-4 border-t border-gray-100" />

                            <div className="text-xs text-gray-500">
                                👥 {attendees} / {capacity} attendees
                            </div>

                            <div className="mt-2 h-2 rounded-full bg-gray-100">
                                <div className="h-2 rounded-full bg-green-500" 
                                    style={{width: `${(attendees / capacity) * 100}%`}}
                                />
                            </div>

                            <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                                <span>48 attendees</span>
                                <span>100 capacity</span>
                            </div>

                            <button
                                onClick={() => {

                                    if(isRegistered){
                                        dispatch(removeCart(selectedData.selected.id))
                                        return
                                    }

                                    setShowJoin(true)
                                    
                                }}
                                className={`${
                                    isRegistered
                                        ? "bg-green-500 border-green-500 text-white w-full rounded-2xl py-2"
                                        : "btnBordColor w-full"
                                }`}
                            >
                                {isRegistered ? "✓ Registered" : "Join Event"}
                            </button>

                            <div className="grid grid-cols-2 gap-2 mt-2">

                                <button className="rounded-md border border-gray-200 py-2 text-xs text-gray-600">
                                    ♡ Save
                                </button>

                                <button className="rounded-md border border-gray-200 py-2 text-xs text-gray-600">
                                    ⤴ Share
                                </button>

                            </div>

                        </div>


                        <div className="rounded-lg border border-gray-200 bg-white p-4">

                            <p className="text-xs font-semibold text-gray-500">
                                ORGANIZED BY
                            </p>

                            <div className="flex items-center gap-3 mt-3">

                                <img
                                    src="https://i.pinimg.com/736x/e2/7c/87/e27c8735da98ec6ccdcf12e258b26475.jpg"
                                    alt="Rizky Pratama"
                                    className="h-9 w-9 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-xs font-semibold">
                                        Rizky Pratama
                                    </p>

                                    <p className="text-[10px] text-blue-500">
                                        Bandung Go Community
                                    </p>
                                </div>

                            </div>

                        </div>

                    </aside>

                </div>


                {showJoin && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

                        <div className="w-full max-w-md rounded-lg bg-white p-6">

                            <h2 className="text-lg font-bold">
                                Join Event
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Are you sure you want to join this event?
                            </p>

                            <div className="flex justify-end gap-2 mt-5">

                                <button
                                    onClick={() => {
                                        dispatch(addCart(selectedData.selected))
                                        setShowJoin(false)
                                    }}
                                    className="rounded-md border border-gray-200 px-4 py-2 text-sm"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {

                                        dispatch(addCart(selectedData.selected))

                                        setShowJoin(false)

                                    }}
                                    className="rounded-md bg-orange-500 px-4 py-2 text-sm text-white"
                                >
                                    Confirm
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </main>
    )
}