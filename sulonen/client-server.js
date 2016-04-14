'use strict';

let express = require('express');

const CLIENT_PORT = process.env.CLIENT_PORT || 8080;

let app = module.exports = exports = express();
app.use(express.static('./dist'));

app.listen(CLIENT_PORT, () => {
  console.log('Server listening on port ' + CLIENT_PORT);
});

