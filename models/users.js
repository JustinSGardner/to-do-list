'use strict'

const db = require('./conn'),
    bcrypt = require('bcryptjs');

class usersModel {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async save() {
        try {
            const response = await db.one(`INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNing id;`, [this.name, this.email, this.password]);
            console.log('User was created with ID:', response.id);
            return response;
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }


    async login() {
        try {
            const response = await db.one(`SELECT id, user_name, email, password FROM users WHERE email = $1;`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            console.log('is valid?', isValid);
            if (!!isValid) {
                const { user_name, id } = response;
                return { isValid, user_name, user_id: id };
            } else {
                return { isValid }
            }
        } catch (error) {
            console.error('ERROR:', error.message);
            return error.message;
        }
    }

}
module.exports = usersModel;