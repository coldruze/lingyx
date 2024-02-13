import $api from "../http";

export default class TestService {
    static async getAllTests() {
        return $api.get("/tests");
    }

    static async getQuestions(ids) {
        return $api.post("/getallquestions", {ids});
    }
}