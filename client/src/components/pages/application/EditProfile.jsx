import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import {observer} from "mobx-react-lite";
import SettingsIcon from "../../../assets/app/settings-icon.png";

const EditProfile = () => {
    const navigate = useNavigate();
    const {store, isAuth, isLoading} = useAuth();
    const [firstName, setFirstName] = useState(store.user.firstName);
    const [secondName, setSecondName] = useState(store.user.secondName);
    const [email, setEmail] = useState(store.user.email);

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

    const handleFunc = (firstName, secondName, email) => {
        store.editProfile(firstName, secondName, email).then(() => navigate(-1));
    };

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
            <div className="edit">
                <input className="edit__input"
                       onChange={e => setFirstName(e.target.value)}
                       value={firstName}
                       type="text"
                       placeholder="Имя"
                />
                <input className="edit__input"
                       onChange={e => setSecondName(e.target.value)}
                       value={secondName}
                       type="text"
                       placeholder="Фамилия"
                />
                <input className="edit__input"
                       onChange={e => setEmail(e.target.value)}
                       value={email}
                       type="text"
                       placeholder="Почта"
                />
                <button className="edit__button" onClick={() => handleFunc(firstName, secondName, email)}>
                    Изменить данные
                </button>
            </div>
        </div>
    );
};

export default observer(EditProfile);