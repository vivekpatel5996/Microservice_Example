module.exports = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'newpassword',
        database: 'mytestdb'
    }
});