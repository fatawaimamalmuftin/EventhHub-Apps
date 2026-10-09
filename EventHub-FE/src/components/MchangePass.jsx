import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../Redux/slice/usersSlice";
import { toast } from "react-toastify";

export default function MchangePass({Cmodal, setCmodal}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch()

  const user = useSelector(
    (state) => state.userState.user
  )  

  const {
    handleSubmit,
    register,
        control,
    formState: {errors},
    reset
  } = useForm()

    const newPass = useWatch({ control, name: "newPass" });

  const onSubmit = (data) => {
    const updateUser = {id: user.id, password: data.newPass}

    dispatch(changePassword(updateUser))

    toast.success("Password has changed",{
        autoClose: 1000
    })

    reset()
    
    setCmodal(false)
  }

  return (
    <>
    {Cmodal && 
    <div className="fixed veryCenter w-screen h-screen z-10 bg-black/30 pb-50">
        <div className="bg-white p-5 rounded-2xl min-w-50">
            <div className="flex justify-between items-center">
                <div className="font-bold">Change Password</div>
                <div 
                    className="hover:text-red-500 cursor-pointer font-bold"
                    onClick={()=>setCmodal(false)}
                >
                    X
                </div>
            </div>

            <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
                
                <div>
                    <label>
                        New Password
                        <div className="relative">
                            <input
                                {...register("newPass", {
                                    required: "Enter a new password",
                                    minLength: {
                                        value: 6,
                                        message: "Password minimum 6 characters"
                                    }
                                })}
                                autoComplete="newPass"
                                className="myBorder outline-none w-full pr-8"
                                type={showPassword ? "text" : "password"}
                            />

                            <div
                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>

                        {errors.newPass && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.newPass.message}
                            </div>
                        )}
                    </label>
                </div>

                <div className="mt-3">
                    <label>
                        Comfirm New Password
                        <div className="relative">
                            <input
                                {...register("comfirmNewPass", {
                                    required: "Enter a comfirm password",
                                    minLength: {
                                        value: 6,
                                        message: "Password minimum 6 characters"
                                    },
                                    validate: (value) =>
                                        value === newPass ||
                                        "Password do not match"
                                })}
                                autoComplete="comfirmNewPass"
                                className="myBorder outline-none w-full pr-8"
                                type={showConfirmPassword ? "text" : "password"}
                            />

                            <div
                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </div>
                        </div>

                        {errors.comfirmNewPass && (
                            <div className="text-red-500 text-sm mt-1">
                                {errors.comfirmNewPass.message}
                            </div>
                        )}
                    </label>
                </div>

                <button
                    className="bg-orangeFigma text-white w-full py-1 mt-3 rounded-2xl hover:bg-green-500"
                >
                    Save
                </button>
            </form>
        </div>
    </div>
    }
    </>
  )
}
