import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";

const EditProfile = () => {
    const {store, isAuth} = useAuth();
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");

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
                <Link to="/app" className="edit__button-link">
                    <button className="edit__button"
                            onClick={() => store.edit(firstName, secondName, email)}>
                        Изменить данные
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default EditProfile;