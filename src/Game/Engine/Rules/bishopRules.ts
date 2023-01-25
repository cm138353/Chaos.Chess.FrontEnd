import { MoveData } from "../Services/gameRulesService";
import { Rules } from "./rules";

export class BishopRules extends Rules {
    public validateMove(move: MoveData): boolean {

        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // illegal move
        if (Math.abs(move.destFile - move.fromFile) != Math.abs(move.destRank - move.fromRank))
            return false;

        // blocked
        if (this.isBlocked(`${move.player == "w" ? "B" : "b"}${String.fromCharCode(move.fromFile)}${move.fromRank}`, `${String.fromCharCode(move.destFile)}${move.destRank}`))
            return false;

        return true;
    }

    protected isBlocked(from: string, dest: string): boolean {
        let fromRank: number = +from.charAt(from.length - 1);
        let fromFile = from.charAt(1);
        let destRank: number = +dest.charAt(dest.length - 1);
        let destFile = from.charAt(0);
        let player = from.charAt(0) == from.charAt(0).toUpperCase() ? "w" : "b";

        let path = [];



        return this.pathValidator.isPathBlocked(path, player);
    }

}