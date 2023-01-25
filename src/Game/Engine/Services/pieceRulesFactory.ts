import { PawnRules } from "../Rules/pawnRules";
import { RookRules } from "../Rules/rookRules";

export class PieceRulesFactory {

    public static getRules(board: string, piece: string) {
        switch (piece) {
            case "p":
                return new PawnRules(board);
            case "r":
                return new RookRules(board);
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