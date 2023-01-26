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

    public move(): void {//1.e4 e5 2.Nf3 Nc6 3.Bc4
        // let success = this.game.move("Pe2", "e4");
        // if (!success)
        //     console.error("Failed");

        // success = this.game.move("pe7", "e5");
        // if (!success)
        //     console.error("Failed");

        // success = this.game.move("Ng1", "f3");
        // if (!success)
        //     console.error("Failed");

        // success = this.game.move("nb8", "c6");
        // if (!success)
        //     console.error("Failed");

        // success = this.game.move("Bf1", "c4");
        // if (!success)
        //     console.error("Failed");
    }
}