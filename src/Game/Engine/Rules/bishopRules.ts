import { IMoveData } from "../Services/Models/iMoveData";
import { getSpaceFromRank, getFileSpaceIndexFromRank } from "../Services/Utility/helpfulFunctions";
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

    public getStandardOrLongNotation(from: string, dest: string): string {
        let piece = from.charAt(0);

        let boardState = this.board.split(" ")[0];
        let needRank = false;
        let needFile = false;
        let diagnal = boardState.split("/");
        let boardFile = boardState.split("/").map(o => getSpaceFromRank(o, dest.charCodeAt(0)));
        let boardRank = boardState.split("/")[(8 - +from.charAt(from.length - 1))];
        let fromFileIndex = getFileSpaceIndexFromRank(boardRank, from.charCodeAt(1));


        return "";
    }
}