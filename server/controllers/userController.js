const UserService = require("../services/userService")

class UserController {
    async registration(req, res, next) {
        try {
            const {firstName, secondName, email, password} = req.body;
            const userData = await UserService.register(firstName, secondName, email, password);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.send(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});

            return res.send(userData);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;

            const token = await UserService.logout(refreshToken);

            res.clearCookie("refreshToken");

            return res.send(token);
        } catch (e) {
            next(e);
        }
    }

    async editProfile(req, res, next) {
        try {
            const {firstName, secondName, email, oldEmail} = req.body;
            const userData = await UserService.editProfile(firstName, secondName, email, oldEmail);

            return res.send(userData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();