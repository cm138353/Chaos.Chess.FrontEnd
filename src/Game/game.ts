import { inject } from "aurelia";
import { ChessGame } from "./Engine/chessGame";
import { ChessGameFactory } from "./Engine/chessGameFactory";

@inject(ChessGameFactory)
export class Game {
    private game: ChessGame;

    constructor(chessFactory: ChessGameFactory) {
        this.game = chessFactory.NewStandardGame();
    }

    public move() {
        this.game.move("Pe2", "e4");
    }
}