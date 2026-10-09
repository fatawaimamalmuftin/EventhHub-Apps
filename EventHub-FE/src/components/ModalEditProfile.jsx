import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// import { editProfile } from "../Redux/slice/userSlice";
import { useState } from "react";

export default function ModalEditProfile({showModal, setShowModal}) {

    // const dispatch = useDispatch()

    const userLogind = useSelector(
        (state) => state.usersState.userLogind
    )

    const [profilePreview, setProfilePreview] = useState(() => userLogind?.profile)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        defaultValues: {
            fullName: userLogind.full_name,
            location: userLogind?.location,
            bio: userLogind?.bio
        }
    })

    const onSubmit = () => {
        // dispatch(editProfile({
        //     fullName: data.fullName,
        //     location: data.location,
        //     bio: data.bio,
        //     profile: profilePreview
        // }))
        reset()
        setShowModal(false)
    }

  return (
    <main className={`w-screen h-screen fixed top-0 left-0 z-50 bg-black/40 veryCenter ${!showModal && "hidden"}`}>
        <div className="bg-white w-[95%] sm:w-120 rounded-xl p-5">

            <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-lg">
                    Edit Profile
                </h2>

                <IoClose className="text-xl text-gray-400 cursor-pointer hover:text-red-500" onClick={()=>setShowModal(false)}/>
            </div>


           <div className="w-30 h-30 border-2 border-borderClr rounded-xl overflow-hidden">
                <label className="w-full h-full block cursor-pointer">

                    {profilePreview ? (
                        <img
                            src={"http://localhost:5678"+userLogind.profile}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            // onError={() => {
                            //     dispatch(editProfile({
                            //         profile: null
                            //     }))
                            // }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-50 veryCenter flex-col gap-2 text-gray-400">
                            <div className="text-3xl">
                                👤
                            </div>

                            <div className="text-xs">
                                Upload photo
                            </div>
                        </div>
                    )}

                    <input
                        {...register("profile")}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            const file = e.target.files[0]

                            if(!file) return

                            const render = new FileReader()

                            render.onloadend = () => {
                                setProfilePreview(render.result)
                            }

                            render.readAsDataURL(file)
                        }}
                    />

                </label>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <label className="block text-sm mb-2">
                        Full Name
                    </label>

                    <input
                        {...register("fullName", {
                            required: "Full name wajib diisi"
                        })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
                        type="text"
                        placeholder="Enter your full name"
                    />

                    {errors.fullName &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.fullName.message}
                        </p>
                    }
                </div>


                <div className="mb-4">
                    <label className="block text-sm mb-2">
                        Location
                    </label>

                    <input
                        {...register("location", {
                            required: "Location wajib diisi"
                        })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 outline-none"
                        type="text"
                        placeholder="Enter your location"
                    />

                    {errors.location &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.location.message}
                        </p>
                    }
                </div>


                <div className="mb-5">
                    <label className="block text-sm mb-2">
                        Bio
                    </label>

                    <textarea
                        {...register("bio", {
                            required: "Bio wajib diisi"
                        })}
                        className="w-full h-17 border border-gray-200 rounded-lg px-3 py-2 outline-none resize-none"
                        placeholder="Enter your bio"
                    />

                    {errors.bio &&
                        <p className="text-red-500 text-sm mt-1">
                            {errors.bio.message}
                        </p>
                    }
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-red-500 hover:text-white"
                        onClick={() => {
                            setShowModal(false)
                            setProfilePreview(null)
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-orangeFigma text-white rounded-lg cursor-pointer hover:hover"
                    >
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    </main>
  )
}