import $api from "../http";

export default class AuthService {
    static async registration(firstName, secondName, email, password) {
        return $api.post("/register", {firstName, secondName, email, password});
    }

    static async login(email, password) {
        return $api.post("/login", {email, password});
    }

    static async logout() {
        return $api.get("/logout");
    }
}