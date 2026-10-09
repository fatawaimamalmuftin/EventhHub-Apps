import { useContext, useState } from "react";
import createEventContext from "../context/createEvent/CreateEventContex.js";

export default function FormCreateStep3({ page3 }) {
  const { eventData, setEventData } = useContext(createEventContext)

  const [speaker, setSpeaker] = useState("")

  function addSpeaker() {
    if (!speaker) return

    setEventData((prev) => ({
        ...prev,
        speakers: [
            ...prev.speakers,
            speaker
        ]
    }))

    setSpeaker("")
}

  return (
    page3 && (
      <div className="w-full px-25 py-8">
        <div className="mb-7">
          <h2 className="text-2xl font-bold">Speakers & Review</h2>
          <p className="text-gray-500">Add speakers and confirm your event details.</p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-gray-700">
              Speakers <span className="text-gray-400">(optional)</span>
            </label>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Speaker name and title"
                value={speaker}
                onChange={(e) => setSpeaker(e.target.value)}
                className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-orangeFigma"
              />

              <button
                type="button"
                onClick={addSpeaker}
                className="px-5 py-2 border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                Add
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              {eventData.speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {speaker}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Title</span>
              <span>{eventData.eventTitle}</span>
            </div>

            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Category</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                {eventData.category}
              </span>
            </div>

            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Date</span>
              <span>{eventData.eventDate}</span>
            </div>

            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Time</span>
              <span>{eventData.startTime} - {eventData.endTime} WIB</span>
            </div>

            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Format</span>
              <span>{eventData.eventFormat}</span>
            </div>

            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Location</span>
              <span>{eventData.location}</span>
            </div>

            <div className="flex justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-gray-500">Capacity</span>
              <span>{eventData.capacity} attendees</span>
            </div>

            <div className="flex justify-between px-4 py-4">
              <span className="text-gray-500">Speakers</span>
              <span>{eventData.speakers.length} added</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}