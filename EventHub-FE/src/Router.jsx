import { Routes, Route, Navigate } from "react-router";
import Event from "./pages/guest/Event.jsx";
import Comunities from "./pages/guest/Comunities.jsx";
import GuestLayout from "./components/layouts/GuestLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import Regis from "./pages/auth/Regis.jsx";
import Forgot from "./pages/auth/Forgot.jsx";
import AuthLayout from "./components/layouts/AuthLayout.jsx";
import Explore from "./pages/guest/Explore.jsx";
import MyEvents from "./pages/guest/MyEvents.jsx";
import UserLayout from "./components/layouts/UserLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import ComunitiesDash from "./pages/guest/ComunitiesDash.jsx";
import CreateEvent from "./pages/guest/CreateEvent.jsx";
import MyProfile from "./pages/guest/MyProfile.jsx";
import Notif from "./pages/guest/Notif.jsx";
import AdminDashboard from "./pages/guest/AdminDashboard.jsx";

export default function Router() {
  return (
    <Routes>

      {/* user */}
      <Route path="/" element={<UserLayout/>}>
        <Route index element={<Explore/>}/>
        <Route path="event" element={<Event/>}/>
        <Route path="comunities" element={<Comunities/>}/>  
        <Route path="myevents" element={<MyEvents/>}/>
        <Route path="comunitiesDash" element={<ComunitiesDash/>}/>
        <Route path="createEvent" element={<CreateEvent/>}/>
        <Route path="myprofile" element={<MyProfile/>}/>
        <Route path="notif" element={<Notif/>}/>
        <Route path="adminDash" element={<AdminDashboard/>}/>
      </Route>

      {/* guest */}
      <Route path="/guest" element={<GuestLayout />}>
        <Route index element={<Explore />} />
        <Route path="event" element={<Event/>}/>
        <Route path="comunities" element={<Comunities />} />
      </Route>

      {/* auth */}
      <Route path="/login" element={<Navigate to="/auth/login" replace/>}/>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Regis />} />
        <Route path="forgotPassword" element={<Forgot />} />
      </Route>

      {/* catch all */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}