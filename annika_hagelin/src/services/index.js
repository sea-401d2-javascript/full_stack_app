module.exports = function(app) {
  require('./resource.js')(app);
  require('./auth.js')(app);
};
