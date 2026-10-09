import { Navigate, Outlet } from "react-router"
import Navbar from "../Navbar"
import Footer from "../Footer"
import { useSelector } from "react-redux"
import UseGetItem from '../../Hooks/UseGetItem.js'

export default function UserLayout() {
    
    // const {username} = useParams()

    const user = useSelector((state) => state.usersState.userLogind)

    const admin = UseGetItem("admin","null")

    const comunities = UseGetItem("comunities","null")


    if(!(user || admin || comunities)){
        return <Navigate to="/guest" replace/>
    }

    // if(user){
    //     if(username !== user.fullName){
    //         return <Navigate to={`/${user.fullName}`} replace/>
    //     }
    // }

    // if(admin){
    //     if(username !== admin.email){
    //         return <Navigate to={`/${admin.email}`} replace/>
    //     }
    // }

  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}