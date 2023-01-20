import { PawnRules } from "../Rules/pawnRules";
import { RookRules } from "../Rules/rookRules";

export class PieceRulesFactory {
    private board: string;

    constructor(board: string) {
        this.board = board;
    }

    public getRules(piece: string) {
        switch (piece) {
            case "p":
                return new PawnRules(this.board);
            case "r":
                return new RookRules(this.board);
            case "n":
                break;
            case "b":
                break;
            case "q":
                break;
            case "k":
                break;

        }
    }

}