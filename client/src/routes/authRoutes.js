import {Route, Routes} from "react-router-dom";
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import Application from "../components/Application";
import RegisterForm from "../components/RegisterForm";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="register" element={<RegisterForm/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="app" element={<Application/>}/>
        </Routes>
    );
}
