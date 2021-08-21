const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });
const fs = require('fs');
const produce = require("./produce");
const port = 8081;
const app = express();
app.use(bodyParser.json());


/**
 * @description Parsing employee data CSV file
 */
app.post('/employees', upload.single('file'), function (req, res) {
    csv.parseFile(req.file.path)
        .on("data", function (data) {
            let jsonFormtat = getJSONObject(data);
            //Producing each row from CSV
            produce(jsonFormtat).catch((err) => {
                console.error("error in producer: ", err)
            })
        })
        .on("end", function () {
            // remove temp file
            fs.unlinkSync(req.file.path);
            res.send({ "message": "success" });
        })
});

app.listen(port, () => {
    console.log(`Producer service listening on port ${port}`);
});

function getJSONObject(data) {
    return { 'name': data[0], 'phone': data[1], 'email': data[2], 'company': data[3] }
}