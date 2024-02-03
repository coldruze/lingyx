import TestIcon from "../../../assets/app/test-icon.png";
import {Link} from "react-router-dom";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";
import React from "react";
import {observer} from "mobx-react-lite";

const Tests = () => {
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
        </div>
    );
};

export default observer(Tests);