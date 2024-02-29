import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {API_URL} from "../http";
import TestService from "../services/TestService";

export default class UserStore {
    user = {};
    isAuth = false;
    isLoading = false;
    testsTitles = [];
    currentTestTitle = "";
    tests = {};
    questions = [];
    results = [];

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

            console.log(results);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
}