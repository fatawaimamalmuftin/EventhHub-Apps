import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { LogoutThunk, logoutUser } from "../Redux/slice/usersSlice.js"

export default function ModalLogout({ show, setShow, admin = null, setAdmin = null, comunities = null, setComunities = null }) {

    const userLogind = useSelector(
        (state) => state.usersState.userLogind
    )

    const dispatch = useDispatch()
    
    function handleLogout() {

        if (admin) {
            setAdmin(false)
            localStorage.removeItem("admin")
            window.location.reload()
            return
        }

        if (comunities) {
            setComunities(false)
            localStorage.removeItem("comunities")
            window.location.reload()
            return
        }
    }

    return (
        <main
            className={` absolute top-15 right-15 max-w-200 overflow-hidden rounded-2xl border  border-black/10  bg-white shadow-xl ${!show && "hidden"}`}>
            {userLogind && (
                <div className="veryCenter px-4">
                        {userLogind.profile === "" ? (
                            <div className="w-10 h-10 bg-orangeFigma text-white rounded-full overflow-hidden veryCenter text-2xl">
                                {userLogind.full_name[0].toUpperCase()}
                            </div>
                        ) : ( 
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                                <img
                                    src={"http://localhost:5678" + userLogind.profile}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    />
                            </div>
                        )}
                    <div className="px-4 py-5">

                        <div className="text-2xl font-semibold whitespace-nowrap">
                            {userLogind.full_name}
                        </div>

                        <div className="text-lg text-gray-400">
                            {userLogind.email}
                        </div>

                    </div>
                </div>
            )}

            {/* {admin && 
                <div className="border-t border-gray-200 px-7 py-4 text-xl text-gray-700 hover:bg-gray-200 cursor-pointer whitespace-nowrap">
                    Admin Dashboard
                </div>
            } */}

            {userLogind &&
            <Link to="/myprofile">
                <div className="border-t border-gray-200 px-7 py-4 text-xl text-gray-700 hover:bg-gray-200 cursor-pointer whitespace-nowrap"
                onClick={()=>setShow(false)}>
                    My Profile
                </div>
            </Link>
            }

            <button
                className="w-full border-t border-gray-200 px-7 py-5 text-left text-xl text-red-500 hover:bg-red-300 hover:text-white cursor-pointer"
                onClick={() => {
                    dispatch(LogoutThunk(userLogind.token))
                    dispatch(logoutUser())
                    handleLogout()
                }}
            >
                Sign Out
            </button>

        </main>
    )
}