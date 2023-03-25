import { GeneralMoveData } from './../Services/Models/generalMoveData';
import { IMoveData } from "../Services/Models/iMoveData";
import { getFileSpaceIndexFromRank, getSpaceFromRank } from "../Services/Utility/helpfulFunctions";
import { Rules } from "./rules";

export class KnighRules extends Rules {

    constructor(board: string) {
        super(board);
    }
    public validateMove(move: IMoveData): boolean {

        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // illegal move
        let availableMoves: string[] = this.populateAvailableMoves(move);
        let targetSpace = `${String.fromCharCode(move.destFile)}${move.destRank}`;
        if (!availableMoves.some(x => x == targetSpace))
            return false;

        // blocked
        if (this.isBlocked(move))
            return false;

        return true;
    }

    protected isBlocked(moveData: IMoveData) {
        let path = [];
        path.push(`${String.fromCharCode(moveData.destFile)}${moveData.destRank}`);
        return this.pathValidator.isPathBlocked(path, moveData.player);
    }

    private populateAvailableMoves(move: IMoveData) {
        let availableMoves: string[] = [];
        // right 2 up 1
        if ((move.fromFile + 2) - 96 <= 8 && (move.fromFile + 2) - 96 >= 1 && (move.fromRank + 1) <= 8 && (move.fromRank + 1) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 2)}${move.fromRank + 1}`);
        // left 2 up 1
        if ((move.fromFile - 2) - 96 <= 8 && (move.fromFile - 2) - 96 >= 1 && (move.fromRank + 1) <= 8 && (move.fromRank + 1) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 2)}${move.fromRank + 1}`);
        // right 2 down 1
        if ((move.fromFile + 2) - 96 <= 8 && (move.fromFile + 2) - 96 >= 1 && (move.fromRank - 1) <= 8 && (move.fromRank - 1) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 2)}${move.fromRank - 1}`);
        // left 2 down 1
        if ((move.fromFile - 2) - 96 <= 8 && (move.fromFile - 2) - 96 >= 1 && (move.fromRank - 1) <= 8 && (move.fromRank - 1) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 2)}${move.fromRank - 1}`);
        // right 1 up 2
        if ((move.fromFile + 1) - 96 <= 8 && (move.fromFile + 1) - 96 >= 1 && (move.fromRank + 2) <= 8 && (move.fromRank + 2) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 1)}${move.fromRank + 2}`);
        // left 1 up 2
        if ((move.fromFile - 1) - 96 <= 8 && (move.fromFile - 1) - 96 >= 1 && (move.fromRank + 2) <= 8 && (move.fromRank + 2) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 1)}${move.fromRank + 2}`);
        // right 1 down 2
        if ((move.fromFile + 1) - 96 <= 8 && (move.fromFile + 1) - 96 >= 1 && (move.fromRank - 2) <= 8 && (move.fromRank - 2) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 1)}${move.fromRank - 2}`);
        // left 1 down 2
        if ((move.fromFile - 1) - 96 <= 8 && (move.fromFile - 1) - 96 >= 1 && (move.fromRank - 2) <= 8 && (move.fromRank - 2) >= 1)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 1)}${move.fromRank - 2}`);
        return availableMoves;
    }
}