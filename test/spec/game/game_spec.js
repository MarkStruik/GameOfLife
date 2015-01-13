/**
 * Created by markstruik on 12/01/15.
 */
describe('Game Module', function(){
  describe('GameManager', function(){
    // inject module
    beforeEach(module('Game'));

    var gameManager; // instance of the GameManager
    beforeEach(inject(function (GameManager) {
      gameManager = GameManager;
    }));

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
      it("should setValue on coords", function(){
        gameManager.newGame(4, 4);
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
      describe('Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.', function () {
        beforeEach(function () {
          gameManager.newGame(3, 3);
          gameManager.setValue(1, 1, 1);  // check item
        });

        it('given 0 neighbors it should die', function () {
          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(0);
        })

        it('given 1 neighbors it should die', function () {
          gameManager.setValue(2, 2, 1);
          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(0);
        })
      });

      describe('Any live cell with more than three live neighbours dies, as if by overcrowding.', function () {
        beforeEach(function () {
          gameManager.newGame(3, 3);
        });

        it('given 4 neighbours', function () {
          gameManager.items =
            [
              [1, 1, 0],
              [1, 1, 0], // test center item
              [1, 0, 0]
            ];
          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(0);
        });
      });

      describe('Any live cell with two or three live neighbours lives on to the next generation.', function () {
        beforeEach(function () {
          gameManager.newGame(3, 3);
          gameManager.setValue(1, 1, 1);  // check item
        });

        it('given 2 neighbours', function () {
          gameManager.setValue(0, 0, 1);
          gameManager.setValue(1, 0, 1);
          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(1);
        });

        it('given 3 neighbours', function () {
          gameManager.setValue(0, 0, 1);
          gameManager.setValue(1, 0, 1);
          gameManager.setValue(0, 1, 1);

          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(1);
        });
      });

      describe('Any dead cell with exactly three live neighbours becomes a live cell.', function () {
        it('given 3 neighbours', function () {
          gameManager.newGame(3, 3);
          gameManager.setValue(1, 1, 0);
          gameManager.setValue(0, 0, 1);
          gameManager.setValue(1, 0, 1);
          gameManager.setValue(0, 1, 1);

          gameManager.tick();
          expect(gameManager.items[1][1]).toBe(1);
        });
      });
    });


  });
});
