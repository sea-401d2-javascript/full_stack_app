describe('movie section', function() {
  var newMovieName = element(by.model('newMovie.name'));
  var newMovieReleaseDate = element(by.model('newMovie.release_date'));
  var newMovieButton = element(by.buttonText('New Movie'));
  var deleteButton = element(by.buttonText('Delete'));
  var editButton = element(by.buttonText('Edit'));
  var editMovieName = element(by.model('movEdit.name'));
  var editMovieReleaseDate = element(by.model('movEdit.release_date'));

  beforeEach(function() {
    browser.get('http://127.0.0.1:8080');
  });

  it('should have the correct title', function() {
    expect(browser.getTitle()).toEqual('Movie Database');
  });

  it('should start out blank', function() {
    expect(newMovieName.getAttribute('value')).toEqual('');
  });

  it('should be able to add a movie', function() {
    newMovieName.clear();
    newMovieName.sendKeys('The Godfather');
    newMovieReleaseDate.sendKeys('12201974');
    newMovieButton.click();

    expect(newMovieName.getAttribute('value')).toEqual('The Godfather');
    expect(newMovieReleaseDate.getAttribute('value')).toEqual('1974-12-20');
  });

  it('should be able to bring up the edit window', function() {
    editButton.click();
    expect(editMovieName.getAttribute('value')).toEqual('');
    expect(editMovieReleaseDate.getAttribute('value')).toEqual('');
  });
});
