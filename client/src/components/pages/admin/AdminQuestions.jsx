import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React from "react";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";

const AdminQuestions = () => {
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
                <Link to="/profile">Вернуться к профилю</Link>
            </div>
        )
    }

    const editedQuestionSetting = (question) => {
        store.setEditedQuestion(question);
        navigate(`/admin/questions/edit/${question._id}`);
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
            <div className="questions">
                <Link to="/admin/questions/new">Добавить новый вопрос</Link>
                <div>
                    {store.allQuestions.map((question) => (
                        <div key={question._id} className="question">
                            {question.text}
                            <button onClick={() => store.deleteQuestion(question._id)}>Удалить</button>
                            <button onClick={() => editedQuestionSetting(question)}>Редактировать</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default observer(AdminQuestions);