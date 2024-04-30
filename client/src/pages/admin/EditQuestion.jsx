import {observer} from "mobx-react-lite";
import {useAuth} from "../../utils/authUtils";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../assets/app/test-icon.png";
import ProfileIcon from "../../assets/app/profile-icon.png";
import React, {useState} from "react";
import LoginForm from "../auth/LoginForm";
import SettingsIcon from "../../assets/app/settings-icon.png";

const EditQuestion = () => {
    const navigate = useNavigate();
    const {store, isAuth, isLoading} = useAuth();
    const [text, setText] = useState(store.editedQuestion.text);
    const [options, setOptions] = useState(store.editedQuestion.options);
    const [correctOption, setCorrectOption] = useState(store.editedQuestion.correctOption);

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

    const handleOptionsChange = (e) => {
        const value = e.target.value;
        const optionsArray = value.split(',');
        setOptions(optionsArray);
    };

    const handleFunc = (text, options, correctOption) => {
        store.editQuestion(store.editedQuestion._id, text, options, correctOption).then(() => navigate(-1));
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
            <div className="admin">
                <input
                    className="admin__input"
                    onChange={e => setText(e.target.value)}
                    value={text}
                    type="text"
                    placeholder="Вопрос"
                />
                <input
                    className="admin__input"
                    onChange={handleOptionsChange}
                    value={options}
                    type="text"
                    placeholder="Варианты ответа"
                />
                <input
                    className="admin__input"
                    onChange={e => setCorrectOption(parseInt(e.target.value, 10))}
                    value={correctOption}
                    type="number"
                    placeholder="Индекс ответа"
                />
                <button className="admin__button" onClick={() => handleFunc(text, options, correctOption)}>Редактировать</button>
            </div>
        </div>
    );
};

export default observer(EditQuestion);