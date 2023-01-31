import { IMoveData } from "../Services/Models/iMoveData";
import { Rules } from "./rules";

export class QueenRules extends Rules {

    constructor(board: string) {
        super(board);
    }
    validateMove(move: IMoveData): boolean {
        // out of bounds 
        if (this.outOfBounds(move))
            return false;

        // blocked 
        if (this.isBlocked(move))
            return false;

        // illegal moves
        if (Math.abs(move.destFile - move.fromFile) != Math.abs(move.destRank - move.fromRank) && ((Math.abs(move.destRank - move.fromRank) > 0 && Math.abs(move.destFile - move.fromFile) != 0) || (Math.abs(move.destRank - move.fromRank) != 0 && Math.abs(move.destFile - move.fromFile) > 0)))
            return false;

        return true;
    }

    protected isBlocked(moveData: IMoveData): boolean {
        let path = [];
        if (Math.abs(moveData.destRank - moveData.fromRank) == Math.abs(moveData.destFile - moveData.fromFile)) {
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
        } else {
            let isVertical = Math.abs(moveData.fromRank - moveData.destRank) > 0;
            let i = isVertical ? moveData.fromRank : moveData.fromFile;
            while (isVertical ? i != moveData.destRank : i != moveData.destFile) {
                if (isVertical) {
                    if (moveData.destRank > moveData.fromRank) {
                        path.push(`${moveData.fromFile}${i + 1}`);
                        i++;
                    }
                    else {
                        path.push(`${moveData.fromFile}${i - 1}`);
                        i--;
                    }
                } else {
                    if (moveData.destFile > moveData.fromFile) {
                        path.push(`${String.fromCharCode(i + 1)}${moveData.fromRank}`);
                        i++;
                    }
                    else {
                        path.push(`${String.fromCharCode(i - 1)}${moveData.fromRank}`);
                        i--;
                    }
                }
            }
        }

        return this.pathValidator.isPathBlocked(path, moveData.player);
    }
}