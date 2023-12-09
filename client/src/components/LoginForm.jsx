import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store} = useContext(Context);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="password"
            />
            <button onClick={() => store.login(email, password)}>
                <Link to="/app">Логин</Link>
            </button>
            <button onClick={() => store.registration(email, password)}>
                <Link to="/app">Регистрация</Link>
            </button>
        </div>
    );
};

export default LoginForm;
