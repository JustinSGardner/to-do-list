const db = require('./conn');

class tasksList {
    constructor (tasks, completed) {
        this.tasks = tasks;
        this.completed = completed;

    }

    static async getAll() {
        try {
            const response = await db.any(`SELECT * FROM tasks;`);
            return response;
        } catch (error) {
            return error.message;
        }
    }
}




module.exports = tasksList;