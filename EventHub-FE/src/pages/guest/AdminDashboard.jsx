import { useState } from "react"
import { FiShield } from "react-icons/fi"
import { HiOutlineUsers } from "react-icons/hi"
import { CiCalendar } from "react-icons/ci"
import { FiUsers } from "react-icons/fi"

import AdminOverview from "../../components/AdminOverview"
import AdminUsers from "../../components/AdminUsers"
import AdminEvent from "../../components/AdminEvent"
import AdminComunity from "../../components/AdminComunity"

export default function AdminDashboard() {

  const [tab, setTab] = useState("overview")

  return (
    <main className="px-5 sm:px-10 lg:px-14 xl:px-16 py-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-7">

        <div className="veryCenter w-10 h-10 rounded-xl bg-orange-50 text-orangeFigma shrink-0">
          <FiShield size={19}/>
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-xs text-black/45">
            Platform management and moderation
          </p>

        </div>

      </div>

      {/* Tabs */}
      <div className="flex items-center gap-7 border-b border-gray-200 mb-5">

        <button
          onClick={() => setTab("overview")}
          className={`cursor-pointer hover:hover py-2 px-4 flex items-center gap-2 pb-3 text-xs ${
            tab === "overview"
              ? "text-orangeFigma border-b border-orangeFigma"
              : "text-gray-500"
          }`}
        >
          <FiShield size={14}/>
          Overview
        </button>

        <button
          onClick={() => setTab("users")}
          className={`cursor-pointer hover:hover py-2 px-4 flex items-center gap-2 pb-3 text-xs ${
            tab === "users"
              ? "text-orangeFigma border-b border-orangeFigma"
              : "text-gray-500"
          }`}
        >
          <HiOutlineUsers size={14}/>
          Users
        </button>

        <button
          onClick={() => setTab("events")}
          className={`cursor-pointer hover:hover py-2 px-4 flex items-center gap-2 pb-3 text-xs ${
            tab === "events"
              ? "text-orangeFigma border-b border-orangeFigma"
              : "text-gray-500"
          }`}
        >
          <CiCalendar size={15}/>
          Events
        </button>

        <button
          onClick={() => setTab("communities")}
          className={`cursor-pointer hover:hover py-2 px-4 flex items-center gap-2 pb-3 text-xs ${
            tab === "communities"
              ? "text-orangeFigma border-b border-orangeFigma"
              : "text-gray-500"
          }`}
        >
          <FiUsers size={14}/>
          Communities
        </button>

      </div>

      {/* Content */}
      <div>

        {tab === "overview" && <AdminOverview/>}

        {tab === "users" && <AdminUsers/>}

        {tab === "events" && <AdminEvent/>}

        {tab === "communities" && <AdminComunity/>}

      </div>

    </main>
  )
}