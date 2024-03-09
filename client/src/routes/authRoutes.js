import {Route, Routes} from "react-router-dom";
import Home from "../components/pages/home/Home";
import LoginForm from "../components/pages/auth/LoginForm";
import Application from "../components/pages/application/Application";
import RegisterForm from "../components/pages/auth/RegisterForm";
import Profile from "../components/pages/application/Profile";
import Progress from "../components/pages/application/Progress";
import Tests from "../components/pages/application/Tests";
import TestPage from "../components/pages/application/TestPage";
import EditProfile from "../components/pages/application/EditProfile";
import Admin from "../components/pages/admin/Admin";
import AdminTests from "../components/pages/admin/AdminTests";
import NewTest from "../components/pages/admin/NewTest";
import AdminQuestions from "../components/pages/admin/AdminQuestions";
import NewQuestion from "../components/pages/admin/NewQuestion";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="register" element={<RegisterForm/>}/>
            <Route path="login" element={<LoginForm/>}/>
            <Route path="app" element={<Application/>}/>
            <Route path="profile" element={<Profile/>}/>
            <Route path="profile/edit" element={<EditProfile/>}/>
            <Route path="progress" element={<Progress/>}/>
            <Route path="tests" element={<Tests/>}/>
            <Route path="tests/:title" element={<TestPage/>}/>
            <Route path="admin" element={<Admin/>}/>
            <Route path="admin/tests" element={<AdminTests/>}/>
            <Route path="admin/tests/newtest" element={<NewTest/>}/>
            <Route path="admin/questions" element={<AdminQuestions/>}/>
            <Route path="admin/questions/newquestion" element={<NewQuestion/>}/>
        </Routes>
    );
}
