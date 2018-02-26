(function() {
    const $ = selector => document.querySelector(selector);

    function Game(size) {
        this.size = size;
        this.board = this.initializeBoard(size);
    };

    Game.prototype.initializeBoard = function() {
        return new Array(this.size)
            .fill([])
            .map(i => new Array(this.size).fill(0));
    };

    Game.prototype.toggle = function(x, y) {
        this.board[y][x] = +!this.board[y][x];
    }

    const game = new Game(5);

    game.toggle(2, 1);
    game.toggle(2, 2);
    game.toggle(2, 3);

    console.log(game.board.join("\n"));
}());
