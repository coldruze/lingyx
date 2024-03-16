import {useContext, useEffect} from 'react';
import {Context} from '../index';

export function useAuth() {
    const {store} = useContext(Context);

    useEffect(() => {
        async function handle() {
            if (localStorage.getItem("token")) {
                await store.checkAuth();
                await store.getAllQuestions();
                await store.getAllTests();
                await store.getTestsResult(store.user.id);
            }
        }
        handle();
    }, [store]);

    return {store, isAuth: store.isAuth, isLoading: store.isLoading};
}
