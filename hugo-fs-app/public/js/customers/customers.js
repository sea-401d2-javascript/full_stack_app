(function() {
  angular.module('customers')
  .controller('CustomerController', ['$http', 'ResourceService', CustomerController])
  .directive('customerHeader', function() {
    return {
      restrict: 'A',
      templateUrl: './templates/customer-header.html'
    };
  });

  function CustomerController ($http, ResourceService) {
    const customersRoute = 'http://localhost:3000/customers';
    const customerResource = ResourceService('customers')
    this.customers = [];
  //customer routes
    //get customers route
    this.getCustomers = function() {
      customerResource.getAll()
      .then((result) => {
        console.log(result.data);
        this.customers = result.data;
      }, function(error) {
        console.log('error in getting customers');
      });
    };
    //resets customer value in web form
    this.resetCustomer = function(customer) {
      console.log('reset customer hit!');
      $http.get(customersRoute + '/' + customer._id)
      .then((res) => {
        this.customers[this.customers.indexOf(customer)] = res.data;
      })
      .catch (err => console.log(err));
    };
    //post customers route
    this.createCustomer = function(customer) {
      customerResource.create(customer)
      .then((res) => {
        this.customers.push(customer);
        this.newCustomer = {};
      });
    };

    this.createCustomer.rendered = null;

    //put route
    this.updateCustomer = function(customer) {
      console.log(customer);
      customerResource.update(customer)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    };
    this.updateCustomer.rendered = null;
    //delete customers route
    this.removeCustomer = function(customer) {
      customerResource.remove(customer)
      .then((res) => {
        this.customers = this.customers.filter((c) => c._id != customer._id);
      });
    };
  }


})();
