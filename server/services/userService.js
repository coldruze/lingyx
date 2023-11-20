const UserModel = require("../models/userModel"),
    UserDto = require("../dto/userDto"),
    bcrypt = require("bcrypt"),
    ApiError = require("../exceptions/apiError"),
    TokenService = require("../services/tokenService")

class UserService {
    async register(email, password) {
        const user = await UserModel.findOne({email});

        if (user) {
            throw ApiError.BadRequest("Пользователь с такой почтой уже существует");
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await UserModel.create({email, password: hashPassword});
        const userData = new UserDto(newUser);
        const tokens = TokenService.generateTokens({...userData});
        await TokenService.saveToken(userData.id, tokens.refreshToken);

        return {user: userData, ...tokens};
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});

        if (!user) {
            throw ApiError.BadRequest("Пользователь не найден");
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль");
        }

        const userData = new UserDto(user);
        const tokens = TokenService.generateTokens({...userData});
        await TokenService.saveToken(userData.id, tokens.refreshToken);

        return {user: userData, ...tokens};
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }

        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {user: userDto, ...tokens};
    }

    async getAllUsers() {
        let users = await UserModel.find();

        for (let i = 0; i < users.length; i++) {
            users[i] = new UserDto(users[i]);
        }

        return users;
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }
}

module.exports = new UserService();