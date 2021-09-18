const express = require('express');
const cors = require('cors');
const app = express();

require('./db/db_config');
require('dotenv').config();


// options for cors middleware
const options = {
    origin:["http://localhost:3000"],
    credentials: true,
    preflightContinue: false,
};
// add cors middleware to our app
app.use(cors(options));
app.use(express.json());

app.use("/", require('./routes/authRouter.js'));

app.listen(process.env.PORT, ()=>{
    console.log('Running on port '+ process.env.PORT);
});