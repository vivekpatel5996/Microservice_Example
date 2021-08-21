const express = require('express');
const bodyParser = require('body-parser');
const consume = require("./consume")
const port = 8082;
const app = express();
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Consumer service listening on port ${port}`);
});

consume().catch((err) => {
	console.error("error in consumer: ", err)
})
