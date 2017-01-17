module.exports = function(app) {
  require('./error.js')(app);
  require('./auth.js')(app);
  require('./resource.js')(app);
};
