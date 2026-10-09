import { useEffect, useState } from "react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";

const letters = [
  "k", "v", "n", "z", "i", "x", "m", "e", "t", "a",
  "x", "l",
  "4", "0", "4",
  "y", "y", "w", "v", "b", "o", "q", "d", "y", "p", "a",
  "p", "a", "g", "e",
  "v", "j", "a",
  "n", "o", "t",
  "s", "c", "e", "w", "v", "x", "e", "p", "c", "f", "h", "q", "e",
  "f", "o", "u", "n", "d",
  "s", "w", "q", "v", "o", "s", "m", "v", "f", "u"
];

const selectedIndexes = [
  12, 13, 14,
  26, 27, 28, 29,
  33, 34, 35,
  49, 50, 51, 52, 53
];

export default function NotFound() {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    selectedIndexes.forEach((index, i) => {
      setTimeout(() => {
        setSelected((prev) => [...prev, index]);
      }, 1000 + i * 500);
    });
  }, []);

  return (
    <>
    <Navbar/>
      <main className="min-h-screen bg-orangeFigma px-6 py-10 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center">
          <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

            <div className="mx-auto grid w-full max-w-xl grid-cols-8 gap-1 lg:mx-0 lg:w-[45%]">
              {letters.map((letter, index) => (
                <div
                  key={index}
                  className={`aspect-square flex items-center justify-center bg-black/20 text-lg font-light uppercase text-white/70 transition-colors duration-700 sm:text-2xl ${
                    selected.includes(index)
                      ? "bg-orangeFigma font-normal text-white"
                      : ""
                  }`}
                >
                  {letter}
                </div>
              ))}
            </div>

            <div className="w-full lg:w-[45%]">
              <h1 className="mb-8 text-3xl font-normal leading-tight sm:text-4xl lg:text-[42px]">
                We couldn't find what you were looking for.
              </h1>

              <div className="space-y-5 text-base font-light leading-7 text-white/90 sm:text-lg">
                <p>
                  Unfortunately the page you were looking for could not be
                  found. It may be temporarily unavailable, moved or no longer
                  exist.
                </p>

                <p>
                  Check the URL you entered for any mistakes and try again.
                  Alternatively, take a look around the rest of our site.
                </p>
              </div>

                <Link
                  to="/"
                  className="flex justify-center mt-5 items-center bg-black/20 px-4 py-2.5 font-bold text-2xl text-white transition-colors w-full duration-300 rounded-2xl hover:bg-white hover:text-orangeFigma"
                >
                  Home
                </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}