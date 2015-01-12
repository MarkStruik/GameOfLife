/**
 * Created by markstruik on 12/01/15.
 */

angular.module('gameOfLifeApp')
  .controller('GameController', function(GameManager){
    var vm = this;

    vm.game = GameManager;
  });
