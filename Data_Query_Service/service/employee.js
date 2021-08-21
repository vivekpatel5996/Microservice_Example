const knex = require('../config/knex');

const getEmployees = async (req, res) => {
    console.log(req.query);
    let limit = +req.query.limit;
    let offset = +(req.query.page * limit);
    console.log('limit', limit, '--offset', offset);
    let employees = await knex.select().from('employees').orderBy('employeeid').limit(limit).offset(offset);
    res.json({ employees }); w
};


const getCompanyEmployees = async (req, res) => {
    console.log(req.query);
    let employees = await knex('employees').where('company', req.query.company);
    res.json({ employees });
}

module.exports = { getEmployees, getCompanyEmployees };
