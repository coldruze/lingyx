const QuestionModel = require("../models/questionModel"),
    TestModel = require("../models/testModel"),
    TestDto = require("../dto/testDto"),
    UserDto = require("../dto/userDto"),
    QuestionDto = require("../dto/questionDto");

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

    async getAllTests() {
        let tests = await TestModel.find();

        for (let i = 0; i < tests.length; i++) {
            tests[i] = new TestDto(tests[i]);
        }

        return tests;
    }

    async getQuestionById(id) {
        let question = await QuestionModel.findById(id);
        question = new QuestionDto(question);

        return question;
    }

    async getAllQuestionsById(ids) {
        let questions = [];

        for (let i = 0; i < ids.length; i++) {
            let question = await QuestionModel.findById(ids[i]);
            questions.push(question);
        }

        return questions;
    }
}

module.exports = new TestService();