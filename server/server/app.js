const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const password = encodeURIComponent('h5AqHY%405ASxC');

const app = express();
const PORT = 8080;
mongoose.connect(`mongodb+srv://dbVavilov:${password}@cluster0-3dfjp.mongodb.net/graphql-tutorial?retryWrites=true&w=majority`, { useUnifiedTopology: true })

app.use(cors());

 app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Error: ${err}`));
dbConnection.on('open', () => console.log(`Connection to BD!`));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!')
});
