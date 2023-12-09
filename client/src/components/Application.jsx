import React from 'react';
import {useAuth} from '../utils/authUtils';
import LoginForm from "./LoginForm";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";

function Application() {
    const {store, users, isLoading, isAuth, getUsers} = useAuth();

    if (isLoading) {
        return <h1>Загрузка...</h1>;
    }

    if (!isAuth) {
        return (
            <div>
                <LoginForm/>
                <h3>Неверная почта или пароль</h3>
            </div>
        );
    }

    return (
        <div>
            <h1>{`Пользователь авторизован ${store.user.email}`}</h1>
            <button onClick={() => store.logout()}><Link to="/">Выйти</Link></button>
            <button onClick={getUsers}>Получить список пользователей</button>
            {users.map(user => (
                <h4 key={user.email}>{user.email}</h4>
            ))}
        </div>
    );
}

export default observer(Application);
