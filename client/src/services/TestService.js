import $api from "../http";

export default class TestService {
    static async getAllTests() {
        return $api.get("/tests");
    }

    static async getQuestions(ids) {
        return $api.post("/getallquestions", {ids});
    }

    static async sendTestResult(userId, title, score) {
        return $api.post("/sendtestresult", {userId, title, score});
    }

    static async getTestsResult(userId) {
        return $api.post("/gettestsresult", {userId});
    }
}