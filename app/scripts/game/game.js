/**
 * Created by markstruik on 12/01/15.
 */
'use strict';


angular.module('Game',['underscore'])
  .controller('GameManager', function(_){
    var vm = this;

    vm.items = undefined;
    vm.width = 0;
    vm.height = 0;

    vm.newGame = function(width, height){
      vm.items = [];
      vm.width = width;
      vm.height = height;

      _.each(_.range(height),function(){
        var row = [];
        _.each(_.range(width), function(){
          row.push(0);
        });
        vm.items.push(row);
      });

    };

    vm.setValue = function(x, y, value){
      vm.items[x][y] = value;
    };

    vm.tick = function(){
      var cloneItems = vm.items.slice(0);

      vm.items[1][1] = 0;
    };

  });
