import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import TestService from "../services/TestService";
import UserService from "../services/UserService";

export default class Store {
    user = {};
    isAuth = false;
    isLoading = false;
    testsTitles = [];
    currentTestTitle = "";
    tests = {};
    questions = [];
    results = [];
    allQuestions = [];
    editedQuestion = {};
    editedTest = {};

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user) {
        this.user = user;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setTestsTitles(titles) {
        this.testsTitles = titles;
    }

    setCurrentTestTitle(title) {
        this.currentTestTitle = title;
    }

    setTests(tests) {
        this.tests = tests;
    }

    setQuestions(questions) {
        this.questions = questions;
    }

    setResults(results) {
        this.results = results;
    }

    setAllQuestions(allQuestions) {
        this.allQuestions = allQuestions;
    }

    setEditedQuestion(editedQuestion) {
        this.editedQuestion = editedQuestion;
    }

    setEditedTest(editedTest) {
        this.editedTest = editedTest;
    }

    async registration(firstName, secondName, email, password) {
        try {
            const response = await AuthService.registration(firstName, secondName, email, password);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem("token");
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async editProfile(firstName, secondName, email) {
        try {
            const response = await UserService.edit(firstName, secondName, email, this.user.email);
            console.log(response);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);

        try {
            const response = await axios.get(
                `${API_URL}/refresh`, {withCredentials: true}
            );
            localStorage.setItem("token", response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }

    async getAllTests() {
        try {
            const response = await TestService.getAllTests();
            const testsData = response.data;
            let titles = [];
            let tests = {};

            for (let i = 0; i < testsData.length; i++) {
                let title = testsData[i]["title"];
                tests[title] = testsData[i]["questions"];
                titles.push(title);
            }

            this.setTestsTitles(titles);
            this.setTests(tests);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getQuestionsByTestTitle(title) {
        try {
            const questionsIds = this.tests[title];
            const response = await TestService.getQuestions(questionsIds);
            const questions = response.data;

            this.setQuestions(questions);
            this.setCurrentTestTitle(title);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async sendTestResult(userId, title, score) {
        try {
            await TestService.sendTestResult(userId, title, score);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getTestsResult(userId) {
        try {
            const response = await TestService.getTestsResult(userId);
            const results = response.data;

            this.setResults(results);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getAllQuestions() {
        try {
            const response = await TestService.getAllQuestions();
            const allQuestions = response.data;

            this.setAllQuestions(allQuestions);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async createNewTest(testTitle, questionsId) {
        try {
            const response = await TestService.createNewTest(testTitle, questionsId);

            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteTest(testTitle) {
        try {
            const response = await TestService.deleteTest(testTitle);
            await this.getAllTests();

            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async createNewQuestion(text, options, correctOption) {
        try {
            const response = await TestService.createNewQuestion(text, options, correctOption);

            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async deleteQuestion(questionId) {
        try {
            const response = await TestService.deleteQuestion(questionId);
            await this.getAllQuestions();

            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async editQuestion(questionId, text, options, correctOption) {
        try {
            const response = await TestService.editQuestion(questionId, text, options, correctOption);
            await this.getAllQuestions();

            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async editTest(oldTitle, title, questions) {
        try {
            const response = await TestService.editTest(oldTitle, title, questions);

            console.log(response.data);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}