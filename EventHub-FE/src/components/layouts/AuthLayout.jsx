import { Navigate, Outlet } from "react-router"
import SideBarAuth from "../SideBarAuth"
import { useSelector } from "react-redux"
import UseGetItem from "../../Hooks/UseGetItem"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function AuthLayout() {

  const user = useSelector((state) => state.userState.user)

  const admin = UseGetItem("admin","null")

  const comunities = UseGetItem("comunities","null")

  if(user || admin || comunities){
    return <Navigate to="/guest" replace/>
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-screen w-screen overflow-hidden">
      <SideBarAuth />

      <section className="h-screen overflow-y-auto">
        <Outlet />
      </section>

      <ToastContainer position="top-center"/>
    </main>
  )
}