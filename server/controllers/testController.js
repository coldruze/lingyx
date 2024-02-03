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

    async getTest(req, res, next) {
        try {
            const {title} = req.body;
            const testData = await TestService.getTest(title);

            res.send(testData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TestController();