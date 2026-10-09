import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";
import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";
import UseGetItem from "../../Hooks/UseGetItem.js";

export default function GuestLayout() {

  const user = useSelector((state) => state.userState.user)

  const admin = UseGetItem("admin","null")
  
  const comunities = UseGetItem("comunities","null")

  if(user || admin || comunities){
    return <Navigate to="/" replace/>
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );

}