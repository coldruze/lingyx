import {useContext, useEffect, useState} from 'react';
import UserService from '../services/UserService';
import {Context} from '../index';

export function useAuth() {
    const {store} = useContext(Context);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, [store]);

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    return {store, users, isLoading: store.isLoading, isAuth: store.isAuth, getUsers};
}
