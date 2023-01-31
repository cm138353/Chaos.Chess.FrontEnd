
import { IMoveData } from '../Services/Models/iMoveData';
import { PathValidatorService } from '../Services/pathValidatorService';
export abstract class Rules {
    protected board: string;
    protected pathValidator: PathValidatorService;

    constructor(board: string) {
        this.board = board;
        this.pathValidator = new PathValidatorService(this.board);
    }

    abstract validateMove(move: IMoveData): boolean;
    protected abstract isBlocked(move: IMoveData): boolean;
    protected outOfBounds(move: IMoveData) {
        // out of bounds
        if (move.destRank > 8 || move.destRank < 1 || (move.destFile - 96) > 8 || (move.destFile - 96) < 1)
            return true;

        return false;
    }
}
