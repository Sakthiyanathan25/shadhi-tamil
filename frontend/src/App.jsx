import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import BaseLayout from "./layout/BaseLayout";
import Members from "./pages/Members";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Profile from "./auth/Profile";
import Matches from "./pages/Matches";
import "./App.css";
import ForgotPassword from "./auth/ForgotPassword";
import { useContext } from "react";
import ProtectedRoute from "./auth/ProtectedRoute";
import EditProfile from "./pages/profile/EditProfile";
import EditPreferences from "./pages/profile/EditPreferences";
import Settings from "./pages/profile/Settings";
import Help from "./pages/Help";
import Pricing from "./pages/Pricing";
import AdminHome from "./pages/admin/Home";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import ResetPassword from "./auth/ResetPassword";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
    <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/members" element={<Members />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!user ? <Login /> : user==="user" ? <Navigate to="/admin"/> : <Navigate to="/profile" />}/>
        <Route path="/register"element={!user ? <Register /> : user==="user" ? <Navigate to="/admin"/> : <Navigate to="/profile" />}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
          <Route path="edit/:usedId" element={<EditProfile/>} />
          <Route path="preferences/edit" element={<EditPreferences/>} />
          <Route path="settings" element={<Settings/>} />
        </Route>
        <Route path="/matches"element={<ProtectedRoute><Matches /></ProtectedRoute>}/>
        <Route path="/pricing"element={<ProtectedRoute><Pricing /></ProtectedRoute>}/>
        <Route path="/admin"element={<ProtectedRoute><AdminHome /></ProtectedRoute>}>
          <Route path="users" element={<Users/>} />
          <Route path="analytics" element={<Analytics/>} />
          <Route path="settings" element={<Settings/>} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/" element={<ResetPassword />} />
        <Route path="/help" element={<Help/>} />
      </Route>
    </Routes>
    <ToastContainer />
    </>
  );
};

export default App;
