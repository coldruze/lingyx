import $api from "../http";

export default class UserService {

    static async edit(firstName, secondName, email, oldEmail) {
        return $api.post("/editprofile", {firstName, secondName, email, oldEmail});
    }
}