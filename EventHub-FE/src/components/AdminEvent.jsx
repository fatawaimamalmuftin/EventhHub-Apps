import { useSelector } from "react-redux"
import { FiMoreHorizontal } from "react-icons/fi"

export default function AdminEvent() {

  const events = useSelector(
    (state) => state.eventState.events
  )

  return (
    <div className="flex flex-col gap-3">

      {events.map((event) => {

        const isFull =
          event.attendees >= event.capacity

        return (
          <div
            key={event.id}
            className="myBorder rounded-xl px-3 py-2.5 flex items-center gap-4"
          >

            {/* Image */}
            <img
              src={event.image}
              alt={event.title}
              className="w-11 h-11 rounded-lg object-cover shrink-0"
            />

            {/* Event Info */}
            <div className="flex-1 min-w-0">

              <h3 className="font-medium text-sm truncate">
                {event.title}
              </h3>

              <p className="text-xs text-black/40 mt-0.5">
                {event.date} · {event.location}
              </p>

            </div>

            {/* Attendees */}
            <div className="text-xs text-black/50 whitespace-nowrap">
              {event.attendees}/{event.capacity}
            </div>

            {/* Status */}
            <span
              className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap ${
                isFull
                  ? "bg-red-100 text-red-500"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {isFull ? "Full" : "Active"}
            </span>

            {/* More */}
            <button className="text-gray-400 hover:text-gray-600">
              <FiMoreHorizontal size={18} />
            </button>

          </div>
        )

      })}

      {/* Empty */}
      {events.length === 0 && (
        <div className="py-10 text-center text-gray-400">
          No events found
        </div>
      )}

    </div>
  )
}