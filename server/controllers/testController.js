const TestService = require("../services/testService")

class TestController {
    async addQuestion(req, res, next) {
        try {
            const {text, options, correctOption} = req.body;
            const questionData = await TestService.addQuestion(text, options, correctOption);

            return res.send(questionData);
        } catch (e) {
            next(e);
        }
    }

    async addTest(req, res, next) {
        try {
            const {testTitle, questionsId} = req.body;
            console.log(req.body)
            const testData = await TestService.addTest(testTitle, questionsId);

            return res.send(testData);
        } catch (e) {
            next(e);
        }
    }

    async getAllTests(req, res, next) {
        try {
            const tests = await TestService.getAllTests();

            return res.send(tests);
        } catch (e) {
            next(e);
        }
    }

    async getAllQuestionsById(req, res, next) {
        try {
            const {ids} = req.body;
            const questions = await TestService.getAllQuestionsById(ids);

            return res.send(questions);
        } catch (e) {
            next(e);
        }
    }

    async sendTestResult(req, res, next) {
        try {
            const {userId, title, score} = req.body;
            await TestService.sendTestResult(userId, title, score);
        } catch (e) {
            next(e);
        }
    }

    async getTestsResult(req, res, next) {
        try {
            const {userId} = req.body;
            const results = await TestService.getTestsResult(userId);

            return res.send(results);
        } catch (e) {
            next(e);
        }
    }

    async getAllQuestions(req, res, next) {
        try {
            const questions = await TestService.getAllQuestions();

            return res.send(questions);
        } catch (e) {
            next(e);
        }
    }

    async deleteTest(req, res, next) {
        try {
            const {testTitle} = req.body;
            const data = await TestService.deleteTest(testTitle);

            return res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async deleteQuestion(req, res, next) {
        try {
            const {questionId} = req.body;
            const data = await TestService.deleteQuestion(questionId);

            return res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async editQuestion(req, res, next) {
        try {
            const {questionId, text, options, correctOption} = req.body;
            const data = await TestService.editQuestion(questionId, text, options, correctOption);

            return res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async editTest(req, res, next) {
        try {
            const {oldTitle, title, questions} = req.body;
            const data = await TestService.editTest(oldTitle, title, questions);

            return res.send(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TestController();