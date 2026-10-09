// import { useDispatch } from "react-redux"
import { IoPencilOutline } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { useState } from "react";
// import CardEvent from '../../components/CardEvent.jsx'
import { CiCalendar } from "react-icons/ci";
import ModalEditProfile from "../../components/ModalEditProfile.jsx";
// import { editProfile } from "../../Redux/slice/userSlice.js";
import MchangePass from "../../components/MchangePass.jsx";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

export default function MyProfile() {
    // const dispatch = useDispatch()

    const userLogind = useSelector(
        (state) => state.usersState.userLogind
    )
    console.log(userLogind)

    const [show, setShow] = useState("events")
    const [showModal, setShowModal] = useState(false)
    const [cmodal, setCmodal] = useState(false)

  return (
    <>
    <MchangePass Cmodal={cmodal} setCmodal={setCmodal}/>
        <ModalEditProfile showModal={showModal} setShowModal={setShowModal}/>
        <main className="bg-white px-3 sm:px-8 md:px-20 lg:px-50 pt-5 sm:pt-8 lg:pt-10 border-b-2 border-gray-200 mb-6 lg:mb-10">

            <div className="grid grid-cols-[68px_1fr] sm:grid-cols-[120px_1fr] md:grid-cols-[20%_68%] gap-4 sm:gap-5">

                <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-40 md:h-35 border-2 border-borderClr rounded-xl overflow-hidden md:ml-auto">
                    <label className="block w-full h-full">
                        {userLogind?.profile ? (
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
                    </label>
                </div>

                <div className="relative">
                    <div className="font-bold text-lg sm:text-xl md:text-2xl">
                        {userLogind.full_name}
                    </div>

                    <div className="text-gray-500 text-xs sm:text-base md:text-xl">
                        {userLogind.email}
                    </div>

                    <span className="hover:hover inline-flex items-center gap-2 myBorder font-normal text-xs sm:text-sm px-2 py-1 mt-1 md:absolute md:right-0 md:top-0"
                    onClick={()=>setShowModal(true)}>
                        <IoPencilOutline />
                        Edit Profile
                    </span>

                    <span className="hover:hover inline-flex items-center gap-2 myBorder font-normal text-xs sm:text-sm px-2 py-1 mt-1 md:absolute md:right-0 md:top-10"
                    onClick={()=>setCmodal(true)}>
                        <IoPencilOutline />
                        Change Password
                    </span>

                    <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs sm:text-base md:text-xl mt-2">
                        <div className="flex items-center gap-1">
                            <MdLocationPin />
                            {userLogind.location
                                ? userLogind.location
                                : "Belum ada"
                            }
                        </div>

                        <div className="flex items-center gap-1">
                            <CiCalendar/>
                            Joined {new Date(userLogind.created_at).toLocaleDateString("id-ID", {
                                month: "long",
                                year: "numeric",
                            })}
                        </div>

                        <div className="inline-block px-2 py-1 bg-orangeFigma/30 text-orangeFigma rounded-2xl text-xs">
                            Attendee
                        </div>
                    </div>


                    <div className="text-xl text-gray-500 mt-5">
                        {userLogind?.bio}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 mt-5 sm:mt-8 lg:mt-10">

                <div className="flex flex-col justify-center items-center border-r border-gray-200">
                    <div className="text-xl sm:text-2xl">
                        {/* {userLogind.cart.length} */}0
                    </div>

                    <div className="text-gray-500 text-[10px] sm:text-sm">
                        Events
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center border-r border-gray-200">
                    <div className="text-xl sm:text-2xl">
                        1
                    </div>

                    <div className="text-gray-500 text-[10px] sm:text-sm">
                        Communities
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <div className="text-xl sm:text-2xl">
                        0
                    </div>

                    <div className="text-gray-500 text-[10px] sm:text-sm">
                        Saved
                    </div>
                </div>

            </div>


            <div className="flex justify-around mt-6 sm:mt-10 text-xs sm:text-base md:text-xl text-gray-500">

                <label
                    onClick={()=>setShow("events")}
                    className={`cursor-pointer px-3 pb-3 ${show === "events" && "text-orangeFigma border-b-2 border-orangeFigma"}`}
                >
                    Events

                    <input
                        className="appearance-none"
                        value="events"
                        type="radio"
                        name="category"
                    />
                </label>

                <label
                    onClick={()=>setShow("comunities")}
                    className={`cursor-pointer px-3 pb-3 ${show === "comunities" && "text-orangeFigma border-b-2 border-orangeFigma"}`}
                >
                    Comunities

                    <input
                        className="appearance-none"
                        value="comunities"
                        type="radio"
                        name="category"
                    />
                </label>

                <label
                    onClick={()=>setShow("saved")}
                    className={`cursor-pointer px-3 pb-3 ${show === "saved" && "text-orangeFigma border-b-2 border-orangeFigma"}`}
                >
                    Saved

                    <input
                        className="appearance-none"
                        value="saved"
                        type="radio"
                        name="category"
                    />
                </label>

            </div>

        </main>


        {/* {show === "events" &&
            <article className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 sm:px-8 md:px-20 lg:px-70">

                {userLogind.cart.map((e,i)=>(
                    <CardEvent key={i} event={e}/>
                ))}

            </article>
        } */}


        {/* {show === "events" && userLogind.cart.length === 0 &&
            <div className="w-full text-center p-10 sm:p-20 text-lg sm:text-2xl text-gray-500">
                No events. Bookmark events to find them later.
            </div>
        }


        {show === "comunities" &&
            <div className="w-full text-center p-10 sm:p-20 text-lg sm:text-2xl text-gray-500">
                No communities. Join a community to find them here.
            </div>
        }


        {show === "saved" &&
            <div className="w-full text-center p-10 sm:p-20 text-lg sm:text-2xl text-gray-500">
                No saved events. Bookmark events to find them later.
            </div>
        } */}

        <ToastContainer position="top-center"/>
    </>
  )
}