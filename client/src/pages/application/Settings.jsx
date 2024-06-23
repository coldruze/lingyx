import TestIcon from "../../assets/app/test-icon.png";
import {Link, useNavigate} from "react-router-dom";
import ProfileIcon from "../../assets/app/profile-icon.png";
import React from "react";
import {useAuth} from "../../utils/authUtils";
import LoginForm from "../auth/LoginForm";
import {observer} from "mobx-react-lite";
import SettingsIcon from "../../assets/app/settings-icon.png";

const Settings = () => {
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

    const handleFunc = async () => {
        await store.logout();
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="application">
            <div className="sidebar">
                <div className="sidebar__title">
                    LingyX
                </div>
                <div>
                    <Link to="/" className="sidebar__link">
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
            <div className="settings">
                <h1>Настройки</h1>
                <p>{`Имя: ${store.user.firstName}`}</p>
                <p>{`Фамилия: ${store.user.secondName}`}</p>
                <p>{`Почта: ${store.user.email}`}</p>

                <button className="settings__button" onClick={() => navigate("/profile/edit")}>Редактировать профиль</button>
                <button className="settings__button" onClick={() => handleFunc()}>Выйти</button>
            </div>
        </div>
    );
};

export default observer(Settings);