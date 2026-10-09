import { useState } from "react";

export default function FormCreateStep1({ page1, register, errors, setCoverImage}) {
  const [preview, setPreview] = useState("");

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setCoverImage(reader.result)
    };

    reader.readAsDataURL(file);
  }

  return (
    page1 && (
      <div className="w-full px-25 py-8">
        <div className="mb-7">
          <h2 className="text-2xl font-bold">
            Basic Information
          </h2>

          <p className="text-gray-500">
            Tell attendees what your event is about.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 text-gray-700">
              Cover Image
            </label>

            <label className="w-full h-38 border-2 border-dashed border-gray-200 rounded-xl veryCenter flex-col gap-2 cursor-pointer overflow-hidden">

              {preview ? (
                <img
                  src={preview}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="text-3xl text-gray-400">
                    ⇧
                  </div>

                  <p className="text-gray-400">
                    Click to upload or drag and drop
                  </p>

                  <p className="text-sm text-gray-400">
                    PNG, JPG up to 10MB · 16:9 recommended
                  </p>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                {...register("coverImage")}
                onChange={handleImage}
                className="hidden"
              />
            </label>

            {errors.coverImage && (
              <p className="mt-1 text-sm text-red-500">
                {errors.coverImage.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Event Title
            </label>

            <input
              type="text"
              placeholder="Go Concurrency Workshop"
              {...register("eventTitle", {
                required: "Event title is required"
              })}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none placeholder:text-gray-400 focus:border-orangeFigma"
            />

            {errors.eventTitle && (
              <p className="mt-1 text-sm text-red-500">
                {errors.eventTitle.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Description
            </label>

            <textarea
              placeholder="What will attendees learn or experience?"
              {...register("description", {
                required: "Description is required"
              })}
              className="w-full h-32 px-3 py-3 border border-gray-200 rounded-lg outline-none resize-none placeholder:text-gray-400 focus:border-orangeFigma"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Category
            </label>

            <select
              {...register("category", {
                required: "Category is required"
              })}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none focus:border-orangeFigma"
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Career">Career</option>
              <option value="Ai">Ai</option>
              <option value="Programming">Programming</option>
              <option value="Music">Music</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Community <span className="text-gray-400">(optional)</span>
            </label>

            <select
              {...register("community")}
              className="w-full px-3 py-3 border border-gray-200 rounded-lg outline-none focus:border-orangeFigma"
            >
              <option value="">No community</option>
              <option value="koda">Koda Academy</option>
              <option value="developer">Developer Community</option>
              <option value="tech">Tech Community</option>
            </select>
          </div>
        </div>
      </div>
    )
  );
}