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
    };

    Game.prototype.next = function() {
        const prevBoard = this.board.slice().map(row => row.slice());
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const alive = prevBoard[y][x];
                const neighbors = getNeighbors(prevBoard, x, y);
                // if live and less than 2 neighbors, die
                if (alive && neighbors < 2) {
                    this.toggle(x, y);
                // if live and more than 3 neighbors, die
                } else if (alive && neighbors > 3) {
                    this.toggle(x, y);
                // if dead and 3 live neighbors, come alive
                } else if (!alive && neighbors === 3) {
                    this.toggle(x, y);
                }
            }
        }
    };

    // helpers
    const getNeighbors = function(board, x, y) {
        let sum = 0;
        if (board[y-1]) {
            sum += (+!!board[y-1][x-1] + board[y-1][x] + +!!board[y-1][x+1]);
        }
        if (board[y+1]) {
            sum += (+!!board[y+1][x-1] + board[y+1][x] + +!!board[y+1][x+1]);
        }
        sum += (+!!board[y][x-1] + +!!board[y][x+1]);
        return sum;
    };


    // View
    const createGameView = size => {
        const table = document.createElement('table');
        for (let y = 0; y < size; y++) {
            const tr = document.createElement('tr');
            for (let x = 0; x < size; x++) {
                const td = document.createElement('td');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                td.appendChild(checkbox);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        $('#container').appendChild(table);
    }

    const size = 10;
    const game = new Game(size);
    createGameView(size);
    //console.log(game.board.join("\n"));
}());


