import {Observer} from "mobx-react-lite";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import {useAuth} from "../../../utils/authUtils";
import LoginForm from "../auth/LoginForm";

const TestPage = () => {
    const { store, isAuth } = useAuth();
    const [selectedOptions, setSelectedOptions] = useState(Array(store.questions.length).fill(null));
    const [testCompleted, setTestCompleted] = useState(false);
    const [score, setScore] = useState(0);

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

    if (!isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <Observer>
            {() => (
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
                        <div>
                            {store.questions.map((item, index) => (
                                <div key={index}>
                                    <div>
                                        {item.text}
                                    </div>
                                    <div>
                                        {item.options.map((option, optionIndex) => (
                                            <div key={optionIndex}>
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
                        {!testCompleted && <button onClick={handleTestCompletion}>Завершить тест</button>}
                        {testCompleted && <div>Результат: {score}/{store.questions.length}</div>}
                    </div>
                </div>
            )}
        </Observer>
    );
};

export default TestPage;