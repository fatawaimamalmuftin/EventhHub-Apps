import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { RegisThunk, resetErrorAndMassage } from "../../Redux/slice/usersSlice"
import { useEffect, useState } from "react"
import { FaEyeSlash } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"

export default function Regis() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const usersState = useSelector(
      (state) => state.usersState
  )

  const [eyePassword, setEyePassword] = useState("close")
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState("close")
  
  const {
    handleSubmit,
    register,
    formState:{errors},
    reset
  } = useForm()

  useEffect(() => {
      if (usersState.message) {
          toast.success(usersState.message, {autoClose: 1000,onClose: () => {
            reset()
            dispatch(resetErrorAndMassage())
            navigate("/auth/login", {replace: true})
          }})
        }
      }, [usersState.message, navigate, reset, dispatch])
      
  useEffect(()=>{
    if (usersState.error) {
      toast.error(usersState.error, {autoClose: 1000})
      dispatch(resetErrorAndMassage())
    }
  },[usersState.error,dispatch])
  
  const onSubmit = async (data) => {
      dispatch(RegisThunk({
        fullname: data.fullName,
        email: data.email,
        password: data.password
      }))
  }

  return (
    <main className="flex flex-col gap-2 py-8 px-5 sm:py-10 sm:px-10 md:px-16 lg:px-20 xl:px-30">
      <div>
        <div className="text-3xl sm:text-4xl font-bold mb-2">
          Create your account
        </div>

        <div className="text-black/50 mb-5 flex flex-wrap items-center gap-2">
          Already have an account?
          <Link className="text-orangeFigma" to={"/auth/login"}>
            Sign in
          </Link>
        </div>
      </div>

      {/* Social Login */}
      <div className="veryCenter flex-col sm:flex-row gap-3 sm:gap-5 text-gray-600">
        <div className="veryCenter gap-2 myBorder w-full sm:w-auto px-5 sm:px-12 md:px-16 lg:px-22 py-3">
          <div className="text-xl font-bold">G</div>
          <div>Google</div>
        </div>

        <div className="veryCenter gap-2 myBorder w-full sm:w-auto px-5 sm:px-12 md:px-16 lg:px-22 py-3">
          <div className="text-xl font-bold">⌥</div>
          <div>GitHub</div>
        </div>
      </div>

      {/* Divider */}
      <div className="veryCenter w-full gap-3 sm:gap-5 text-gray-500">
        <div className="border w-full"></div>

        <div className="whitespace-nowrap text-sm sm:text-base">
          or continue with email
        </div>

        <div className="border w-full"></div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <label className="flex flex-col gap-2 font-semibold">
          Full name

          <input
            {...register("fullName",{
              required : "Full Name is required",
              // validate: {
              //   isName: (value,formValues) => !(value === formValues) || "Name is registered"
              // }
            })}
            type="text"
            autoComplete="name"
            className={`border-2 outline-none text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 sm:py-4 font-normal ${errors.fullName? "border-red-500":"border-white"} bg-gray-200 rounded-xl`}
            placeholder="exemple name"
          />
        </label>

         <p className="text-base sm:text-xl h-6 font-medium text-red-400"
        >{errors.fullName?.message}</p>

        {/* Email */}
        <label className="flex flex-col gap-2 font-semibold">
          Email address

          <input
            {...register("email",{
              required : "Email is required",
              validate: (value) => {
                // const dataLocal = JSON.parse(localStorage.getItem("users")||"[]")
                const isRegisted = usersState.users.some((u)=> u.email.toLowerCase() === value.toLowerCase())
                return !isRegisted || "Email is registered"
              }
            })}
            type="email"
            autoComplete="email"
            className={`border-2 outline-none text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 sm:py-4 font-normal ${errors.email? "border-red-500":"border-white"} bg-gray-200 rounded-xl`}
            placeholder="exemple@mail.com"
          />
        </label>

        <p className="text-base sm:text-xl h-6 font-medium text-red-400"
        >{errors.email?.message}</p>

        {/* Password */}
        <label className="flex flex-col gap-2 font-semibold">
          Password

          <div className={`veryCenter border-2 bg-gray-200 rounded-xl ${errors.password ? "border-red-500" : "border-white"} pr-4`}>
            <input
              {...register("password",{
                required : "Password is required",
                minLength: {
                  value: 6,
                  message: "password minimum 6 characters",
                },
              })}
              type={eyePassword === "close" ? "password" : "text"}
              autoComplete="new-password"
              className="w-full outline-none font-normal text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 sm:py-4 bg-transparent"
              placeholder="At least 6 characters"
            />

            <div
              className="text-gray-400 cursor-pointer"
              onClick={() =>
                eyePassword === "close"
                  ? setEyePassword("open")
                  : setEyePassword("close")
              }
            >
              {eyePassword === "close"
                ? <FaEyeSlash size={30}/>
                : <FaEye size={30}/>
              }
            </div>
          </div>
        </label>

        <p className="text-base sm:text-xl h-6 font-medium text-red-400" 
        >{errors.password?.message}</p>

        {/* Confirm Password */}
        <label className="flex flex-col gap-2 font-semibold">
          Confirm Password

         <div className={`veryCenter border-2 bg-gray-200 rounded-xl ${errors.confirmPassword ? "border-red-500" : "border-white"} pr-4`}>
            <input
              {...register("confirmPassword",{
                required: "Confirm Password is required",
                validate: {
                  matchPassword: (value, formValues) =>
                    value === formValues.password || "passwords are not the same",
                }
              })}
              type={eyeConfirmPassword === "close" ? "password" : "text"}
              autoComplete="new-password"
              className="w-full outline-none font-normal text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 sm:py-4 bg-transparent"
              placeholder="Re-enter your password"
            />

            <div
              className="text-gray-400 cursor-pointer"
              onClick={() =>
                eyeConfirmPassword === "close"
                  ? setEyeConfirmPassword("open")
                  : setEyeConfirmPassword("close")
              }
            >
              {eyeConfirmPassword === "close"
                ? <FaEyeSlash size={30}/>
                : <FaEye size={30}/>
              }
            </div>
          </div>
        </label>

        <p className="text-base sm:text-xl h-6 font-medium text-red-400"
          
        >{errors.confirmPassword?.message}</p>

        {/* Terms */}
        <label className="flex items-start gap-2">
          <input className="mt-1 shrink-0"
            {...register("agree",{required : "You must agree to the Terms of Service"})}
            type="checkbox"
          />

          <span className={`text-sm sm:text-base ${errors.agree && "text-red-600"}`}>
            I agree to the{" "}
            <Link className="text-orangeFigma">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link className="text-orangeFigma">
              Privacy Policy
            </Link>
          </span>
        </label>

        <p className="text-base sm:text-xl h-6 font-medium text-red-400"
        >{errors.agree?.message}</p>

        <button className="btnBordColor w-full hover:bg-green-600 font-bold py-3 sm:py-4 text-lg sm:text-xl">
          Sign in
        </button>
      </form>

      {/* Guest */}
      <div className="veryCenter flex-wrap text-center text-gray-400 gap-2">
        Just browsing?

        <Link to={"/"}>
          <span className="underline hover:text-orangeFigma">
            Continue as guest →
          </span>
        </Link>
      </div>
    </main>
  )
}