const express = require('express');
const app = express();
app.use(express.static(__dirname + '/build'));
app.listen(8080, ()=> console.log('up on 8080'));


// require('express')().use(require('express')
//  .static(__dirname + '/build')).listen(8080, () => console.log('client server up on 8080'));
