const express = require('express');
const bodyParser = require('body-parser');
const employee = require("./service/employee");
const port = 8083;
const app = express();
app.use(bodyParser.json());

/**
 * @description Serves employees by limit and pagenumber
 * @queryParam limit 
 * @queryParam page starts from 0
 */
app.get('/employees/pagination', employee.getEmployees);


/**
 * @description filter employees by company
 * @queryParam company
 */
app.get('/employees/filter', employee.getCompanyEmployees);

app.listen(port, () => {
    console.log(`Consumer service listening on port ${port}`);
});


