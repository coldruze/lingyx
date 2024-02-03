const QuestionModel = require("../models/questionModel"),
    TestModel = require("../models/testModel")

class TestService {
    async addQuestion(text, options, correctOption) {
        const question = await QuestionModel.findOne({text});

        if (question) {
            throw Error("Такой вопрос уже существует");
        }

        const newQuestion = await QuestionModel.create({text, options, correctOption});

        return newQuestion;
    }

    async addTest(title, questions) {
        const test = await TestModel.findOne({title});

        if (test) {
            throw Error("Такой вопрос уже существует");
        }

        const newTest = await TestModel.create({title, questions});

        return newTest;
    }

    async getTest(title) {
        const test = await TestModel.findOne({title});
        const questions = [];

        for (let i = 0; i < test.questions.length; i++) {
            let questionId = test.questions[i];
            let question = await QuestionModel.findById(questionId);
            questions.push(question);
        }

        return questions;
    }
}

module.exports = new TestService();