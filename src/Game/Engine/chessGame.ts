import { GameRulesService } from './Services/gameRulesService';
import { ChessGameStringType } from "./chessGameStringType";
import { GameStatusDto } from '../../NSwag/chess_swagger';
import { NEW_GAME } from './Conts/consts';

export class ChessGame implements IChessGame {
    private _gameSan: string;
    private _gameFen: string;
    private _gameAscii: string;
    private _dateStarted: Date;
    private _dateFinished: Date;
    private _gameStatus: GameStatusDto;
    private gameRulesService: GameRulesService;

    constructor(board: string = NEW_GAME, chessGameStringType: ChessGameStringType = ChessGameStringType.fen) {
        switch (chessGameStringType) {
            case ChessGameStringType.san:
                this._gameSan = board;
                break;
            case ChessGameStringType.fen:
                this._gameFen = board;
            default:
                this._gameFen = board;
        }
        this.gameRulesService = new GameRulesService(this._gameFen);
    }

    public get dateStarted(): Date {
        return this._dateStarted;
    }

    public get dateFinished(): Date {
        return this._dateFinished;
    }

    public move(from: string, dest: string, promotion?: string): void {
        this.gameRulesService.validateMove(from, dest);
    }

    public isGameOver(): boolean {
        return true;
    }

    public getStatus(): GameStatusDto {
        return this._gameStatus;
    }

    public undoMove(): void {

    }

    public resignGame(player: "white" | "black"): void {

    }

    public toString(toStringType: ChessGameStringType): string {
        switch (toStringType) {
            case ChessGameStringType.ascii:
                return this._gameAscii;
            case ChessGameStringType.fen:
                return this._gameFen;
            case ChessGameStringType.san:
                return this._gameSan;
            default:
                return this._gameSan;
        }
    }

    public history(): string {
        return this._gameSan;
    }

}

export interface IChessGame {
    dateStarted: Date;
    dateFinished: Date;

    move(from: string, dest: string, promotion?: string): void;
    isGameOver(): boolean;
    getStatus(): GameStatusDto;
    undoMove(): void;
    resignGame(player: "white" | "black"): void;
    toString(toStringType: ChessGameStringType): string;
    history(): string;
}