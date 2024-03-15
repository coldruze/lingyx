import TestIcon from "../../../assets/app/test-icon.png";
import {Link, useNavigate} from "react-router-dom";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React from "react";
import {observer} from "mobx-react-lite";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";

const Tests = () => {
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
                    <Link to="/tests" className="sidebar__link">
                        <img src={TestIcon} alt=""/>
                        <span>Тесты</span>
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
            <div className="test">
                <h1>Список тестов</h1>
                <div>
                    {store.testsTitles.map(title => (
                        <button key={title} onClick={() => handleTestClick(title)}>
                            {title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default observer(Tests);