'use strict';
const express = require('express');

express()
  .use(require('body-parser').json())
  .use(express.static('./build'))
  .listen(8080, () => console.log('client-server speaking on 8080'));
