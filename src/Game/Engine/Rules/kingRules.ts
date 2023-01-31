
import { IMoveData } from "../Services/Models/iMoveData";
import { KingMoveData } from "../Services/Models/kingMoveData";
import { Rules } from "./rules";

export class KingRules extends Rules {

    constructor(board: string) {
        super(board);
    }

    public validateMove(move: IMoveData): boolean {
        let moveData: KingMoveData = new KingMoveData(move);
        // out of bounds
        if (this.outOfBounds(moveData))
            return false;

        // only move 1 space or 2 if castle available

        // blocked

        // path is check

        return true;
    }

    protected isBlocked(moveData: IMoveData): boolean {
        let boardStatus = this.board.split(" ").slice(1);
        let path = [];
        if (Math.abs(moveData.destFile - moveData.fromFile) == 2) {

        }

        return this.pathValidator.isPathBlocked(path, moveData.player);
    }
}