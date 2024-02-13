module.exports = class TestDto {
    title;
    questions;

    constructor(model) {
        this.title = model.title;
        this.questions = model.questions;
    }
}