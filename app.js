// GET EXPRESS AND CREATE APP
const express = require('express');
const app = express();
const connectDB = require('./database/connect');
const path = require('path');
require('dotenv').config();

app.use(express.static('public'))

// EXPRESS METHODS
// app.get - read data
// app.post - insert data
// app.put - update data
// app.delete - delete data
// app.all - apply to all
// app.use - tells app to use specified middleware
// app.listen - activates server

// GLOBAL MIDDLEWARE
app.use(globalMiddleWare);

function globalMiddleWare(req,res,next) {
    console.log('This is an example of a global middleware.');
    req.customProperty = 100;
    next();
}

// ROUTE-SPECIFIC MIDDLEWARE
function middleWare(req,res,next) {
    console.log('This is an example of a route specific middleware.');
    next();
}

// CREATE A GET REQUEST
app.get('/', middleWare, (req, res) => {
    let exactPath = path.resolve(__dirname,'./public/index.html');
    res.status(200).send(`<img src="./blip-small.svg" style="width:150px"/><p>${exactPath}</p><h1>The Home Page</h1><p>To find out more about express framework, <a href="https://expressjs.com" target="express">view the documentation</a>.</p><p>The number '${req.customProperty}' is an example of data that one can pass to the get request from a middleware function.</p>`)
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
