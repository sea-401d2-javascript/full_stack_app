(function() {
  angular.module('products')
  .controller('ProductController', ['$http', ProductController]);

  function ProductController ($http) {
    const productsRoute = 'http://localhost:3000/products';
    const productOneRoute = 'http://localhost:3000/products/:id';
    this.products = [];
    //product routes
      //get products route
    this.getProducts = function() {
      $http.get(productsRoute)
        .then((result) => {
          console.log(result.data);
          this.products = result.data;
        }, function(error) {
          console.log('error getting products');
        });
    };
    //resets product value in web form
    this.resetProduct = function(product) {
      $http.get(productsRoute + '/' + product._id)
      .then((res) => {
        this.products[this.products.indexOf(product)] = res.data;
      })
      .catch((err) => console.log(err));
    };
      //post product route
    this.createProduct = function(product) {
      $http.post(productsRoute, product)
        .then((res) => {
          this.products.push(product);
          this.newProduct = {};
        });
    };

    this.createProduct.rendered = null;

    this.updateProduct = function(product) {
      $http.put(productsRoute + '/' + product._id, product)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    };

    this.updateProduct.rendered = null;
      //delete product route
    this.deleteProduct = function(product) {
      $http.delete(productsRoute + '/' + product._id)
      .then((res) => {
        this.products = this.products.filter((p) => p._id != product._id);
      });
    };
  }
})();
