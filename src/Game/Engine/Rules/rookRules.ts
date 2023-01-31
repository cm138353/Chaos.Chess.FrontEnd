import { IMoveData } from '../Services/Models/iMoveData';
import { Rules } from './rules';
export class RookRules extends Rules {

    constructor(board: string) {
        super(board);
    }
    public validateMove(move: IMoveData): boolean {
        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // rook cannot move diagonally
        if ((Math.abs(move.fromRank - move.destRank) > 0 && Math.abs(move.fromFile - move.destFile) != 0) || (Math.abs(move.fromRank - move.destRank) != 0 && Math.abs(move.fromFile - move.destFile) > 0))
            return false;

        // is blocked
        if (this.isBlocked(move))
            return false;

        return true;
    }

    protected isBlocked(moveData: IMoveData) {
        let path = [];
        let isVertical = Math.abs(moveData.fromRank - moveData.destRank) > 0;
        let i = isVertical ? moveData.fromRank : moveData.fromFile;

        while (isVertical ? i != moveData.destRank : i != moveData.destFile) {
            if (isVertical) {
                if (moveData.destRank > moveData.fromRank) {
                    path.push(`${moveData.fromFile}${i + 1}`);
                    i++;
                }
                else {
                    path.push(`${moveData.fromFile}${i - 1}`);
                    i--;
                }
            } else {
                if (moveData.destFile > moveData.fromFile) {
                    path.push(`${String.fromCharCode(i + 1)}${moveData.fromRank}`);
                    i++;
                }
                else {
                    path.push(`${String.fromCharCode(i - 1)}${moveData.fromRank}`);
                    i--;
                }
            }
        }
        return this.pathValidator.isPathBlocked(path, moveData.player);
    }
}