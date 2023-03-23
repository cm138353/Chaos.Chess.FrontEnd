import { KingRules } from '../../Rules/kingRules';
import { QueenRules } from '../../Rules/queenRules';
import { BishopRules } from '../../Rules/bishopRules';
import { KnighRules } from '../../Rules/knightRules';
import { PawnRules } from "../../Rules/pawnRules";
import { RookRules } from "../../Rules/rookRules";

export class PieceRulesFactory {

    public static getRules(board: string, piece: string) {
        switch (piece) {
            case "p":
                return new PawnRules(board);
            case "r":
                return new RookRules(board);
            case "n":
                return new KnighRules(board);
            case "b":
                return new BishopRules(board);
            case "q":
                return new QueenRules(board);
            case "k":
                return new KingRules(board);

        }
    }

}