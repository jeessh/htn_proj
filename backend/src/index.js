const express = require('express');
const cors = require('cors');
const app = express();

require('./db/db_config');
require('dotenv').config();


// options for cors middleware
const options = {
    origin: "*",
    credentials: true,
    preflightContinue: false,
};
// add cors middleware to our app
app.use(cors(options));
app.use(express.json());

app.use("/", require('./routes/authRouter.js'));
app.use("/", require('./routes/currentJobRouter.js'));
app.use("/", require('./routes/matchingRouter.js'));
app.use("/", require('./routes/offerRouter.js'));
app.use("/", require('./routes/ratingRouter.js'));
app.use("/", require('./routes/userRouter.js'));
app.use("/", require('./routes/worker.serviceRouter.js'));

app.listen(process.env.PORT, ()=>{
    console.log('Running on port '+ process.env.PORT);
});