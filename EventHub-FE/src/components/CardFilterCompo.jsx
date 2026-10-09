export default function CardFilterCompo({
    show,
    category,
    setCategory,
    locations,
    setLocations,
    setSortBy,
}) {
    const Category = show[0].Category
    const Location = show[1].Location
    const SortBy = show[2].SortBy

    return (
        <main className="grid grid-cols-2 gap-6 mt-5 border-b-2 border-gray-200 px-10 py-6">

            <div className="col-span-full flex flex-col gap-3">
                <div className="font-semibold text-gray-500 uppercase">
                    Category
                </div>

                <div className="flex gap-3 flex-wrap">
                    {Category.map((e, i) => (
                        <label
                            key={i}
                            className="cursor-pointer"
                        >
                            <input
                                checked={category === (e === "All" ? "" : e)}
                                className="peer sr-only"
                                type="radio"
                                name="category"
                                value={e === "All" ? "" : e}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                            />

                            <span className="block px-4 py-2 myBorder whitespace-nowrap hover:btnBordColor peer-checked:bg-orangeFigma peer-checked:text-white">
                                {e}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="font-semibold text-gray-500 uppercase">
                    Location
                </div>

                <div className="flex gap-3 flex-wrap">
                    {Location.map((e, i) => (
                        <label
                            key={i}
                            className="cursor-pointer"
                        >
                            <input
                                checked={locations === (e === "All Location" ? "" : e)}
                                className="peer sr-only"
                                type="radio"
                                name="location"
                                value={e === "All Location" ? "" : e}
                                onChange={(e) =>
                                    setLocations(e.target.value)
                                }
                            />

                            <span className="block px-4 py-2 myBorder whitespace-nowrap hover:btnBordColor peer-checked:bg-orangeFigma peer-checked:text-white">
                                {e}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="font-semibold text-gray-500 uppercase">
                    Sort By
                </div>

                <div className="flex gap-3 flex-wrap">
                    {SortBy.map((e, i) => (
                        <label
                            key={i}
                            className="cursor-pointer"
                        >
                            <input
                                className="peer sr-only"
                                type="radio"
                                name="sortBy"
                                value={e}
                                onChange={(e) =>
                                    setSortBy(e.target.value)
                                }
                            />

                            <span className="block px-4 py-2 myBorder whitespace-nowrap hover:btnBordColor peer-checked:bg-orangeFigma peer-checked:text-white">
                                {e}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

        </main>
    )
}