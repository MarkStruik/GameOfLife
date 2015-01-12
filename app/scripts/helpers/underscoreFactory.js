/**
 * Created by markstruik on 12/01/15.
 */
var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; // assumes underscore has already been loaded on the page
});
