import {Observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../../../index";
import {Link} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";

const TestPage = () => {
    const {store} = useContext(Context);

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
            )}
        </Observer>
    );
};

export default TestPage;