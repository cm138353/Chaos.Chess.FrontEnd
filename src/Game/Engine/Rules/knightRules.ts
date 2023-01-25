import { MoveData } from "../Services/gameRulesService";
import { Rules } from "./rules";

export class KnighRules extends Rules {

    public validateMove(move: MoveData): boolean {

        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // illegal move
        let availableMoves: string[] = this.populateAvailableMoves(move);
        if (!availableMoves.some(x => `${String.fromCharCode(move.destFile)}${move.destRank}`))
            return false;

        // blocked
        if (this.isBlocked(`${move.player == "w" ? "N" : "n"}${String.fromCharCode(move.fromFile)}${move.fromRank}`, `${String.fromCharCode(move.destFile)}${move.destRank}`))
            return false;

        return true;
    }

    protected isBlocked(from: string, dest: string) {
        let player = from.charAt(0).toUpperCase() == from.charAt(0) ? "w" : "b";
        let path = [];
        path.push(dest);
        return this.pathValidator.isPathBlocked(path, player);
    }

    private populateAvailableMoves(move: MoveData) {
        let availableMoves: string[] = [];
        // right 2 up 1
        if ((move.fromFile + 2) - 96 < 9 && (move.fromFile + 2) - 96 > 0 && (move.fromRank + 1) < 9 && (move.fromRank + 1) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 2)}${move.fromRank + 1}`);
        // left 2 up 1
        if ((move.fromFile - 2) - 96 < 9 && (move.fromFile - 2) - 96 > 0 && (move.fromRank + 1) < 9 && (move.fromRank + 1) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 2)}${move.fromRank + 1}`);
        // right 2 down 1
        if ((move.fromFile + 2) - 96 < 9 && (move.fromFile + 2) - 96 > 0 && (move.fromRank - 1) < 9 && (move.fromRank - 1) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 2)}${move.fromRank - 1}`);
        // left 2 down 1
        if ((move.fromFile - 2) - 96 < 9 && (move.fromFile - 2) - 96 > 0 && (move.fromRank - 1) < 9 && (move.fromRank - 1) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 2)}${move.fromRank - 1}`);
        // right 1 up 2
        if ((move.fromFile + 1) - 96 < 9 && (move.fromFile + 1) - 96 > 0 && (move.fromRank + 2) < 9 && (move.fromRank + 2) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 1)}${move.fromRank + 2}`);
        // left 1 up 2
        if ((move.fromFile - 1) - 96 < 9 && (move.fromFile - 1) - 96 > 0 && (move.fromRank + 2) < 9 && (move.fromRank + 2) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 1)}${move.fromRank + 2}`);
        // right 1 down 2
        if ((move.fromFile + 1) - 96 < 9 && (move.fromFile + 1) - 96 > 0 && (move.fromRank - 2) < 9 && (move.fromRank - 2) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile + 1)}${move.fromRank - 2}`);
        // left 1 down 2
        if ((move.fromFile - 1) - 96 < 9 && (move.fromFile - 1) - 96 > 0 && (move.fromRank - 2) < 9 && (move.fromRank - 2) > 0)
            availableMoves.push(`${String.fromCharCode(move.fromFile - 1)}${move.fromRank - 2}`);
        return availableMoves;
    }
}