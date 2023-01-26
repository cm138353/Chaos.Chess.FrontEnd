import { MoveData } from "../Services/gameRulesService";
import { Rules } from "./rules";

export class QueenRules extends Rules {
    validateMove(move: MoveData): boolean {
        // out of bounds 
        if (this.outOfBounds(move))
            return false;

        // blocked 
        if (this.isBlocked(`${move.player == "w" ? "Q" : "q"}${String.fromCharCode(move.fromFile)}${move.fromRank}`, `${String.fromCharCode(move.destFile)}${move.destRank}`))
            return false;

        // illegal moves
        if (Math.abs(move.destFile - move.fromFile) != Math.abs(move.destRank - move.fromRank) && ((Math.abs(move.destRank - move.fromRank) > 0 && Math.abs(move.destFile - move.fromFile) != 0) || (Math.abs(move.destRank - move.fromRank) != 0 && Math.abs(move.destFile - move.fromFile) > 0)))
            return false;

        return true;
    }

    protected isBlocked(from: string, dest: string): boolean {
        let fromRank: number = +from.charAt(from.length - 1);
        let fromFile = from.charAt(1);
        let destRank: number = +dest.charAt(dest.length - 1);
        let destFile = dest.charAt(0);
        let player = from.charAt(0) == from.charAt(0).toUpperCase() ? "w" : "b";

        let path = [];
        if (Math.abs(destRank - fromRank) == Math.abs(destFile.charCodeAt(0) - fromFile.charCodeAt(0))) {
            let currRank = fromRank;
            let currFile = fromFile;
            while (currRank != destRank) {
                if (destRank > fromRank) {
                    if (destFile.charCodeAt(0) > fromFile.charCodeAt(0)) {
                        path.push(`${String.fromCharCode(currFile.charCodeAt(0) + 1)}${++currRank}`);
                        currFile = String.fromCharCode(currFile.charCodeAt(0) + 1);
                    } else {
                        path.push(`${String.fromCharCode(currFile.charCodeAt(0) - 1)}${++currRank}`);
                        currFile = String.fromCharCode(currFile.charCodeAt(0) - 1);
                    }
                } else {
                    if (destFile.charCodeAt(0) > fromFile.charCodeAt(0)) {
                        path.push(`${String.fromCharCode(currFile.charCodeAt(0) + 1)}${--currRank}`);
                        currFile = String.fromCharCode(currFile.charCodeAt(0) + 1);
                    } else {
                        path.push(`${String.fromCharCode(currFile.charCodeAt(0) - 1)}${--currRank}`);
                        currFile = String.fromCharCode(currFile.charCodeAt(0) - 1);
                    }
                }
            }
        } else {
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
        }

        return this.pathValidator.isPathBlocked(path, player);
    }
}