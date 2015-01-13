/**
 * Created by markstruik on 12/01/15.
 */
'use strict';


angular.module('Game', ['underscore'])
  .service('GameManager', function (_) {
    var vm = this;

    vm.items = undefined;
    vm.width = 0;
    vm.height = 0;

    vm.newGame = function (width, height) {
      vm.items = [];
      vm.width = width;
      vm.height = height;

      _.each(_.range(height), function () {
        var row = [];
        _.each(_.range(width), function () {
          row.push(0);
        });
        vm.items.push(row);
      });

    };

    vm.setValue = function (x, y, value) {
      vm.items[x][y] = value;
    };

    vm.tick = function () {
      var cloneItems = createDeepCopy(vm.items);
      _.each(cloneItems, function (row, ri) {
        _.each(row, function (column, ci) {
          var neighbours = [];
          // check items one row up
          var oneRowUp = cloneItems[ri - 1];
          if (oneRowUp) {
            neighbours.push(oneRowUp[ci - 1] || 0);
            neighbours.push(oneRowUp[ci] || 0);
            neighbours.push(oneRowUp[ci + 1] || 0);
          } else {
            neighbours.push(0);
            neighbours.push(0);
            neighbours.push(0);
          }

          var oneRowDown = cloneItems[ri + 1];
          if (oneRowDown) {
            neighbours.push(oneRowDown[ci - 1] || 0);
            neighbours.push(oneRowDown[ci] || 0);
            neighbours.push(oneRowDown[ci + 1] || 0);
          } else {
            neighbours.push(0);
            neighbours.push(0);
            neighbours.push(0);
          }

          neighbours.push(row[ci - 1] || 0);
          neighbours.push(row[ci + 1] || 0);

          var liveNeighbours = _.reduce(neighbours, function (memo, num) {
            return memo + (num ? num : 0);
          }, 0);
          var newState =
            // less than 2 neighbours it dies
            liveNeighbours < 2 ? 0 :
              // more than 3 neighbours it dies
              liveNeighbours > 3 ? 0 :
                // exactly 3 neighbours always life
                liveNeighbours == 3 ? 1 :
                  // exactly 2 you stay what you are
                  vm.items[ri][ci];

          vm.items[ri][ci] = newState;
        });
      });
    };

    function createDeepCopy(org) {
      var result = [];
      _.each(org, function (row, ri) {
        var cols = [];
        _.each(row, function (column, ci) {
          cols.push(org[ri][ci] > 0 ? 1 : 0);
        });
        result.push(cols);
      });
      return result;
    }
  });
