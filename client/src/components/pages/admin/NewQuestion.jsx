import {observer} from "mobx-react-lite";
import {useAuth} from "../../../utils/authUtils";
import React, {useState} from "react";
import LoginForm from "../auth/LoginForm";
import {Link} from "react-router-dom";
import TestIcon from "../../../assets/app/test-icon.png";
import ProgressIcon from "../../../assets/app/progress-icon.png";
import ProfileIcon from "../../../assets/app/profile-icon.png";

const NewQuestion = () => {
    const {store, isAuth} = useAuth();
    const [text, setText] = useState("");
    const [options, setOptions] = useState([]);
    const [correctOption, setCorrectOption] = useState(0);

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

    const handleOptionsChange = (e) => {
        const value = e.target.value;
        const optionsArray = value.split(',');
        setOptions(optionsArray);
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
                        <span onClick={() => store.getAllTests()}>Тесты</span>
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
                <input onChange={e => setText(e.target.value)}
                       value={text}
                       type="text"
                       placeholder="Вопрос"
                />
                <input onChange={handleOptionsChange}
                       value={options}
                       type="text"
                       placeholder="Варианты ответа"
                />
                <input onChange={e => setCorrectOption(parseInt(e.target.value, 10))}
                       value={correctOption}
                       type="number"
                       placeholder="Индекс ответа"
                />
                <button onClick={() => store.createNewQuestion(text, options, correctOption)}>Создать</button>
            </div>
        </div>
    );
};

export default observer(NewQuestion);