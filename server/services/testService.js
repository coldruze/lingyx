const QuestionModel = require("../models/questionModel"),
    QuestionDto = require("../dto/questionDto"),
    TestModel = require("../models/testModel"),
    TestDto = require("../dto/testDto"),
    ResultModel = require("../models/resultModel"),
    ResultDto = require("../dto/resultDto");

class TestService {
    async addQuestion(text, options, correctOption) {
        const question = await QuestionModel.findOne({text});

        if (question) {
            throw Error("Такой вопрос уже существует");
        }

        return await QuestionModel.create({text, options, correctOption});
    }

    async addTest(title, questions) {
        const test = await TestModel.findOne({title});

        if (test) {
            throw Error("Такой тест уже существует");
        }

        return await TestModel.create({title, questions});
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

    async sendTestResult(userId, title, score) {
        await ResultModel.findOneAndUpdate({userId, title}, {score}, {upsert: true});
    }

    async getTestsResult(userId) {
        let results = await ResultModel.find({userId});

        for (let i = 0; i < results.length; i++) {
            results[i] = new ResultDto(results[i]);
        }

        return results;
    }

    async getAllQuestions() {
        return QuestionModel.find();
    }

    async deleteTest(testTitle) {
        return TestModel.deleteOne({title: testTitle});
    }

    async deleteQuestion(questionId) {
        return QuestionModel.deleteOne({_id: questionId});
    }
}

module.exports = new TestService();