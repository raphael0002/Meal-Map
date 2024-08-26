const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookRouter = require('./routes/cookRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const recipeRouter = require('./routes/recipeRoutes.js');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/",require("./routes/authRoute"));
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}


app.use('/api/recipe', recipeRouter);
app.use('/api/cook', cookRouter);
app.use('/api/user', userRouter);

app.use(errorHandlerMiddleware);

module.exports = app;