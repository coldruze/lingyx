import {Route, Routes} from "react-router-dom";
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import Application from "../components/Application";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="app" element={<Application/>}/>
        </Routes>
    );
}
