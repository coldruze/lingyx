import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store} = useContext(Context);

    return (
        <div className="auth">
            <div className="auth-form">
                <h1>Привет)</h1>
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
                <Link to="/app" className="auth__button-link">
                    <button className="auth__button" onClick={() => store.login(email, password)}>
                        Логин
                    </button>
                </Link>
                <div className="auth-register">
                    <p>Ещё не зарегистрированы?</p>
                    <p className="auth-register__button">
                        <Link to="/register" className="auth-register__link">Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
