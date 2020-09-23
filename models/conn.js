const host = 'lallah.db.elephantsql.com';
const databse = 'afyqxacf';
const user = 'afyqxacf';
const password = 'CsHFfCBaULA9HGJC4bm9kQlaAJ8dsDXH';


//gives access to (postgres promise library)
const pgp = require('pg-promise')({
    query: function (e) {
        console.log('QUERY:', e.query);
    }
});

const options = {
    host: host,
    databse: databse,
    user: user,
    password: password
};

const db = pgp(options);

module.exports = db;