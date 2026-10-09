import { Link,useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { FaEyeSlash } from "react-icons/fa6"
import { FaEye } from "react-icons/fa"
import { useEffect, useState } from "react"
import { LoginThunk, resetErrorAndMassage } from "../../Redux/slice/usersSlice.js"

export default function Login() {
  const dispatch = useDispatch()

  const usersState = useSelector(
    (state) => state.usersState
  )

  const [eye, setEye] = useState("close")

  const {
    handleSubmit,
    register,
    formState:{errors},
    reset,
    setError
  } = useForm()

  const navigate = useNavigate()

  useEffect(() => {
    if (usersState.message) {
      toast.success(usersState.message, {autoClose: 1000,onClose: () => {
        reset()
        dispatch(resetErrorAndMassage())
        navigate("/", {replace: true})
      }})
    }
  }, [usersState.message, navigate, reset, dispatch])
        
  useEffect(()=>{
    if (usersState.error) {
      toast.error(usersState.error, {autoClose: 1000})

      setError("email", {type:"server", message: usersState.error})

      setError("password", {type:"server", message: usersState.error})

      dispatch(resetErrorAndMassage())
    }
  },[usersState.error,dispatch,setError])

  const onSubmit = (data) => {
    if(data.email === import.meta.env.VITE_USERNAME && data.password === import.meta.env.VITE_PASSWORD){
      
      data.images = "https://i.pinimg.com/736x/19/ad/7e/19ad7edff92d85bf46b28cebd129060b.jpg"

      localStorage.setItem("admin",JSON.stringify(data))

      navigate('/')
      return
    }

    if(data.email === import.meta.env.VITE_COM_USERNAME && data.password === import.meta.env.VITE_COM_PASSWORD){
      
      data.images = "https://i.pinimg.com/736x/19/ad/7e/19ad7edff92d85bf46b28cebd129060b.jpg"

      localStorage.setItem("comunities",JSON.stringify(data))

      navigate('/')
      return
    }

    dispatch(LoginThunk({
      email: data.email,
      password: data.password
    }))
    
    // const isLogind = usersState.users.find((e)=> e.email === data.email)

    // toast.success("login successful", {
    //   autoClose: 1000
    // })
    
    // reset()
    
    // setTimeout(()=>{
    //   dispatch(login(isLogind))
    //   navigate('/', {replace:true})
    // },1500)
  }

  // console.log(usersState.token)

  return (
    <main className="flex flex-col gap-5 py-8 px-5 sm:py-10 sm:px-10 md:px-16 lg:px-20 xl:px-30">
      <div>
        <div className="text-3xl sm:text-4xl font-bold mb-2">
          Welcome back
        </div>

        <div className="text-black/50 mb-5 flex flex-wrap items-center gap-2">
          Don't have an account?
          <Link className="text-orangeFigma" to={"/auth/registration"}>
            Sign up
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col gap-2 font-semibold">
          Email address

          <input
            {...register("email",{
              required: "Email is required",
              validate:{
                isRegisted : (v) => {
                  if(v === import.meta.env.VITE_USERNAME || v === import.meta.env.VITE_COM_USERNAME){
                    return true
                  } else if (!(v.includes("@"))) {
                    return "there must be an @ character"
                  } 
                  // else {
                  //   // const dataLocal = JSON.parse(localStorage.getItem("users")||"[]")
                  //   const isRegis = usersState.users.some((u) => u.email.toLowerCase() === v.toLowerCase())
                  //   return isRegis || "This email not registered"
                  // }
                }
              }
            })}
            type="text"
            autoComplete="email"
            className={`border-2 outline-none text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 sm:py-4 font-normal ${errors.email ? "border-red-500":"border-white"} bg-gray-200 rounded-xl`}
            placeholder="exemple@mail.com"
          />
        </label>

        <p className="text-base sm:text-xl h-6 font-medium text-red-400"
        >{errors.email?.message}</p>

        <label className="flex flex-col gap-2">
          <div className="flex flex-wrap justify-between gap-2">
            <span className="font-semibold">
              Password
            </span>

            <Link
              to={"/auth/forgotPassword"}
              className="text-orangeFigma font-semibold hover:text-green-500"
            >
              Forgot password?
            </Link>
          </div>

          <div
            className={`veryCenter border-2 bg-gray-200 rounded-xl ${
              errors.password ? "border-red-500" : "border-white"
            } pr-3 sm:pr-4`}
          >
            <input
              {...register('password', {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "password minimum 6 characters"
                },
                validate: {
                  isCorrect: (v) => {
                    if (
                      v === import.meta.env.VITE_PASSWORD ||
                      v === import.meta.env.VITE_COM_PASSWORD
                    ) {
                      return true
                    } 
                    // else {
                    //   const isRegis = usersState.users.some(
                    //     (u) =>
                    //       u.email.toLowerCase() === fs.email?.toLowerCase() &&
                    //       u.password === v
                    //   )

                    //   return isRegis || "This email or password not registered"
                    // }
                  }
                }
              })}
              type={eye === "close" ? "password" : "text"}
              autoComplete="current-password"
              className="w-full min-w-0 outline-none text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 sm:py-4 font-normal bg-transparent"
              placeholder="Input Here . . ."
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
        </label>

        <p className="text-base sm:text-xl h-6 font-medium text-red-400"
        >{errors.password?.message}</p>

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