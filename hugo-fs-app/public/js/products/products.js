(function() {
  angular.module('products')
  .controller('ProductController', ['$http', 'ResourceService', ProductController])
  .directive('productHeader', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/product-header.html'
    }
  })

  function ProductController ($http, ResourceService) {
    const productsRoute = 'http://localhost:3000/products';
    const productResource = ResourceService('products')
    this.products = [];
    //product routes
      //get products route
    this.getProducts = function() {
      productResource.getAll()
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
      productResource.create(customer)
        .then((res) => {
          this.products.push(product);
          this.newProduct = {};
        });
    };

    this.createProduct.rendered = null;

    this.updateProduct = function(product) {
      productResource.update(product)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
    };

    this.updateProduct.rendered = null;
      //delete product route
    this.deleteProduct = function(product) {
      productResource.delete(product)
      .then((res) => {
        this.products = this.products.filter((p) => p._id != product._id);
      });
    };
  }
})();
