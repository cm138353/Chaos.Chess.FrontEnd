import { inject } from "aurelia";
import { ChessGame } from "./Engine/chessGame";
import { ChessGameFactory } from "./Engine/chessGameFactory";
import { runTests } from "./Tests/gameRulesTests";
@inject(ChessGameFactory)
export class Game {
    private game: ChessGame;

    constructor(chessFactory: ChessGameFactory) {
        runTests();
        this.game = chessFactory.NewStandardGame();
    }

    public move(): void {
        let success = this.game.move("Pa2", "a4");
        if (!success)
            console.error("move illegal");
        else
            console.log(this.game.gameFen);

        success = this.game.move("pe7", "e5");
        if (!success)
            console.error("move illegal");
        else
            console.log(this.game.gameFen);

        success = this.game.move("Ra1", "a3");
        if (!success)
            console.error("move illegal");
        else
            console.log(this.game.gameFen);

    }
}