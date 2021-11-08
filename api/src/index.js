const express = require('express')
const app = express();

console.log('PORT', process.env.PORT);
const port = process.env.PORT;
const host = process.env.HOST;

app.get("/test", (req, res) => {
    res.send('Our api server is working correctly');
});

app.listen(port, () => {
    console.log(`Started api server on port: ${port}`);
    console.log(`On host ${host}`);
});