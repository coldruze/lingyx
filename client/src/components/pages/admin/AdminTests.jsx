import {observer} from "mobx-react-lite";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React from "react";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";

const AdminTests = () => {
    const navigate = useNavigate();
    const {store, isAuth} = useAuth();

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

    const editedTestSetting = async (testTitle) => {
        await store.getQuestionsByTestTitle(testTitle);

        let questionsIds = [];
        store.questions.map((question) => {
            questionsIds.push(question._id);
            return null;
        });

        const test = {title: testTitle, questions: questionsIds};

        store.setEditedTest(test);
        await store.getAllQuestions();
        navigate(`/admin/tests/edit/${test.title}`);
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
            <div className="tests">
                <Link to="/admin/tests/new">
                    <button onClick={() => store.getAllQuestions()}>
                        Создать новый тест
                    </button>
                </Link>
                <div>
                    {store.testsTitles.map((testTitle, index) => (
                        <div key={index}>
                            <p>{testTitle}</p>
                            <button onClick={() => store.deleteTest(testTitle)}>Удалить</button>
                            <button onClick={() => editedTestSetting(testTitle)}>Редактировать</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default observer(AdminTests);