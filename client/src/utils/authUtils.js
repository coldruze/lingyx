import {useContext, useEffect} from 'react';
import {Context} from '../index';

export function useAuth() {
    const {store} = useContext(Context);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth();
        }
    }, [store]);

    return {store, isAuth: store.isAuth};
}
