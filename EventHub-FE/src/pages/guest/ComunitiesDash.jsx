import ComDashCardHead from "../../lib/dummyComDash.jsx";
import { LuPencilLine } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { FaSignal } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import dataChart from "../../lib/dataChart.js";
import chartOptions from "../../lib/chartOptions.js";
import { Link } from "react-router";
import { useSelector } from "react-redux";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
)

export default function ComunitiesDash() {

    const Events = useSelector(
        (state) => state.eventState.events
    )

  return (
    <>
        <header className="veryCenter justify-between px-18 py-10">
            <div>
                <div className="text-3xl font-bold">Organizer Dashboard</div>
                <div className="text-gray-500">
                    Manage your events and track performance.
                </div>
            </div>

            <div>
                <Link 
                    to="/createEvent" 
                    className="veryCenter gap-2 btnBordColor hover:hover"
                > 
                    <FaPlus />
                    Create Event
                </Link>
            </div>
        </header>


        <section className="grid grid-cols-4 gap-8 px-18">
            {ComDashCardHead.map((e,i)=>(
                <div 
                    key={i} 
                    className="flex flex-col w-full text-gray-500 text-2xl myBorder px-8 py-5 gap-2"
                >
                    <div className="flex justify-between">
                        <div>{e.title}</div>
                        <div>{e.iconCom}</div>
                    </div>

                    <div className="text-3xl font-bold text-black/70">
                        {e.value}
                    </div>

                    <div>
                        {e.desk}
                    </div>
                </div>
            ))}
        </section>


        <main className="grid grid-cols-[60%_40%] gap-8 px-18 py-10">

            <div>

                <div className="text-3xl font-bold">
                    Your Events
                </div>


                <div>

                    {Events.map((e,i)=>{

                        const attendees = e.attendees || 0
                        const capacity = Number(e.capacity) || 0

                        return (
                            <div 
                                key={e.id || i} 
                                className="grid mt-5 grid-cols-[15%_80%] px-5 py-5 myBorder gap-5"
                            >

                                <div className="rounded-xl overflow-hidden">
                                    <img 
                                        src={e.coverImage || e.image} 
                                        alt={e.eventTitle || e.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>


                                <div className="flex flex-col gap-2">

                                    <div className="veryCenter justify-between">

                                        <div>
                                            {e.eventTitle || e.title}
                                        </div>

                                        <div>
                                            Active
                                        </div>

                                    </div>


                                    <div>
                                        {e.eventDate || e.date} · {e.location}
                                    </div>


                                    <div className="veryCenter justify-between">

                                        <div>
                                            {attendees} attendees
                                        </div>

                                        <div>
                                            {capacity} capacity
                                        </div>

                                    </div>


                                    <div className="h-2 rounded-full bg-gray-100">

                                        <div 
                                            className="h-2 rounded-full bg-green-500"
                                            style={{
                                                width: capacity
                                                    ? `${(attendees / capacity) * 100}%`
                                                    : "0%"
                                            }}
                                        />

                                    </div>


                                    <div className="flex gap-5">

                                        <button className="veryCenter myBorder hover:hover">
                                            <LuPencilLine />
                                            Edit
                                        </button>

                                        <div className="veryCenter gap-2">
                                            <FaRegEye />
                                            {attendees} attendees
                                        </div>

                                    </div>

                                </div>

                            </div>
                        )

                    })}

                </div>

            </div>


            <div className="grid grid-rows-[30%_16%_18%] max-h-285 gap-5">

                <div className="myBorder">

                    <h3 className="flex items-center gap-2 font-bold text-xl">
                        <FaSignal />
                        Registrations (6 months)
                    </h3>

                    <div className="h-64 mt-5">
                        <Bar 
                            data={dataChart} 
                            options={chartOptions}
                        />
                    </div>

                </div>


                <div className="myBorder">

                    <h3 className="font-bold text-xl">
                        Quick Actions
                    </h3>

                    <div className="flex flex-col justify-center gap-5 mt-5">

                        <Link
                            to="/createEvent"
                            className="veryCenter gap-2 btnBordColor hover:hover"
                        >
                            <FaPlus /> 
                            Create New Event
                        </Link>

                        <button className="veryCenter gap-2 myBorder hover:hover">
                            <FaRegEye /> 
                            Preview as Attendee
                        </button>

                    </div>

                </div>


                <div className="myBorder flex flex-col gap-5">

                    <h3 className="font-bold text-xl">
                        Upcoming Events
                    </h3>


                    <div className="flex items-center gap-5">

                        <div className="bg-green-500 rounded-full h-4 w-4"/>

                        <div>
                            <div>
                                <div className="font-bold">
                                    Go Concurrency Workshop
                                </div>

                                <div className="text-gray-500">
                                    Aug 22, 2026
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto">
                            48/100
                        </div>

                    </div>


                    <div className="flex items-center gap-5">

                        <div className="bg-green-500 rounded-full h-4 w-4"/>

                        <div>
                            <div>
                                <div className="font-bold">
                                    Kubernetes Workshop
                                </div>

                                <div className="text-gray-500">
                                    Sep 12, 2026
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto">
                            55/80
                        </div>

                    </div>

                </div>

            </div>

        </main>
    </>
  )
}