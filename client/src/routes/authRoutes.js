import {Route, Routes} from "react-router-dom";
import LoginForm from "../pages/auth/LoginForm";
import Application from "../pages/application/Application";
import RegisterForm from "../pages/auth/RegisterForm";
import Settings from "../pages/application/Settings";
import TestPage from "../pages/application/TestPage";
import EditProfile from "../pages/application/EditProfile";
import Admin from "../pages/admin/Admin";
import AdminTests from "../pages/admin/AdminTests";
import NewTest from "../pages/admin/NewTest";
import AdminQuestions from "../pages/admin/AdminQuestions";
import NewQuestion from "../pages/admin/NewQuestion";
import EditQuestion from "../pages/admin/EditQuestion";
import EditTest from "../pages/admin/EditTest";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Application/>}/>
            <Route path="register" element={<RegisterForm/>}/>
            <Route path="login" element={<LoginForm/>}/>
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
