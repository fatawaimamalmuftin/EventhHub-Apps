import bookmark from "../../assets/bookmark.svg"
import { useState } from "react"
import { useSelector } from "react-redux"
import CardEvent from "../../components/CardEvent.jsx"

export default function MyEvents() {

    const [tab, setTab] = useState("upcoming")

    const userLogind = useSelector(
        (state) => state.userState.user
    )

    const cart = userLogind?.cart || []

    let title = "No upcoming events"
    let description = "Events you join will appear here."

    if (tab === "past") {
        title = "No past events"
        description = "Your past events will appear here."
    }

    if (tab === "saved") {
        title = "No saved events"
        description = "Bookmark events you're interested in."
    }

    return (
        <main>

            <section className="mainEvent">

                <h1 className="text-xl font-semibold mb-4">
                    My Events
                </h1>

                <div className="flex gap-6 border-b-2 border-borderClr">

                    <button
                        type="button"
                        onClick={() => setTab("upcoming")}
                        className={`pb-3 text-sm ${
                            tab === "upcoming"
                                ? "text-orangeFigma border-b-2 border-orangeFigma hover:hover"
                                : "text-gray-500 hover:hover"
                        }`}
                    >
                        Upcoming ({cart.length})
                    </button>

                    <button
                        type="button"
                        onClick={() => setTab("past")}
                        className={`pb-3 text-sm ${
                            tab === "past"
                                ? "text-orangeFigma border-b-2 border-orangeFigma hover:hover"
                                : "text-gray-500 hover:hover"
                        }`}
                    >
                        Past (0)
                    </button>

                    <button
                        type="button"
                        onClick={() => setTab("saved")}
                        className={`pb-3 text-sm ${
                            tab === "saved"
                                ? "text-orangeFigma border-b-2 border-orangeFigma hover:hover"
                                : "text-gray-500 hover:hover"
                        }`}
                    >
                        Saved (0)
                    </button>

                </div>

            </section>

            {tab === "upcoming" && cart.length > 0 ? (

                <section className="mainEvent grid grid-cols-3 gap-3">

                    {cart.map((event) => (
                        <CardEvent
                            key={event.id}
                            event={event}
                        />
                    ))}

                </section>

            ) : (

                <section className="veryCenter flex-col py-20 gap-4">

                    <img
                        src={bookmark}
                        alt="bookmark"
                        className="w-10 h-10 opacity-50"
                    />

                    <div className="text-center">

                        <h2 className="font-semibold">
                            {title}
                        </h2>

                        <p className="text-sm text-gray-400 mt-1">
                            {description}
                        </p>

                    </div>

                </section>

            )}

        </main>
    )
}