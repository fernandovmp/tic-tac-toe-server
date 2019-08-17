const express = require('express');
const routes = require('./routes');
const moongose = require('mongoose');
require('dotenv/config');

const app = express();

const port = process.env.PORT || 3000;
const connectionString = process.env.CONNECTION_STRING;

moongose.connect(connectionString,
{
   useNewUrlParser: true
});
app.use(express.json());
app.use(routes);

app.listen(port, () => {
   console.log(`Server running on port ${port}`); 
});