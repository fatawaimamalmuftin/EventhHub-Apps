import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import ModalLogout from './ModalLogout'
// import { useDispatch } from 'react-redux'
// import { editProfile, logout } from '../Redux/slice/userSlice.js'

import moon from '../assets/moon.svg'

import {FiBell,FiMenu,FiX,FiCompass,FiUsers,FiCalendar,FiUser,FiLogIn,FiLogOut,FiGrid,FiShield,} from 'react-icons/fi'

export default function Navbar() {
    // const dispatch = useDispatch()

    const userLogind = useSelector(
        (state) => state.usersState.userLogind
    )

    const [admin, setAdmin] = useState(null)
    const [adminNav, setAdminNav] = useState(false)
    const [showAdmin, setShowAdmin] = useState(false)

    const [comunities, setComunities] = useState(null)
    const [comNav, setComNav] = useState(false)
    const [showCom, setShowCom] = useState(false)

    const [show, setShow] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {

        const admin = JSON.parse(
            localStorage.getItem("admin") || "null"
        )

        const comunities = JSON.parse(
            localStorage.getItem("comunities") || "null"
        )

        if(admin || comunities){
            (()=>{
                setAdmin(admin)
                setComunities(comunities)
                setAdminNav(true)
                setComNav(true)
            })()
        }

    }, [])

    const profile = userLogind?.full_name ? userLogind.full_name[0].toUpperCase() : ""

    const basePath = userLogind || admin || comunities ? "" : "/guest"

    function handleLogout() {

        if (admin) {

            setAdmin(false)
            localStorage.removeItem("admin")

            setComunities(false)
            localStorage.removeItem("comunities")

            window.location.reload()

            return

        }


        const dataLocal = JSON.parse(
            localStorage.getItem("users") || "[]"
        )


        const setData = dataLocal.map((user) => {

            if (user.id === userLogind.id) {

                return {
                    ...user,
                    cart: userLogind.cart
                }

            }

            return user
        })

        localStorage.setItem("users",JSON.stringify(setData))

        // dispatch(logout())

        setShow(false)
    }


    return (
        <nav className="relative veryCenter gap-8 py-4 px-14 bg-whiteFigma shadow-xl top-0 z-2">

            <div className="veryCenter gap-2">

                <div className="btnBordColor w-7 h-7">
                    E
                </div>

                <div className="font-bold text-2xl">
                    EventHub
                </div>

            </div>


            {/* DESKTOP NAVIGATION */}

            <div className="hidden md:flex veryCenter gap-4">

                {/* EXPLORE */}

                <NavLink
                    to={basePath}
                    end
                    className={({isActive}) =>
                        isActive
                            ? "hover py-2 px-4"
                            : "hover:btnBordColor py-2 px-4"
                    }
                >
                    Explore
                </NavLink>


                {/* EVENT */}

                <NavLink
                    to={`${basePath}/event`}
                    end
                    className={({isActive}) =>
                        isActive
                            ? "hover py-2 px-4"
                            : "hover:btnBordColor py-2 px-4"
                    }
                >
                    Event
                </NavLink>


                {/* COMMUNITIES */}

                <NavLink
                    to={`${basePath}/comunities`}
                    className={({isActive}) =>
                        isActive
                            ? "hover py-2 px-4"
                            : "hover:btnBordColor py-2 px-4"
                    }
                >
                    Communities
                </NavLink>


                {/* MY EVENTS */}

                {(userLogind) &&
                <NavLink
                    to={`${basePath}/myevents`}
                    className={({isActive}) =>
                        isActive
                            ? "hover py-2 px-4"
                            : "hover:btnBordColor py-2 px-4"
                    }
                >
                    My Events
                </NavLink>
                }

            </div>


            <div className="hidden md:flex veryCenter ml-auto gap-5">

                {userLogind ?

                <NavLink to="/notif">
                    <FiBell
                        className="w-5 h-5 cursor-pointer"
                    />
                </NavLink>

                :

                <div className={admin || comunities ? "hidden" : "text-gray-400"}>
                    Browsing as guest
                </div>

                }


                {admin &&
                <div className="veryCenter gap-2">
                    <NavLink to="adminDash" className="hover:hover px-2 py-1 veryCenter gap-1">
                        <FiShield
                            className="w-5 h-5 cursor-pointer"
                        />

                        <div className="text-gray-400 text-xl pt-1 hover:text-orangeFigma">
                            Admin
                        </div>
                    </NavLink>


                    <NavLink to="/notif">
                        <FiBell
                            className="w-5 h-5 cursor-pointer"
                        />
                    </NavLink>

                </div>
                }


                {comunities &&
                <>
                    <NavLink
                        to={`${basePath}/comunitiesDash`}
                        className={({isActive}) =>
                            isActive
                                ? "hover veryCenter py-2 px-4 gap-2 "
                                : "myBorder veryCenter gap-2 py-2 px-4 hover:hover"
                        }
                    >
                        <FiGrid
                            className="w-5 h-5 cursor-pointer"
                        />

                        Comunities
                    </NavLink>

                    <NavLink to="/notif">
                        <FiBell
                            className="w-5 h-5 cursor-pointer"
                        />
                    </NavLink>
                </>
                }


                <img
                    src={moon}
                    alt="moon"
                    className="w-5 h-5 cursor-pointer"
                />


                {userLogind && (
                    <div className="relative">

                        <button
                            type="button"
                            className="w-10 h-10 bg-orangeFigma text-white rounded-full cursor-pointer outline-none overflow-hidden veryCenter text-2xl"
                            onClick={() => setShow(!show)}
                        >

                            {userLogind?.profile ? (
                                <img
                                    src={"http://localhost:5678" + userLogind?.profile}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    // onError={() => {
                                    //     dispatch(editProfile({
                                    //         profile: null
                                    //     }))
                                    // }}
                                />

                            ) : (

                                profile

                            )}

                        </button>

                    </div>
                )}


                {!userLogind && !admin && !comunities && (

                    <button
                        type="button"
                        className="btnBordColor py-1 px-2 outline-none hover:hover"
                    >

                        <NavLink to="/auth/login">
                            Sign In
                        </NavLink>

                    </button>

                )}


                {admin && (
                    <div className="relative">

                        <button
                            type="button"
                            className="relative w-10 h-10 outline-none rounded-full hover:rounded-4xl cursor-pointer overflow-hidden"
                            onClick={() =>
                                showAdmin
                                    ? setShowAdmin(false)
                                    : setShowAdmin(true)
                            }
                        >

                            <img
                                src={admin.images}
                                alt="profile"
                                className="object-cover w-full h-full"
                            />

                        </button>

                    </div>
                )}


                {comunities && (
                    <div className="relative">

                        <button
                            type="button"
                            className="relative w-10 h-10 outline-none rounded-full hover:rounded-4xl cursor-pointer overflow-hidden"
                            onClick={() =>
                                showCom
                                    ? setShowCom(false)
                                    : setShowCom(true)
                            }
                        >

                            <img
                                src={comunities.images}
                                alt="profile"
                                className="object-cover w-full h-full"
                            />

                        </button>

                    </div>
                )}

            </div>


            {/* MOBILE NAVIGATION */}

            <div className="md:hidden veryCenter ml-auto gap-5">

                {userLogind &&

                <div className="relative">

                    <NavLink to="/notif">
                        <FiBell
                            className="w-5 h-5 cursor-pointer"
                        />
                    </NavLink>

                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-orangeFigma text-white text-xs veryCenter">
                        3
                    </div>

                </div>

                }


                {admin &&

                <FiShield
                    className="w-6 h-6 text-gray-600"
                />

                }


                <img
                    src={moon}
                    alt="moon"
                    className="w-6 h-6 cursor-pointer"
                />


                <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() =>
                        setShowMenu(!showMenu)
                    }
                >

                    {showMenu
                        ?
                        <FiX className="w-7 h-7 text-gray-600" />
                        :
                        <FiMenu className="w-7 h-7 text-gray-600" />
                    }

                </button>

            </div>


            {showMenu &&

            <div className="md:hidden absolute top-full right-5 w-77.5 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">

                {userLogind &&

                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200">

                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 veryCenter">

                        {userLogind.images ?

                        <img
                            src={userLogind.images}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />

                        :

                        <span className="text-xl">
                            {profile}
                        </span>

                        }

                    </div>


                    <div className="min-w-0">

                        <p className="font-semibold text-lg truncate">
                            {userLogind.full_name}
                        </p>

                        <p className="text-gray-400 truncate">
                            {userLogind.email}
                        </p>

                    </div>

                </div>

                }


                {admin &&

                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200">

                    <div className="w-12 h-12 rounded-full overflow-hidden">

                        <img
                            src={admin.images}
                            alt="profile"
                            className="w-full h-full object-cover"
                        />

                    </div>


                    <div>

                        <p className="font-semibold text-lg">
                            Admin
                        </p>

                        <p className="text-gray-400">
                            Administrator
                        </p>

                    </div>

                </div>

                }


                {!userLogind && !admin &&

                <div className="px-6 py-5 text-gray-400 border-b border-gray-200">
                    Browsing as guest
                </div>

                }


                {/* EXPLORE */}

                {(userLogind || admin) &&

                <NavLink
                    to={basePath}
                    end
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) =>
                        `flex items-center gap-4 px-6 py-4 text-lg ${
                            isActive
                                ? "text-orangeFigma bg-orange-50"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >

                    <FiCompass className="w-6 h-6" />

                    Explore

                </NavLink>

                }


                {/* EVENTS */}

                <NavLink
                    to={`${basePath}/event`}
                    end
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) =>
                        `flex items-center gap-4 px-6 py-4 text-lg ${
                            isActive
                                ? "text-orangeFigma bg-orange-50"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >

                    <FiCalendar className="w-6 h-6" />

                    Events

                </NavLink>


                {/* COMMUNITIES */}

                <NavLink
                    to={`${basePath}/comunities`}
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) =>
                        `flex items-center gap-4 px-6 py-4 text-lg ${
                            isActive
                                ? "text-orangeFigma bg-orange-50"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >

                    <FiUsers className="w-6 h-6" />

                    Communities

                </NavLink>


                {/* MY EVENTS */}

                {userLogind &&

                <NavLink
                    to={`${basePath}/myevents`}
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) =>
                        `flex items-center gap-4 px-6 py-4 text-lg ${
                            isActive
                                ? "text-orangeFigma bg-orange-50"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >

                    <FiCalendar className="w-6 h-6" />

                    My Events

                </NavLink>

                }


                {/* MY PROFILE */}

                {userLogind &&

                <NavLink
                    to={`${basePath}/myprofile`}
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) =>
                        `flex items-center gap-4 px-6 py-4 text-lg ${
                            isActive
                                ? "text-orangeFigma bg-orange-50"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >

                    <FiUser className="w-6 h-6" />

                    My Profile

                </NavLink>

                }


                {/* ADMIN */}

                {admin &&

                <NavLink
                    to="/admin"
                    onClick={() => setShowMenu(false)}
                    className={({isActive}) =>
                        `flex items-center gap-4 px-6 py-4 text-lg ${
                            isActive
                                ? "text-orangeFigma bg-orange-50"
                                : "text-gray-700 hover:bg-gray-50"
                        }`
                    }
                >

                    <FiGrid className="w-6 h-6" />

                    Dashboard

                </NavLink>

                }


                {/* SIGN IN */}

                {!userLogind && !admin &&

                <NavLink
                    to="/auth/login"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-4 px-6 py-5 text-lg text-orangeFigma border-t border-gray-200 hover:bg-orange-50"
                >

                    <FiLogIn className="w-6 h-6" />

                    Sign In

                </NavLink>

                }


                {/* SIGN OUT USER */}

                {userLogind &&

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-4 w-full px-6 py-5 text-lg text-red-500 border-t border-gray-200 hover:bg-red-50"
                >

                    <FiLogOut className="w-6 h-6" />

                    Sign Out

                </button>

                }


                {/* SIGN OUT ADMIN */}

                {admin &&

                <button
                    type="button"
                    onClick={() => {
                        setShowMenu(false)
                        setShowAdmin(true)
                    }}
                    className="flex items-center gap-4 w-full px-6 py-5 text-lg text-red-500 border-t border-gray-200 hover:bg-red-50"
                >

                    <FiLogOut className="w-6 h-6" />

                    Sign Out

                </button>

                }

            </div>

            }


            {show &&
            <ModalLogout
                show={show}
                setShow={setShow}
            />
            }


            {showAdmin &&
            <ModalLogout
                show={showAdmin}
                setShow={setShowAdmin}
                admin={adminNav}
                setAdmin={setAdminNav}
            />
            }


            {showCom &&
            <ModalLogout
                show={showCom}
                setShow={setShowCom}
                comunities={comNav}
                setComunities={setComNav}
            />
            }

        </nav>
    )
}