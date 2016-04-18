describe('movie section', function() {
  var newMovie = element(by.model('newMovie.name'));
  var newMovieReleaseDate = element(by.model('newMovie.release_date'));
  var newMovieButton = element(by.buttonText('New Movie'));

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080');
  });

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Movie Database');
  });

  it('should start out blank', function() {
    expect(newMovie.getAttribute('value')).toEqual('');
  });
});
