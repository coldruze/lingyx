import $api from "../http";

export default class TestService {
    static async getAllTests() {
        return $api.get("/tests");
    }

    static async getQuestions(ids) {
        return $api.post("/getquestions", {ids});
    }

    static async sendTestResult(userId, title, score) {
        return $api.post("/sendtestresult", {userId, title, score});
    }

    static async getTestsResult(userId) {
        return $api.post("/gettestsresult", {userId});
    }

    static async getAllQuestions() {
        return $api.get("/getallquestions");
    }

    static async createNewTest(testTitle, questionsId) {
        return $api.post("/addtest", {testTitle, questionsId});
    }

    static async deleteTest(testTitle) {
        return $api.post("/deletetest", {testTitle});
    }

    static async createNewQuestion(text, options, correctOption) {
        return $api.post("/addquestion", {text, options, correctOption});
    }

    static async deleteQuestion(questionId) {
        return $api.post("/deletequestion", {questionId});
    }

    static async editQuestion(questionId, text, options, correctOption) {
        return $api.post("/editquestion", {questionId, text, options, correctOption});
    }

    static async editTest(oldTitle, title, questions) {
        return $api.post("/edittest", {oldTitle, title, questions});
    }
}