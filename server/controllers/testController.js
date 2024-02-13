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
            const {title, questions} = req.body;
            const testData = await TestService.addTest(title, questions);

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

    async getQuestionById(req, res, next) {
        try {
            const {id} = req.body;
            const question = await TestService.getQuestionById(id);

            return res.send(question);
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
}

module.exports = new TestController();