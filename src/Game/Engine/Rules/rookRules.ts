import { IMoveData } from '../Services/Models/iMoveData';
import { getSpaceFromRank, getFileSpaceIndexFromRank } from '../Services/Utility/helpfulFunctions';
import { Rules } from './rules';
export class RookRules extends Rules {

    constructor(board: string) {
        super(board);
    }
    public validateMove(moveData: IMoveData): boolean {
        // out of bounds
        if (this.outOfBounds(moveData))
            return false;

        // rook cannot move diagonally
        if ((Math.abs(moveData.fromRank - moveData.destRank) > 0 && Math.abs(moveData.fromFile - moveData.destFile) != 0) || (Math.abs(moveData.fromRank - moveData.destRank) != 0 && Math.abs(moveData.fromFile - moveData.destFile) > 0))
            return false;

        // is blocked
        if (this.isBlocked(moveData))
            return false;

        return true;
    }

    protected isBlocked(moveData: IMoveData) {
        let path = [];
        let isVertical = Math.abs(moveData.fromRank - moveData.destRank) > 0;
        let i = isVertical ? moveData.fromRank : moveData.fromFile;

        if (isVertical)
            path = this.getVerticalPath(moveData.fromRank, moveData.destRank, moveData.fromFile)
        else
            path = this.getHorizontalPath(moveData.fromFile, moveData.destFile, moveData.fromRank);

        return this.pathValidator.isPathBlocked(path, moveData.player);
    }

    public getStandardOrLongNotation(from: string, dest: string) {
        let piece = from.charAt(0);

        let boardState = this.board.split(" ")[0];
        let needRank = false;
        let needFile = false;
        let boardFile = boardState.split("/").map(o => getSpaceFromRank(o, dest.charCodeAt(0)));
        let boardRank = boardState.split("/")[(8 - +from.charAt(from.length - 1))];

        needRank = this.getNeedRank(boardFile, from, dest);
        needFile = this.getNeedFile(boardRank, from, dest);

        if (needRank && !needFile)
            return piece + from.charAt(from.length - 1) + dest;
        else if (needFile && !needRank)
            return piece + from.charAt(1) + dest;
        else if (needFile && needRank)
            return from + dest;

        return piece + dest;
    }

    private getNeedRank(boardFile: string[], from: string, dest: string): boolean {
        let piece = from.charAt(0);
        let indices: number[] = [];
        let fromRank = +from.charAt(from.length - 1);
        let destRank = +dest.charAt(dest.length - 1);
        let player = piece == piece.toUpperCase() ? "w" : "b";
        indices = boardFile.filter((x, i) => x == piece && i != (8 - fromRank)).map((v, i) => i);

        for (const i of indices) {
            let path: string[] = [];
            this.getVerticalPath(fromRank, destRank, from.charCodeAt(1));
            if (!this.pathValidator.isPathBlocked(path, player))
                return true;
        }

        return false;
    }

    private getNeedFile(boardRank: string, from: string, dest: string): boolean {
        let piece = from.charAt(0);
        let fromFile = from.charCodeAt(1);
        let destFile = dest.charCodeAt(0);
        let player = piece == piece.toUpperCase() ? "w" : "b";
        let fromFileIndex = getFileSpaceIndexFromRank(boardRank, fromFile);
        let indices = boardRank.split("").filter((x, i) => x == piece && i != fromFileIndex).map((v, i) => i);

        for (const i of indices) {
            let path: string[] = [];
            this.getHorizontalPath(fromFile, destFile, +from.charAt(from.length - 1));
            if (!this.pathValidator.isPathBlocked(path, player))
                return true;
        }

        return false;
    }

    private getVerticalPath(fromRank: number, destRank: number, fromFile: number): string[] {
        let path: string[] = [];
        let i = fromRank;
        while (i != destRank) {
            if (destRank > fromRank) {
                path.push(`${String.fromCharCode(fromFile)}${i + 1}`);
                i++;
            }
            else {
                path.push(`${String.fromCharCode(fromFile)}${i - 1}`);
                i--;
            }
        }
        return path;
    }

    private getHorizontalPath(fromFile: number, destFile: number, fromRank: number): string[] {
        let path: string[] = [];
        let i = fromFile;
        while (i != destFile) {
            if (destFile > fromFile) {
                path.push(`${String.fromCharCode(i + 1)}${fromRank}`);
                i++;
            }
            else {
                path.push(`${String.fromCharCode(i - 1)}${fromRank}`);
                i--;
            }
        }
        return path
    }

}