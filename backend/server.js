const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('Result'));
app.use(cors());
// Handle form submission
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    console.log("username >>> ", username);
    console.log("password >>> ", password);

    res.send({data: username});
});
app.post('/skydata', (req, res) => {
    const reqdata = req.body;
    console.log("realtime-data >>> ", reqdata);
    res.redirect(`http://localhost:3000?data=${reqdata}`);
    // res.send({data: reqdata});
});

// app should be your express app

// pass the same server to our websocket setup function
// the websocket server will the run on the same port
// accepting ws:// connections

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});

