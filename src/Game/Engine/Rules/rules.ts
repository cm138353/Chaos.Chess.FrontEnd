import { PathValidatorService } from '../Services/pathValidatorService';
import { MoveData } from '../Services/gameRulesService';
export abstract class Rules {
    protected board: string;
    protected pathValidator: PathValidatorService;

    constructor(board: string) {
        this.board = board;
        this.pathValidator = new PathValidatorService(this.board);
    }

    abstract validateMove(move: MoveData): boolean;
    protected abstract isBlocked(from: string, dest: string): boolean;
    protected outOfBounds(move: MoveData) {
        // out of bounds
        if (move.destRank > 8 || move.destRank < 1 || (move.destFile - 96) > 8 || (move.destFile - 96) < 1)
            return true;

        return false;
    }
}
