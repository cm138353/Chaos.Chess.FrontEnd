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
}
