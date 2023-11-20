import React, {useContext, useEffect, useState} from "react";
import "./styles/index.scss";
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import UserService from "./services/UserService";

function App() {
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, []);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return (
            <h1>Загрузка...</h1>
        )
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm></LoginForm>
                <button onClick={getUsers}>Получить список пользователей</button>
            </div>
        )
    }

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь авторизован ${store.user.email}` : "Необходимо авторизоваться"}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <button onClick={getUsers}>Получить список пользователей</button>
            {users.map(user =>
                <h4 key={user.email}>{user.email}</h4>
            )}
        </div>
    );
}

export default observer(App);
