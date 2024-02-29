module.exports = class ResultDto {
    title;
    score;

    constructor(model) {
        this.title = model.title;
        this.score = model.score;
    }
}