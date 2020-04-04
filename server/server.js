const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//above are all import statements
const PORT = process.env.PORT || 5000; //sets the port

app.use(express.static('server/public')); //serves all static files
app.use(bodyParser.urlencoded({ extended: true })); //allows me to use the Front End Created
app.use(bodyParser.json()); //allows me to use Postman

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
}); //lets me serve static files
