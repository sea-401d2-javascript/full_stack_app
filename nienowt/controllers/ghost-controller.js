// 'use strict';
// (function(){
//
// require('angular');
//
// angular.module('app',[])
//   .controller('ResourceController',['$http', function($http) {
//     const mainRoute;
//     this.ghosts = ['ghost'];
//
//     this.newGhost = {};
//     this.changedGhost = {};
//     this.humans = ['human'];
//     this.newHuman = {};
//     this.changedHuman = {};
//
//     this.routePath = function(resource, path) {
//       if (resource == 'human'){
//         mainRoute = 'http://localhost:3000/api/ghosts/'
//       }
//       if (resource == 'ghost'){
//         mainRoute = 'http://localhost:3000/api/ghosts/'
//       }
//     }
//
//     this.toggle = function(name){
//       if (this.editShow !== 'new') return this.editShow = 'new';
//       this.editShow = name;
//     };
//
//     this.confirmChange = function(resource, buttonName, curResource){
//       if (!this.editConfirmation) return this.editConfirmation = true;
//
//       if(buttonName === 'delete') return this.removeResource(resource);
//       if(buttonName === 'edit') return this.editResource(resource, curResource);
//     };
//
//     this.getResource = function() {
//       $http.get(mainRoute)
//       .then((results) => {
//         console.log(results);
//         this.resources = results.data;
//         console.log(results.data);
//       },(err) => {
//         if (err) console.log(err);
//       });
//     };
//
//     this.createResource = function(resource) {
//       $http.post(mainRoute, resource)
//       .then(() => {
//         this.resources.push(resource);
//         this.newResource = {};
//       });
//     };
//
//     this.editResource = function(changedResource, resource){
//       $http.put(mainRoute + '/' + resource._id, changedResource)
//       .then(() => {
//         this.resources = this.resources.filter((g) => g._id != resource._id);
//         this.resources.push(changedResource);
//       });
//     };
//
//     this.removeResource = function(resource){
//       $http.delete(mainRoute + '/' + resource._id)
//       .then(() => {
//         this.resources = this.resources.filter((g) => g._id != resource._id);
//       });
//     };
//               // doesnt work?
//     this.reset = function(){
//       this.editShow = 'new';
//       this.editconfirmation = !this.editconfirmation;
//       this.changedResource = {};
//     };
//   }])
//   .controller('TabController', function(){
//     this.tab = 'ghosts';
//     this.setTab = function(tab){
//       this.tab = tab;
//     };
//     this.active = function(tab){
//       return this.tab == tab;
//     };
//   })
//   // .controller('HumanController', ['$http', function($http) {
//   //   const mainRoute = 'http://localhost:3000/api/humans';
//   //   this.humans = ['human'];
//   //   this.editShow = 'new';
//   //   this.newHuman = {};
//   //   this.editconfirmation;
//   //   this.changedHuman = {};
//   //   this.toggle = function(name){
//   //     if (this.editShow !== 'new') return this.editShow = 'new';
//   //     this.editShow = name;
//   //   };
//   //   this.confirmChange = function(human, buttonName, curHuman){
//   //     if (!this.editConfirmation) return this.editConfirmation = true;
//   //     if(buttonName === 'delete') return this.removeHuman(human);
//   //     if(buttonName === 'edit') return this.editHuman(human, curHuman);
//   //   };
//   //
//   //   this.getHumans = function() {
//   //     $http.get(mainRoute)
//   //     .then((results) => {
//   //       console.log(results);
//   //       this.humans = results.data;
//   //       console.log(results.data);
//   //     },(err) => {
//   //       if (err) console.log(err);
//   //     });
//   //   };
//   //   this.createHuman = function(human) {
//   //     $http.post(mainRoute, human)
//   //     .then(() => {
//   //       this.humans.push(human);
//   //       this.newHuman = {};
//   //     });
//   //   };
//   //   this.editHuman = function(changedHuman, human){
//   //     $http.put(mainRoute + '/' + human._id, changedHuman)
//   //     .then(() => {
//   //       this.humans = this.humans.filter((g) => g._id != human._id);
//   //       this.humans.push(changedHuman);
//   //     });
//   //   };
//   //   this.removeHuman = function(human){
//   //     $http.delete(mainRoute + '/' + human._id)
//   //     .then(() => {
//   //       this.humans = this.humans.filter((g) => g._id != human._id);
//   //     });
//   //   };
//   //   this.reset = function(){
//   //     this.editShow = 'new';
//   //     this.changedHuman = {};
//   //     this.editConfirmation = false;
//   //   };
//   // }]);
// })()
