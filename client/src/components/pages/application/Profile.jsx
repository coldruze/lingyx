import TestIcon from "../../../assets/app/test-icon.png";
import {Link} from "react-router-dom";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React from "react";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";
import {observer} from "mobx-react-lite";

const Profile = () => {
    const {store, isAuth} = useAuth();

    if (!isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div className="application">
            <div className="sidebar">
                <div className="sidebar__title">
                        LingyX
                </div>
                <div>
                    <Link to="/tests" className="sidebar__link">
                        <img src={TestIcon} alt=""/>
                        <span onClick={() => store.getAllTests()}>Тесты</span>
                    </Link>
                </div>
                <div>
                    <Link to="/progress" className="sidebar__link">
                        <img src={ProgressIcon} alt=""/>
                        <span>Прогресс</span>
                    </Link>
                </div>
                <div>
                    <Link to="/profile" className="sidebar__link">
                        <img src={ProfileIcon} alt=""/>
                        <span>Профиль</span>
                    </Link>
                </div>
            </div>
            <div className="profile">
                <h1>{`Имя: ${store.user.firstName}`}</h1>
                <h1>{`Фамилия: ${store.user.secondName}`}</h1>
                <h1>{`Почта: ${store.user.email}`}</h1>

                <button onClick={() => store.logout()}><Link to="/">Выйти</Link></button>
                <Link to="/profile/edit">Редактировать</Link>
                {store.user.roles.includes("admin") ? <Link to="/admin">Админ панель</Link> : null}
                <Link to="/">На главную</Link>
            </div>
        </div>
    );
};

export default observer(Profile);