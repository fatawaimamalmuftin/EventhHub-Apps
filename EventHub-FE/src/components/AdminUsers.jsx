import { useState } from "react"
import { useSelector } from "react-redux"
import { FiSearch } from "react-icons/fi"
import { FiMoreHorizontal } from "react-icons/fi"

export default function AdminUsers() {

  const [search, setSearch] = useState("")

  const users = useSelector(
    (state) => state.usersState.users
  )

  const filteredUsers = users.filter((user) =>
  user.fullName?.toLowerCase().includes(search.toLowerCase()) || user.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-3">

      {/* Search */}
      <div className="relative w-full">

        <FiSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={15}
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full myBorder rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none"
        />

      </div>

      {/* Table */}
      <div className="myBorder rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-175">

            <thead>

              <tr className="text-left text-[10px] text-black/50">

                <th className="px-3 py-3 font-semibold">
                  USER
                </th>

                <th className="px-3 py-3 font-semibold">
                  ROLE
                </th>

                <th className="px-3 py-3 font-semibold">
                  STATUS
                </th>

                <th className="px-3 py-3 font-semibold">
                  JOINED
                </th>

                <th className="px-3 py-3 w-10">
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="border-t border-gray-100"
                >

                  {/* User */}
                  <td className="px-3 py-3">

                    <div>

                      <p className="text-xs font-medium">
                        {user.fullName}
                      </p>

                      <p className="text-[10px] text-black/40">
                        {user.email}
                      </p>

                    </div>

                  </td>

                  {/* Role */}
                  <td className="px-3 py-3">

                    <span
                      className={`px-2 py-1 rounded-full text-[10px] ${
                        user.role === "organizer"
                          ? "bg-orange-50 text-orangeFigma"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role || "attendee"}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="px-3 py-3">

                    <span
                      className={`px-2 py-1 rounded-full text-[10px] ${
                        user.status === "suspended"
                          ? "bg-red-100 text-red-500"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {user.status || "active"}
                    </span>

                  </td>

                  {/* Joined */}
                  <td className="px-3 py-3 text-[10px] text-black/40">

                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric"
                          }
                        )
                      : "-"
                    }

                  </td>

                  {/* Action */}
                  <td className="px-3 py-3 text-right">

                    <button className="text-gray-400 hover:text-black">

                      <FiMoreHorizontal size={15}/>

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Empty */}
        {filteredUsers.length === 0 && (

          <div className="py-10 text-center text-sm text-gray-400">
            No users found
          </div>

        )}

      </div>

    </div>
  )
}