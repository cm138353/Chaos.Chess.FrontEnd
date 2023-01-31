import { IMoveData } from "../Services/Models/iMoveData";
import { Rules } from "./rules";

export class BishopRules extends Rules {

    constructor(board: string) {
        super(board);
    }

    public validateMove(move: IMoveData): boolean {

        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // illegal move
        if (Math.abs(move.destFile - move.fromFile) != Math.abs(move.destRank - move.fromRank))
            return false;

        // blocked
        if (this.isBlocked(move))
            return false;

        return true;
    }

    protected isBlocked(moveData: IMoveData): boolean {

        let path = [];
        let currRank = moveData.fromRank;
        let currFile = moveData.fromFile;
        while (currRank != moveData.destRank) {
            if (moveData.destRank > moveData.fromRank) {
                if (moveData.destFile > moveData.fromFile) {
                    path.push(`${String.fromCharCode(currFile + 1)}${++currRank}`);
                    currFile = currFile + 1;
                } else {
                    path.push(`${String.fromCharCode(currFile - 1)}${++currRank}`);
                    currFile = currFile - 1;
                }
            } else {
                if (moveData.destFile > moveData.fromFile) {
                    path.push(`${String.fromCharCode(currFile + 1)}${--currRank}`);
                    currFile = currFile + 1;
                } else {
                    path.push(`${String.fromCharCode(currFile - 1)}${--currRank}`);
                    currFile = currFile - 1;
                }
            }
        }

        return this.pathValidator.isPathBlocked(path, moveData.player);
    }

}