module.exports = class QuestionDto {
    text;
    options;
    correctOption;

    constructor(model) {
        this.text = model.text;
        this.options = model.options;
        this.correctOption = model.correctOption;
    }
}