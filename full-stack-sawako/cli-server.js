'use strict';
require('express')().use(require('express')
  .static(__dirname + '/build'))
  .listen(8080, ()=> console.log('Cli-server on port 8080!!'));
