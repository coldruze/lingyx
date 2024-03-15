import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React, {useState} from "react";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";

const NewTest = () => {
    const navigate = useNavigate();
    const { store, isAuth, isLoading } = useAuth();
    const [testTitle, setTestTitle] = useState("");
    const [questionsIds, setQuestionsIds] = useState([]);

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

    const addQuestion = (questionId) => {
        setQuestionsIds([...questionsIds, questionId]);
    };

    const removeQuestion = (questionId) => {
        setQuestionsIds(questionsIds.filter(id => id !== questionId));
    };

    const handleFunc = (testTitle, questionsIds) => {
        store.createNewTest(testTitle, questionsIds).then(() => navigate(-1));
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
            <div className="admin">
                <input
                    onChange={e => setTestTitle(e.target.value)}
                    value={testTitle}
                    type="text"
                    placeholder="Название теста"
                />
                <button onClick={() => store.getAllQuestions()}>Список вопросов</button>
                <div>
                    {store.allQuestions.map((question) => (
                        <div key={question._id} className="question">
                            {question.text}
                            {questionsIds.includes(question._id) ? (
                                <button onClick={() => removeQuestion(question._id)}>-</button>
                            ) : (
                                <button onClick={() => addQuestion(question._id)}>+</button>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={() => handleFunc(testTitle, questionsIds)}>Создать</button>
            </div>
        </div>
    );
};

export default observer(NewTest);