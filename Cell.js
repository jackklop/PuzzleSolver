class Cell{
    constructor(x,y,val,col){
        this.x = x;
        this.y = y;
        this.val = val;
        this.step = 0;
        this.col = getColor(val); 
        this.neighbors = [];
        this.visited = false;
        this.prev;
    }

    addNeighbors(board, i, j){
        let step = this.val;
        if(i + step < board.length){
            this.neighbors.push(board[i+step][j])
        }
        if(i - step >= 0){
            this.neighbors.push(board[i-step][j])
        }
        if(j + step < board.length){
            this.neighbors.push(board[i][j + step])
        }
        if(j - step >= 0){
            this.neighbors.push(board[i][j - step])
        }
    }

    getHeustic(x,y){
        return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    }
}

function getColor(no){
    switch(no){
        case 1 :
            return 'rgb(240,166,165)';
        case 2:
            return 'rgb(110,200,113)';
        case 3:
            return 'rgb(90,89,165)';
        case 4:
            return 'rgb(83,148,151)';
        case 5:
            return 'rgb(83,148,151)';
        case 6:
            return 'rgb(83,148,151)';
        case 7:
            return 'rgb(83,148,151)';
        case 8:
            return 'rgb(83,148,151)';
        case 9:
            return 'rgb(83,148,151)';
        case 10:
            return 'rgb(83,148,151)';
        case 11:
            return 'rgb(83,148,151)';
        case 'G':
            return 'rgb(93,94,25)';
    }
}