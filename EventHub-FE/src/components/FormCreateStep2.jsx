export default function FormCreateStep2({ page2, register, errors }) {
  return (
    page2 && (
      <div className="w-full px-25 py-8">
        <div className="mb-7">
          <h2 className="text-2xl font-bold">
            Date, Location & Capacity
          </h2>
          <p className="text-gray-500">
            When and where is your event?
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-gray-700">
              Event Date
            </label>

            <input
              type="date"
              {...register("eventDate", {
                required: "Event date is required"
              })}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none focus:border-orangeFigma"
            />

            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-500">
                {errors.eventDate.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-gray-700">
                Start Time
              </label>

              <input
                type="time"
                {...register("startTime", {
                  required: "Start time is required"
                })}
                className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none focus:border-orangeFigma"
              />

              {errors.startTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                End Time
              </label>

              <input
                type="time"
                {...register("endTime", {
                  required: "End time is required"
                })}
                className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none focus:border-orangeFigma"
              />

              {errors.endTime && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Event Format
            </label>

            <div className="flex w-fit p-1 bg-gray-100 rounded-lg">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="in_person"
                  {...register("eventFormat", {
                    required: "Event format is required"
                  })}
                  className="hidden peer"
                />

                <div className="px-5 py-2 rounded-lg peer-checked:bg-white peer-checked:shadow-sm">
                  📍 In Person
                </div>
              </label>

              <label className="cursor-pointer">
                <input
                  type="radio"
                  value="online"
                  {...register("eventFormat", {
                    required: "Event format is required"
                  })}
                  className="hidden peer"
                />

                <div className="px-5 py-2 rounded-lg text-gray-500 peer-checked:bg-white peer-checked:shadow-sm">
                  🖥️ Online
                </div>
              </label>
            </div>

            {errors.eventFormat && (
              <p className="mt-1 text-sm text-red-500">
                {errors.eventFormat.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Location
            </label>

            <input
              type="text"
              placeholder="Bandung, West Java"
              {...register("location", {
                required: "Location is required"
              })}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-orangeFigma"
            />

            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Capacity
            </label>

            <input
              type="number"
              placeholder="100"
              {...register("capacity", {
                required: "Capacity is required"
              })}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-orangeFigma"
            />

            {errors.capacity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.capacity.message}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}