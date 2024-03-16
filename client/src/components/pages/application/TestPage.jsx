import {observer, Observer} from "mobx-react-lite";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";
import SettingsIcon from "../../../assets/app/settings-icon.png";

const TestPage = () => {
    const navigate = useNavigate();
    const { store, isAuth, isLoading } = useAuth();
    const [selectedOptions, setSelectedOptions] = useState(Array(store.questions.length).fill(null));
    const [testCompleted, setTestCompleted] = useState(false);
    const [score, setScore] = useState(0);

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

    const handleOptionSelect = (questionIndex, optionIndex) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[questionIndex] = optionIndex;
        setSelectedOptions(updatedOptions);
    };

    const calculateScore = () => {
        let score = 0;
        store.questions.forEach((question, index) => {
            if (selectedOptions[index] === question.correctOption) {
                score++;
            }
        });
        return score;
    };

    const handleTestCompletion = async () => {
        const testScore = calculateScore();
        setScore(testScore);
        setTestCompleted(true);
        console.log(testScore.toString() + "/" + store.questions.length.toString())
        await store.sendTestResult(store.user.id, store.currentTestTitle, testScore.toString() + "/" + store.questions.length.toString());
    };

    return (
        <Observer>
            {() => (
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
                    <div className="test">
                        <div className="test-content">
                            {store.questions.map((item, index) => (
                                <div className="test-block" key={index}>
                                    <span>
                                        {index+1}) {item.text}
                                    </span>
                                    <div>
                                        {item.options.map((option, optionIndex) => (
                                            <div className="test-item" key={optionIndex}>
                                                <input
                                                    type="radio"
                                                    name={`question${index}`}
                                                    checked={selectedOptions[index] === optionIndex}
                                                    onChange={() => handleOptionSelect(index, optionIndex)}
                                                />
                                                <label>{option}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {!testCompleted && <button className="test-finish__button" onClick={handleTestCompletion}>Завершить тест</button>}
                        {testCompleted && <div>Результат: {score}/{store.questions.length}</div>}
                        {testCompleted && <button className="test-finish__button" onClick={() => navigate("/app")}>Вернуться к тестам</button>}
                    </div>
                </div>
            )}
        </Observer>
    );
};

export default observer(TestPage);