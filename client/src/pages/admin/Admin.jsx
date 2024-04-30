import {useAuth} from "../../utils/authUtils";
import LoginForm from "../auth/LoginForm";
import React from "react";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../assets/app/test-icon.png";
import ProfileIcon from "../../assets/app/profile-icon.png";
import {observer} from "mobx-react-lite";
import SettingsIcon from "../../assets/app/settings-icon.png";

const Admin = () => {
    const navigate = useNavigate();
    const {store, isAuth, isLoading} = useAuth();

    if (isLoading) {
        return (
            <h1>Загрузка...</h1>
        );
    }

    if (!isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    if (!store.user.roles.includes("admin")) {
        return (
            <div>
                <h1>У вас нет прав на просмотр этой страницы</h1>
                <Link to="/settings">Вернуться к профилю</Link>
            </div>
        )
    }

    // const handleTestsFunc = () => {
    //
    // };

    return (
        <div className="application">
            <div className="sidebar">
                <div className="sidebar__title">
                    LingyX
                </div>
                <div>
                    <Link to="/app" className="sidebar__link">
                        <img src={TestIcon} alt=""/>
                        <span>Главная</span>
                    </Link>
                </div>
                <div>
                    <Link to="/settings" className="sidebar__link">
                        <img src={SettingsIcon} alt=""/>
                        <span>Настройки</span>
                    </Link>
                </div>
                {store.user.roles.includes("admin") ?
                    <div className="sidebar__link" onClick={() => navigate("/admin")}>
                        <img src={ProfileIcon} alt=""/>
                        <span>Админ панель</span>
                    </div>
                    : null}
            </div>
            <div className="admin">
                <button className="admin__button" onClick={() => navigate("/admin/tests")}>
                    Тесты
                </button>
                <button className="admin__button" onClick={() => navigate("/admin/questions")}>
                    Вопросы
                </button>
            </div>
        </div>
    );
};

export default observer(Admin);