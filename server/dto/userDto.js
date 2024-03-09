module.exports = class UserDto {
    firstName;
    secondName;
    email;
    roles;
    id;

    constructor(model) {
        this.firstName = model.firstName;
        this.secondName = model.secondName;
        this.email = model.email;
        this.roles = model.roles;
        this.id = model._id;
    }
}