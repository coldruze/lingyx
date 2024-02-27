import TestIcon from "../../../assets/app/test-icon.png";
import {Link, useNavigate} from "react-router-dom";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Tests = () => {
    const {store} = useContext(Context);
    const navigate = useNavigate();

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
                <button onClick={() => store.getAllTests()}>Получить список тестов</button>
                <div>
                    <div>
                        {store.testsTitles.map(title => (
                            <Link to={`/tests/${title}`}>
                                <button key={title} onClick={() => handleTestClick(title)}>
                                    {title}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Tests);