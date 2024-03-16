import {Route, Routes} from "react-router-dom";
import Home from "../components/pages/home/Home";
import LoginForm from "../components/pages/auth/LoginForm";
import Application from "../components/pages/application/Application";
import RegisterForm from "../components/pages/auth/RegisterForm";
import Settings from "../components/pages/application/Settings";
import TestPage from "../components/pages/application/TestPage";
import EditProfile from "../components/pages/application/EditProfile";
import Admin from "../components/pages/admin/Admin";
import AdminTests from "../components/pages/admin/AdminTests";
import NewTest from "../components/pages/admin/NewTest";
import AdminQuestions from "../components/pages/admin/AdminQuestions";
import NewQuestion from "../components/pages/admin/NewQuestion";
import EditQuestion from "../components/pages/admin/EditQuestion";
import EditTest from "../components/pages/admin/EditTest";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="register" element={<RegisterForm/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="app" element={<Application/>}/>
            <Route path="settings" element={<Settings/>}/>
            <Route path="profile/edit" element={<EditProfile/>}/>
            <Route path="tests/:title" element={<TestPage/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="admin/tests" element={<AdminTests/>}/>
            <Route path="admin/tests/new" element={<NewTest/>}/>
            <Route path="admin/tests/edit/:title" element={<EditTest/>}/>
            <Route path="admin/questions" element={<AdminQuestions/>}/>
            <Route path="admin/questions/new" element={<NewQuestion/>}/>
            <Route path="admin/questions/edit/:id" element={<EditQuestion/>}/>
        </Routes>
    );
}
