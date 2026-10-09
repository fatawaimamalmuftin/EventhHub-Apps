import { useContext } from 'react'
import bookmark from '../assets/bookmark.svg'
import calendar from '../assets/calender.svg'
import location from '../assets/location.svg'
import users from '../assets/users.svg'
import selectedContext from '../context/selected/selectedContext'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, removeCart } from '../Redux/slice/userSlice.js'

export default function CardEvent({ event, isShow, setShowDetail }) {

  const userLogind = useSelector(
    (state) => state.userState.user
  )

  const dispatch = useDispatch()

  const isRegistered = userLogind?.cart?.some(
    (item) => item.id === event.id
  )

  const selectItem = useContext(selectedContext)

  const image = event.image || event.coverImage || ""
  const title = event.title || event.eventTitle || ""
  const categories = event.categories || event.category || []
  const date = event.date || event.eventDate || ""
  const time = event.time || `${event.startTime || ""} - ${event.endTime || ""}`
  const eventLocation = event.location || ""
  const attendees = event.attendees || 0
  const capacity = event.capacity || 0

  return (
    <div
      onClick={(e) => {
        e.preventDefault()

        selectItem.setSelected({
          id: event.id,
          image: image,
          title: title,
          categories: categories,
          date: date,
          time: time,
          location: eventLocation,
          attendees: attendees,
          capacity: capacity
        })

        setShowDetail(true)
      }}
      className="w-full max-w-md overflow-hidden rounded-2xl bg-white border-borderClr border-2 transition duration-300 hover:-translate-y-2"
    >

      <div className="relative">

        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover"
        />

        <div className="absolute bottom-4 left-4 flex gap-2">

          {Array.isArray(categories) &&
            categories.map((category, i) => (
              <span
                key={i}
                className="rounded-full bg-black/20 px-3 py-1 text-sm text-white"
              >
                {category}
              </span>
            ))
          }

        </div>

      </div>

      <div className="p-5">

        <h2 className="mb-4 text-xl font-semibold">
          {title}
        </h2>

        <div className="mb-3 flex items-center gap-2 text-gray-500">
          <img
            alt="calendar"
            src={calendar}
            className="h-5 w-5"
          />

          <p>
            {date} · {time}
          </p>
        </div>

        <div className="mb-3 flex items-center gap-2 text-gray-500">
          <img
            alt="location"
            src={location}
            className="h-5 w-5"
          />

          <p>
            {eventLocation}
          </p>
        </div>

        <div className="mb-5 flex items-center gap-2 text-gray-500">
          <img
            alt="users"
            src={users}
            className="h-5 w-5"
          />

          <p>
            {attendees} / {capacity} attendees
          </p>
        </div>

        <div className="mb-5">

          <div className="mb-2 flex justify-between text-gray-500">
            <p>{attendees} attendees</p>
            <p>{capacity} capacity</p>
          </div>

          <div className="h-2 rounded-full bg-gray-100">

            <div
              className="h-2 rounded-full bg-green-500"
              style={{
                width: capacity
                  ? `${(attendees / capacity) * 100}%`
                  : "0%"
              }}
            ></div>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            className={`w-full hover:hover ${
              isRegistered
                ? "bg-green-500 text-white border-green-500 rounded-2xl"
                : "btnBordColor"
            }`}
            onClick={(e) => {

              e.stopPropagation()

              if (!userLogind) {
                isShow(true)
                return
              }

              if (isRegistered) {
                dispatch(removeCart(event.id))
                return
              }

              dispatch(addCart(event))

            }}
          >
            {isRegistered ? "✓ Registered" : "Join Event"}
          </button>

          <button
            className="flex h-12 w-12 items-center justify-center rounded-xl border hover:bg-green-400 cursor-pointer"
          >
            <img
              src={bookmark}
              className="h-5 w-5"
            />
          </button>

        </div>

      </div>

    </div>
  )
}