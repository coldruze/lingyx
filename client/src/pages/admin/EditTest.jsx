import {observer} from "mobx-react-lite";
import {useAuth} from "../../utils/authUtils";
import React, {useState} from "react";
import LoginForm from "../auth/LoginForm";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../assets/app/test-icon.png";
import ProfileIcon from "../../assets/app/profile-icon.png";
import SettingsIcon from "../../assets/app/settings-icon.png";

const EditTest = () => {
    const navigate = useNavigate();
    const {store, isAuth, isLoading} = useAuth();
    const [testTitle, setTestTitle] = useState(store.editedTest.title);
    const [questionsIds, setQuestionsIds] = useState(store.editedTest.questions);

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

    const addQuestion = (questionId) => {
        setQuestionsIds([...questionsIds, questionId]);
    };

    const removeQuestion = (questionId) => {
        setQuestionsIds(questionsIds.filter(id => id !== questionId));
    };

    const handleFunc = (testTitle, questionsIds) => {
        store.editTest(store.editedTest.title, testTitle, questionsIds).then(() => navigate(-1));
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
            <div className="admin">
                <input
                    className="admin__input"
                    onChange={e => setTestTitle(e.target.value)}
                    value={testTitle}
                    type="text"
                    placeholder="Название теста"
                />
                <div>
                    {store.allQuestions.map((question) => (
                        <div className="admin-item" key={question._id}>
                            <p>{question.text}</p>
                            {questionsIds.includes(question._id) ? (
                                <button className="admin-item__button" onClick={() => removeQuestion(question._id)}>Удалить</button>
                            ) : (
                                <button className="admin-item__button" onClick={() => addQuestion(question._id)}>Добавить</button>
                            )}
                        </div>
                    ))}
                </div>
                <button className="admin__button" onClick={() => handleFunc(testTitle, questionsIds)}>
                    Редактировать
                </button>
            </div>
        </div>
    );
};

export default observer(EditTest);