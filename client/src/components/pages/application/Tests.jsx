import TestIcon from "../../../assets/app/test-icon.png";
import {Link} from "react-router-dom";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const Tests = () => {
    const {store} = useContext(Context);

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
                            <button key={title} onClick={() => store.getQuestionsByTestTitle(title)}>
                                {title}
                            </button>
                        ))}
                    </div>
                    <div>
                        {store.questions.map((item, index) => (
                            <div key={index}>
                                <div>
                                    {item["text"]}
                                </div>
                                <div>
                                    {item["options"].map((option, optionIndex) => (
                                        <div key={optionIndex}>
                                            {option}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(Tests);