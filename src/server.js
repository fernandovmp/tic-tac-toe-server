const express = require('express');
const routes = require('./routes');
const moongose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const cookieParser = require('cookie-parser');
const app = express();

const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTION_STRING;

moongose.connect(connectionString,
{
   useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(port, () => {
   console.log(`Server running on port ${port}`); 
});