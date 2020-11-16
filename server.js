// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 7000
app.listen(port, ()=> console.log(`server is running on port ${port}`))

//get function

app.get('/all', sendData);

function sendData(req, res){
    res.send(projectData);
}


//post function
app.post('/add', addData);

function addData (req, res){
    console.log(req.body);
    newEntry ={
        date: req.body.date, 
        temp:  req.body.temp,
        content: req.body.content
    }
    projectData.push(newEntry);
}

app.post('/add', addData)

function addData(req, res) {
    projectData.temperature = req.body.temp;
    projectData.date = req.body.date;
    projectData.content = req.body.content;
    res.end();
    
}