import { useSelector } from "react-redux"
import { CiCalendar } from "react-icons/ci"
import { FiUsers } from "react-icons/fi"
import { FiFlag } from "react-icons/fi"
import Comunity from "../lib/dummyComunity"
import activity from "../lib/activity"

export default function AdminOverview() {

  const users = useSelector(
    (state) => state.usersState.users
  )

  const events = useSelector(
    (state) => state.eventState.events
  )

  const cardData = [
    {
      title: "TOTAL USERS",
      value: users.length.toLocaleString(),
      desk: "+284 this month",
      icon: <FiUsers />
    },
    {
      title: "TOTAL EVENTS",
      value: events.length,
      desk: "8 upcoming",
      icon: <CiCalendar />
    },
    {
      title: "COMMUNITIES",
      value: Comunity.length,
      desk: "All active",
      icon: <FiUsers />
    },
    {
      title: "AVG FILL RATE",
      value: "74%",
      desk: "Across all events",
      icon: <FiFlag />
    }
  ]

  return (
    <div className="flex flex-col gap-5">

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">

        {cardData.map((item, index) => (

          <div
            key={index}
            className="myBorder rounded-xl px-4 py-4 h-26 flex flex-col justify-between bg-white"
          >

            <div className="flex items-center justify-between">

              <p className="text-[11px] text-black/50">
                {item.title}
              </p>

              <div className="text-gray-400 text-base">
                {item.icon}
              </div>

            </div>

            <div>

              <h2 className="text-2xl font-bold leading-none">
                {item.value}
              </h2>

              <p className="text-[11px] text-black/45 mt-1">
                {item.desk}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Recent Platform Activity */}
      <div className="myBorder rounded-xl px-4 py-4 bg-white">

        <h2 className="text-xs font-bold mb-3">
          Recent Platform Activity
        </h2>

        <div className="flex flex-col">

          {activity.map((item, index) => (

            <div
              key={index}
              className="flex items-center gap-3 py-1.5"
            >

              <div className={`${item.color} text-sm shrink-0`}>
                {item.icon}
              </div>

              <p className="text-xs text-black/60 flex-1">
                {item.text}
              </p>

              <span className="text-[10px] text-black/40 whitespace-nowrap">
                {item.time}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}