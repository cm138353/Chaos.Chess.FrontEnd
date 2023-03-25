
import { GeneralMoveData } from '../Services/Models/generalMoveData';
import { IMoveData } from '../Services/Models/iMoveData';
import { PathValidatorService } from '../Services/pathValidatorService';
import { getFileSpaceIndexFromRank, getSpaceFromRank } from '../Services/Utility/helpfulFunctions';
export abstract class Rules {
    protected board: string;
    protected pathValidator: PathValidatorService;

    constructor(board: string) {
        this.board = board;
        this.pathValidator = new PathValidatorService(this.board);
    }

    abstract validateMove(moveData: IMoveData): boolean;
    protected abstract isBlocked(moveData: IMoveData): boolean;
    protected outOfBounds(moveData: IMoveData) {
        // out of bounds
        if (moveData.destRank > 8 || moveData.destRank < 1 || (moveData.destFile - 96) > 8 || (moveData.destFile - 96) < 1)
            return true;

        return false;
    }

    protected getNotation(from: string, dest: string, needRank: boolean, needFile: boolean) {
        let piece = from.charAt(0);
        // maybe override this for king for castle
        if (needRank && !needFile)
            return piece + from.charAt(from.length - 1) + dest;
        else if (needFile && !needRank)
            return piece + from.charAt(1) + dest;
        else if (needFile && needRank)
            return from + dest;

        return piece + dest;
    }

    public getStandardOrLongNotation(from: string, dest: string) {
        let boardState = this.board.split(" ")[0];
        let boardFile = boardState.split("/").map(o => getSpaceFromRank(o, dest.charCodeAt(0)));
        let boardRank = boardState.split("/")[(8 - +from.charAt(from.length - 1))];

        let needRank = this.getNeedRank(boardFile, from, dest);
        let needFile = this.getNeedFile(boardRank, from, dest);

        return this.getNotation(from, dest, needRank, needFile);
    }

    protected getNeedRank(boardFile: string[], from: string, dest: string): boolean {
        let piece = from.charAt(0);
        let fromRank = +from.charAt(from.length - 1);
        let destRank = +dest.charAt(dest.length - 1);
        let fromFile = from.charCodeAt(1);
        let destFile = dest.charCodeAt(0);
        let player = piece == piece.toUpperCase() ? "w" : "b";
        let indices: number[] = [];
        for (const [i, v] of boardFile.entries()) {
            let index = boardFile.indexOf(piece, i);
            if (index != (8 - destRank) && index != -1 && !indices.some(x => x == index))
                indices.push(index);
        }

        for (const i of indices) {
            let isValid = this.validateMove(new GeneralMoveData({
                fromFile,
                fromRank: (8 - i),
                destFile,
                destRank,
                player
            }));
            if (isValid)
                return true;
        }

        return false;
    }

    protected getNeedFile(boardRank: string, from: string, dest: string): boolean {
        let piece = from.charAt(0);
        let fromFile = from.charCodeAt(1);
        let destFile = dest.charCodeAt(0);
        let fromRank = +from.charAt(from.length - 1);
        let destRank = +dest.charAt(dest.length - 1);
        let player = piece == piece.toUpperCase() ? "w" : "b";
        let destFileIndex = getFileSpaceIndexFromRank(boardRank, destFile); // because the move happened already
        let indices: number[] = [];
        let boardRankSplit = boardRank.split("");
        for (const [i, v] of boardRankSplit.entries()) {
            let index = boardRankSplit.indexOf(piece, i);
            if (index != destFileIndex && index != -1 && !indices.some(x => x == index))
                indices.push(index);
        }

        for (const i of indices) {
            let isValid = this.validateMove(new GeneralMoveData({
                fromFile: (97 + i),
                fromRank,
                destFile,
                destRank,
                player
            }));
            if (isValid)
                return true;
        }

        return false;
    }
}
