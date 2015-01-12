/**
 * Created by markstruik on 12/01/15.
 */
describe('Game Module', function(){
  describe('GameManager', function(){
    // inject module
    beforeEach(module('Game'));

    var $scope, $controller;
    beforeEach(inject(function($rootScope, _$controller_){
      $scope = $rootScope;
      $controller = _$controller_;
    }));


    var gameManager; // instance of the GameManager
    beforeEach(function(){
      gameManager = $controller('GameManager', {$scope : $scope});
    });


    it('should have no items upon creation', function(){
      expect(gameManager.items).toBeUndefined();
    });

    describe('.newGame', function(){
      it('should create a new board with given width and height', function(){
        gameManager.newGame(4,4);
        var expected = [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
        ];

        expect(gameManager.items).toEqual(expected);
      });
    });

    describe('.setValue', function(){
      beforeEach(function(){
        gameManager.newGame(4,4);
      });

      it("should setValue on coords", function(){
        gameManager.setValue(0,0,1);
        gameManager.setValue(1,1,1);
        gameManager.setValue(2,2,1);
        gameManager.setValue(3,3,1);
        var expected = [
          [1,0,0,0],
          [0,1,0,0],
          [0,0,1,0],
          [0,0,0,1]
        ];

        expect(gameManager.items).toEqual(expected);
      });
    });

    describe('.tick', function(){
      describe('Any live cell with fewer than two live neighbours dies, ' +
      'as if caused by underpopulation.', function(){
        it('given 1 neighbor it should die', function(){
          gameManager.newGame(4,4);
          gameManager.setValue(1,1,1);
          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(0);
        })
      });

      it('Any live cell with more than three live neighbours dies, as if by overcrowding.', function(){

      });

      it('Any live cell with two or three live neighbours lives on to the next generation.', function(){

      });

      it('Any dead cell with exactly three live neighbours becomes a live cell.', function(){

      });
    });


  });
});
