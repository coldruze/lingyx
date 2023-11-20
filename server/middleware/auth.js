const ApiError = require("../exceptions/apiError"),
    TokenService = require("../services/tokenService")

module.exports = function (req, res, next) {
    try {
        const token = req.headers["authorization"];

        if (!token) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(token);

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}