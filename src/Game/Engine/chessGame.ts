import { GameStringService } from './Services/gameStringService';
import { GameRulesService } from './Services/gameRulesService';
import { ChessGameStringType } from "./Models/chessGameStringType";
import { GameStatusDto } from '../../NSwag/chess_swagger';
import { NEW_GAME_FEN } from './Conts/consts';
import { UpdateFenString } from './Services/Models/updateFenString';
import { UpdateSanString } from './Services/Models/updateSanString';

export class ChessGame implements IChessGame {
    private _gameSan: string;
    private _gameFen: string;
    private _gameAscii: string;
    private _dateStarted: Date;
    private _dateFinished: Date;
    private _gameStatus: GameStatusDto;
    private _gameRulesService: GameRulesService;

    constructor(board: string = NEW_GAME_FEN, chessGameStringType: ChessGameStringType = ChessGameStringType.fen) {
        switch (chessGameStringType) {
            case ChessGameStringType.san:
                this._gameSan = board;
                this._gameFen = "";
                break;
            case ChessGameStringType.fen:
                this._gameFen = board;
                this._gameSan = "";
            default:
                this._gameFen = board;
        }
        this._gameRulesService = new GameRulesService();
    }

    public get gameFen(): string {
        return this._gameFen;
    }

    public get dateStarted(): Date {
        return this._dateStarted;
    }

    public get dateFinished(): Date {
        return this._dateFinished;
    }

    public move(from: string, dest: string, promotion?: string): boolean {
        let isValid = this._gameRulesService.validateMove(this._gameFen, from, dest);
        if (!isValid)
            return false;

        let piece = from.charAt(0);
        let colorOfPiece = piece.charAt(0) == piece.charAt(0).toUpperCase() ? "w" : "b";
        let isCapture = this._gameRulesService.isCapture(this._gameFen, dest, colorOfPiece);
        this._gameFen = GameStringService.updateFen(new UpdateFenString({ fen: this.gameFen, from, dest, promotion, isCapture }));

        this._gameRulesService.evaluateBoard(colorOfPiece, this._gameFen);

        this._gameSan = GameStringService.updateSan(new UpdateSanString({ san: this._gameSan, fen: this._gameFen, from, dest, isCapture, isCheck: this._gameRulesService.isCheck, promotion }));

        return true;
    }

    public isGameOver(): boolean {
        return this._gameRulesService.isMate || this._gameRulesService.isDraw;
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