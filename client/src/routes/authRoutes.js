import {Route, Routes} from "react-router-dom";
import Home from "../components/pages/home/Home";
import LoginForm from "../components/pages/auth/LoginForm";
import Application from "../components/pages/application/Application";
import RegisterForm from "../components/pages/auth/RegisterForm";
import Profile from "../components/pages/application/Profile";
import Progress from "../components/pages/application/Progress";
import Tests from "../components/pages/application/Tests";
import TestPage from "../components/pages/application/TestPage";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="register" element={<RegisterForm/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="app" element={<Application/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="progress" element={<Progress/>}/>
            <Route path="tests" element={<Tests/>}/>
            <Route path="tests/:title" element={<TestPage/>}/>
        </Routes>
    );
}
