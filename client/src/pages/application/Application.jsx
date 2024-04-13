import React from 'react';
import {useAuth} from '../../utils/authUtils';
import LoginForm from "../auth/LoginForm";
import {Link, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import TestIcon from "../../assets/app/test-icon.png";
import ProfileIcon from "../../assets/app/profile-icon.png";
import SettingsIcon from "../../assets/app/settings-icon.png";

const Application = () => {
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

    const handleTestClick = async (title) => {
        await store.getQuestionsByTestTitle(title);
        navigate(`/tests/${title}`);
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
            <div className="application-content">
                <div className="content">
                    <div className="profile">
                        <div className="profile-info">
                            <h1>Привет {store.user.firstName}!</h1>
                            <p>Рады тебя видеть</p>
                        </div>
                    </div>
                    <div className="tests">
                        <h1>Список тестов</h1>
                        <div className="tests-content">
                            {store.testsTitles.map(title => (
                                <div className="tests-block">
                                    <p>{title}</p>
                                    <button className="tests-button" key={title} onClick={() => handleTestClick(title)}>
                                        Перейти к тесту
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="progress">
                    <h1>Прогресс</h1>
                    {store.results.map((result, resultIndex) => (
                        <div className="progress-block" key={resultIndex}>
                            <span>{resultIndex + 1}) {result.title}</span>
                            <p>{result.score} правильных ответов</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default observer(Application);
