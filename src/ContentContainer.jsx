import { Route, Routes } from "react-router-dom";
import './ContentContainer.css'

// Import route components
import HomePage from "./landingPage/home/HomePage";
import LoginPage from "./landingPage/login/LoginPage";
import SignupPage from "./landingPage/signup/SignupPage";
import Dashboard from "./landingPage/dashboard/Dashboard";
import EditProfile from "./landingPage/editProfile/editProfile";

//Routing the paths
export default function ContentContainer({darkMode}){
    return(
        <div id="content-container" className="content-container text-center">
            <Routes>
                <Route path="/" element={<HomePage darkMode={darkMode}/>}/>
                <Route path="/login" element={<LoginPage darkMode={darkMode}/>}/>
                <Route path="/signup" element={<SignupPage darkMode={darkMode}/>}/>
                <Route path="/dashboard" element={<Dashboard darkMode={darkMode}/>}/>
                <Route path="/edit-profile" element={<EditProfile darkMode={darkMode}/>}/>
                <Route path="*" element={<h1>Page not Found</h1>}/>
            </Routes>
        </div>
    )
}