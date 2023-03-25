import { GeneralMoveData } from '../Services/Models/generalMoveData';
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