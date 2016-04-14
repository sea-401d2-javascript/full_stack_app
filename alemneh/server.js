'use strict';
let express = require('express');
let app = express();
let db = require('./models');
let bodyParser = require('body-parser');
let ideasRouter = express.Router();
let statsRouter = express.Router();
let studentsRouter = express.Router();
let loginRouter = express.Router();

require('./routes/ideas-routes')(ideasRouter, db);
require('./routes/stats-routes')(statsRouter, db);
require('./routes/students-routes')(studentsRouter, db);
require('./routes/login')(loginRouter, db);


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', ideasRouter);
app.use('/', loginRouter);
app.use('/', studentsRouter);





app.listen(3000, () => {
  console.log('Server running on port 3000');
});
