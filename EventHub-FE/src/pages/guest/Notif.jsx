import {FiCalendar,FiBell,FiUsers,FiSend,FiMessageSquare} from 'react-icons/fi'

import dummyNotification from '../../lib/dummyNotif.js'

export default function Notif() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div className="border-b border-gray-200 bg-white">

                <div className="mx-auto max-w-xl px-4 py-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <div className="flex items-center gap-2">

                                <h1 className="text-xl font-bold text-gray-800">
                                    Notifications
                                </h1>

                                <span className="rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold text-white">
                                    3
                                </span>

                            </div>

                            <p className="mt-1 text-xs text-gray-400">
                                Stay up to date with your events and communities.
                            </p>
                        </div>

                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50">
                            <FiSend />
                            Mark all as read
                        </button>

                    </div>


                    {/* FILTER */}
                    <div className="mt-4 flex gap-2">

                        <button className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-medium text-white">
                            All
                        </button>

                        <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs text-gray-600">
                            Unread (3)
                        </button>

                    </div>

                </div>

            </div>


            {/* NOTIFICATION LIST */}
            <div className="mx-auto max-w-xl px-4 py-5">

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    {dummyNotification.map((notification) => {

                        let icon = <FiBell />
                        let iconClass = 'bg-green-100 text-green-500'

                        if (notification.type === 'event') {
                            icon = <FiCalendar />
                            iconClass = 'bg-yellow-100 text-yellow-500'
                        }

                        if (notification.type === 'community') {
                            icon = <FiUsers />
                            iconClass = 'bg-blue-100 text-blue-500'
                        }

                        if (notification.type === 'update') {
                            icon = <FiSend />
                            iconClass = 'bg-red-100 text-red-500'
                        }

                        if (notification.type === 'message') {
                            icon = <FiMessageSquare />
                            iconClass = 'bg-purple-100 text-purple-500'
                        }

                        return (

                            <div
                                key={notification.id}
                                className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0"
                            >

                                {/* ICON */}
                                <div
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
                                >
                                    {icon}
                                </div>


                                {/* CONTENT */}
                                <div className="min-w-0 flex-1">

                                    <div className="flex items-center justify-between gap-3">

                                        <h2 className="truncate text-xs font-semibold text-gray-800">
                                            {notification.title}
                                        </h2>

                                        <span className="shrink-0 text-[10px] text-gray-400">
                                            {notification.time}
                                        </span>

                                    </div>

                                    <p className="mt-1 text-[10px] text-gray-400">
                                        {notification.description}
                                    </p>

                                </div>


                                {/* UNREAD */}
                                {notification.unread && (
                                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"></div>
                                )}

                            </div>

                        )
                    })}

                </div>

            </div>

        </main>
    )
}