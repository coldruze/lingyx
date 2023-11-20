const jwt = require("jsonwebtoken"),
    config = require("../config.json"),
    TokenModel = require("../models/tokenModel")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.access_secret, {expiresIn: "10m"});
        const refreshToken = jwt.sign(payload, config.refresh_secret, {expiresIn: "30d"});

        return {accessToken, refreshToken};
    }

    async saveToken(userId, refreshToken) {
        await TokenModel.findOneAndUpdate({userId}, {refreshToken}, {upsert: true});
    }

    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, config.access_secret);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.refresh_secret);
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        return TokenModel.findOne({refreshToken});
    }

    async removeToken(refreshToken) {
        return TokenModel.deleteOne({refreshToken});
    }
}

module.exports = new TokenService();