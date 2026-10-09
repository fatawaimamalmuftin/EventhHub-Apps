import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { changePassword } from "../../Redux/slice/usersSlice"
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

export default function Forgot() {
  const dispatch = useDispatch()

  const users = useSelector(
    (state) => state.usersState.users
  )

  const [stage1, setStage1] = useState(true)
  const [stage2, setStage2] = useState(false)
  const [userFound, setUserFound] = useState(null)
  const [eye, setEye] = useState("close")

  const {
    register,
    formState:{errors},
    handleSubmit,
    reset,
    setError
  } = useForm()

 const onSubmit = (data) => {
      if (stage1) {
          const result = users.find((e) => {
              return e.email.toLowerCase() === data.email.toLowerCase()
          })

          if (result) {
              setUserFound({id: result.id})
              setStage2(true)
              setStage1(false)
              reset()
          } else {
              setError("email", {
                  type: "manual",
                  message: "Email is not registered."
              })
          }

          return
      }

      if (stage2) {
        if (!userFound) return
        const updatedUser = { ...userFound, password: data.password }
        dispatch(changePassword(updatedUser))
        reset()
        setStage2(false)
      }
  }

  return (
    (stage1 || stage2) ? (
      <main className="flex flex-col gap-2 py-6 px-4 sm:py-8 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        <div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Reset your password
          </div>

          <div className="text-sm sm:text-base md:text-lg text-black/50 mb-5 flex items-center gap-2">
            Enter your email and we'll send a link.
          </div>
        </div>

        <form
          className="w-full flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >

          {stage1 && (
            <>
              <label className="flex flex-col gap-2 font-semibold text-sm sm:text-base md:text-lg">
                Email address
                <input
                  {...register("email", {
                    required: "Enter your email to check activity."
                  })}
                  type="email"
                  autoComplete="email"
                  className={`w-full border-2 outline-none text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 font-normal bg-gray-200 rounded-xl ${
                    errors.email ? "border-red-500" : "border-white"
                  }`}
                  placeholder="exemple@mail.com"
                />
              </label>

              <p className="text-sm sm:text-base md:text-lg h-6 font-medium text-red-400">
                {errors.email?.message}
              </p>
            </>
          )}

          {stage2 && (
            <>
              <label
                className="flex flex-col gap-2 font-semibold text-sm sm:text-base md:text-lg"
                htmlFor="password"
              >
                Change Password
              </label>

              <div
                className={`veryCenter w-full border-2 bg-gray-200 rounded-xl ${
                  errors.password ? "border-red-500" : "border-white"
                } pr-3 sm:pr-4`}
              >
                <input
                  {...register("password", {
                    required: "Enter a new password.",
                    minLength: {
                      value: 6,
                      message: "password minimum 6 characters"
                    }
                  })}
                  type={eye === "close" ? "password" : "text"}
                  autoComplete="password"
                  className="w-full min-w-0 outline-none text-sm sm:text-base md:text-lg px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 font-normal bg-transparent"
                  placeholder="Input here . . ."
                />

                <div
                  className="shrink-0 text-gray-400 cursor-pointer"
                  onClick={() =>
                    eye === "close"
                      ? setEye("open")
                      : setEye("close")
                  }
                >
                  {eye === "close"
                    ? <FaEyeSlash size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    : <FaEye size={22} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
                  }
                </div>
              </div>

              <p className="text-sm sm:text-base md:text-lg h-6 font-medium text-red-400">
                {errors.password?.message}
              </p>
            </>
          )}

          <button className="btnBordColor w-full hover:hover font-bold py-3 sm:py-3.5 md:py-4 text-base sm:text-lg md:text-xl">
            {stage1 ? "Continue" : "Change Password"}
          </button>
        </form>
      </main>
    ) : (
      <main className="w-full min-h-full px-4 py-10 veryCenter flex-col gap-5 font-bold text-center">

        <div className="text-2xl sm:text-3xl rounded-full bg-green-200 text-green-500 p-4 sm:p-5">
          <FaCheck size={40} className="sm:w-12 sm:h-12" />
        </div>

        <div className="text-xl sm:text-2xl">
          Password has changed
        </div>

        <Link
          className="font-normal text-base sm:text-lg text-orangeFigma hover:hover px-2 py-1"
          to="/login"
        >
          Back to sign in
        </Link>
      </main>
    )
  )
}