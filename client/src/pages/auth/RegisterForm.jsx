import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Link} from "react-router-dom";

const RegisterForm = () => {
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store} = useContext(Context);

    return (
        <div className="auth">
            <div className="auth-form">
                <h1>Привет</h1>
                <input className="auth__input"
                       onChange={e => setFirstName(e.target.value)}
                       value={firstName}
                       type="text"
                       placeholder="Имя"
                />
                <input className="auth__input"
                       onChange={e => setSecondName(e.target.value)}
                       value={secondName}
                       type="text"
                       placeholder="Фамилия"
                />
                <input className="auth__input"
                       onChange={e => setEmail(e.target.value)}
                       value={email}
                       type="text"
                       placeholder="Почта"
                />
                <input className="auth__input"
                       onChange={e => setPassword(e.target.value)}
                       value={password}
                       type="password"
                       placeholder="Пароль"
                />
                <Link to="/" className="auth__button-link">
                    <button className="auth__button"
                            onClick={() => store.registration(firstName, secondName, email, password)}>
                        Регистрация
                    </button>
                </Link>
                <div className="auth-register">
                    <p>Уже есть аккаунт?</p>
                    <p className="auth-register__button">
                        <Link to="/login" className="auth-register__link">Авторизоваться</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
