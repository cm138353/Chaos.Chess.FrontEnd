
import { IMoveData } from '../Services/Models/iMoveData';
import { PathValidatorService } from '../Services/pathValidatorService';
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
    abstract getStandardOrLongNotation(from: string, dest: string): string;
}
