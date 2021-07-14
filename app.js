// GET EXPRESS AND CREATE APP
const express = require('express');
const app = express();
const connectDB = require('./database/connect');
require('dotenv').config();

// CREATE A GET REQUEST
app.get('/', (req, res) => {
    res.status(200).send(`<h1>The Home Page</h1><p>To find out more about express framework, <a href="https://expressjs.com" target="express">view the documentation</a></p>.`)
})
// ANOTHER GET REQUEST
app.get('/about', (req, res) => {
    res.status(200).send(`<h1>The About Page</h1><p>This is the about page.</p>`)
})
// 404 PAGE
app.all('*', (req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>')
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
