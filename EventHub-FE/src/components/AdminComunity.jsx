import Comunity from "../lib/dummyComunity"

export default function AdminComunity() {

  return (
    <div className="flex flex-col gap-2.5">

      {Comunity.map((item) => (

        <div
          key={item.id}
          className="myBorder rounded-xl px-3.5 py-2.5 flex items-center gap-3"
        >

          {/* Image */}
          {item.image ? (

            <img
              src={item.image}
              alt={item.title}
              className="w-9 h-9 rounded-lg object-cover shrink-0"
            />

          ) : (

            <div className="w-9 h-9 rounded-lg bg-gray-200 shrink-0">
            </div>

          )}

          {/* Community Info */}
          <div className="flex-1 min-w-0">

            <p className="text-sm font-medium truncate">
              {item.title}
            </p>

            <p className="text-xs text-black/40">
              {item.members.toLocaleString()} members · {item.upcoming} upcoming events
            </p>

          </div>

          {/* Status */}
          <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs shrink-0">
            Active
          </span>

          {/* More */}
          <button className="text-gray-400 text-sm px-1">
            ···
          </button>

        </div>

      ))}

    </div>
  )
}