
import { IMoveData } from "../Services/Models/iMoveData";
import { KingMoveData } from "../Services/Models/kingMoveData";
import { Rules } from "./rules";

export class KingRules extends Rules {

    constructor(board: string) {
        super(board);
    }

    public validateMove(move: IMoveData): boolean {
        let moveData: KingMoveData = new KingMoveData(move);
        let boardStatus = this.board.split(" ").slice(1);

        // out of bounds
        if (this.outOfBounds(moveData))
            return false;

        let isCastleAvailable = (moveData.player == "w" && (boardStatus[1].includes("K") || boardStatus[1].includes("Q"))) || (moveData.player == "b" && (boardStatus[1].includes("k") || boardStatus[1].includes("q")));
        // only move 1 space or 2 if castle available
        if ((Math.abs(moveData.destFile - moveData.fromFile) == 2 || Math.abs(moveData.destRank - moveData.fromRank) == 2)) {
            if (!isCastleAvailable)
                return false;
            else if (isCastleAvailable) {
                let onlyPossibleCastleFiles = ["g", "c"];
                let onlyPossibleCastleRanks = [1, 8];
                if (!onlyPossibleCastleRanks.includes(moveData.destRank) || !onlyPossibleCastleFiles.includes(String.fromCharCode(moveData.destFile)))
                    return false;
                if (moveData.player == "b" && moveData.destRank != 8 || moveData.player == "w" && moveData.destRank != 1)
                    return false;
            }
        } else if (Math.abs(moveData.destFile - moveData.fromFile) > 2 || Math.abs(moveData.destRank - moveData.fromRank) > 2)
            return false;

        // path is check

        // blocked

        return true;
    }

    protected isBlocked(moveData: IMoveData): boolean {
        let boardStatus = this.board.split(" ").slice(1);
        let path = [];


        return this.pathValidator.isPathBlocked(path, moveData.player);
    }

    public getStandardOrLongNotation(from: string, dest: string): string {
        return "";
    }

}