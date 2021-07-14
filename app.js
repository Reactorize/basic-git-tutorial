// GET EXPRESS AND CREATE APP
const express = require('express');
const app = express();
const connectDB = require('./database/connect');
require('dotenv').config();
// CREATE A GET REQUEST
app.get('/', (req, res) => {
    let result = "";
    result = `<h1>The Heading</h1>`;
    res.status(200).send(result)
})
// 404 PAGE
app.all('*', (req, res) => {
  res.status(404).send('<h1>resource not found</h1>')
})

// CONNECT TO DATABASE AND START SERVER
const port = 3500;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB);
        app.listen(port, console.log(`The server is now running on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}
start();
