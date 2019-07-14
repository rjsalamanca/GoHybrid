const db = require('./conn');

class Users {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    static async searchUser(email) {
        try {
            const response = db.one(`
                SELECT id, password, email, f_name 
                FROM users 
                WHERE email = $1
            `, [email]);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async addUser(f_name, l_name, email, hashPW) {
        try {
            await db.none(`
                INSERT INTO users(f_name, l_name, email, password)
                VALUES($1,$2,$3,$4)`, [f_name, l_name, email, hashPW]);
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Users;