import { ChessGameToStringType } from "./chessGameToStringType";
import { GameStatus } from "./gameStatus";

export class ChessGame implements IChessGame {
    private _gameSan: string;
    private _gameFen: string;
    private _gameAscii: string;
    private _dateStarted: Date;
    private _dateFinished: Date;
    private _gameStatus: GameStatus;

    constructor() {

    }

    public get dateStarted(): Date {
        return this._dateStarted;
    }

    public get dateFinished(): Date {
        return this._dateFinished;
    }

    public move(move: { from: string, dest: string, promotion?: string }): void {
        throw new Error("Method not implemented.");
    }

    public isGameOver(): boolean {
        return true;
    }

    public getStatus(): GameStatus {
        return this._gameStatus;
    }

    public undoMove(): void {

    }

    public resignGame(player: "white" | "black"): void {

    }

    public toString(toStringType: ChessGameToStringType): string {
        switch (toStringType) {
            case ChessGameToStringType.ascii:
                return this._gameAscii;
            case ChessGameToStringType.fen:
                return this._gameFen;
            case ChessGameToStringType.san:
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

    move(move: { from: string, dest: string, promotion?: string }): void;
    isGameOver(): boolean;
    getStatus(): GameStatus;
    undoMove(): void;
    resignGame(player: "white" | "black"): void;
    toString(toStringType: ChessGameToStringType): string;
    history(): string;
}