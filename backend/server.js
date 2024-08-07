const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path : "./config.env"});
const app = require("./app");

const password = process.env.PASSWORD;
const DB = process.env.DATABASE_URL.replace("<password>", password);

mongoose.connect(DB)
    .then(() => console.log('Database connection established'));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));

