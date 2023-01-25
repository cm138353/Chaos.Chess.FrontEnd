import { MoveData } from './../Services/gameRulesService';
import { Rules } from './rules';
export class RookRules extends Rules {

    public validateMove(move: MoveData): boolean {
        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // rook cannot move diagonally
        if ((Math.abs(move.fromRank - move.destRank) > 0 && Math.abs(move.fromFile - move.destFile) != 0) || (Math.abs(move.fromRank - move.destRank) != 0 && Math.abs(move.fromFile - move.destFile) > 0))
            return false;

        // is blocked
        if (this.isBlocked(`${move.player == "w" ? "R" : "r"}${String.fromCharCode(move.fromFile)}${move.fromRank}`, `${String.fromCharCode(move.destFile)}${move.destRank}`))
            return false;

        return true;
    }

    protected isBlocked(from: string, dest: string) {
        let fromRank: number = +from.charAt(from.length - 1);
        let fromFile = from.charAt(1);
        let destRank: number = +dest.charAt(dest.length - 1);
        let destFile = from.charAt(0);
        let player = from.charAt(0) == from.charAt(0).toUpperCase() ? "w" : "b";

        let path = [];
        let isVertical = Math.abs(fromRank - destRank) > 0;
        let i = isVertical ? fromRank : fromFile.charCodeAt(0);

        while (isVertical ? i != destRank : i != destFile.charCodeAt(0)) {
            if (isVertical) {
                if (destRank > fromRank) {
                    path.push(`${fromFile}${i + 1}`);
                    i++;
                }
                else {
                    path.push(`${fromFile}${i - 1}`);
                    i--;
                }
            } else {
                if (destFile > fromFile) {
                    path.push(`${String.fromCharCode(i + 1)}${fromRank}`);
                    i++;
                }
                else {
                    path.push(`${String.fromCharCode(i - 1)}${fromRank}`);
                    i--;
                }
            }
        }
        return this.pathValidator.isPathBlocked(path, player);
    }
}