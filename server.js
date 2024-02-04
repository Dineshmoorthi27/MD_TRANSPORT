const express = require('express');
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
app.use(express.json())
const usersRoute = require('./routes/usersRoute')
const busesRote = require('./routes/busesRoute');

app.use('/api/users', usersRoute)
app.use('/api/buses', busesRote)
app.listen(port, () => console.log(`Nodejs server listening on port ${port}`));
