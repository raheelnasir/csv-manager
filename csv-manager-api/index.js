const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/csv', require('./controller/csv-manager'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
