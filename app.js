// GET EXPRESS AND CREATE APP
const express = require('express');
const app = express();
const connectDB = require('./database/connect');
require('dotenv').config();
// CREATE A GET REQUEST
app.get('/', (req, res) => {
    let result = "";
    result = `<h1>The Heading</h1>`;
    res.send(result)
})
app.get('*'), (req,res) => {
    res.send('<h1>Page Not Found</h1><p>That page could not be found.</p>');
}
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
