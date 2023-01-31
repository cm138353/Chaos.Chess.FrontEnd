import { ChessGameStringType } from '../../Models/chessGameStringType';
import { ChessGame } from '../../chessGame';

export class ChessGameFactory implements IChessGameFactory {

    constructor() {


    }
    public NewStandardGame(): ChessGame {
        return new ChessGame();
    }

    public NewFromFEN(fen: string): ChessGame {
        return new ChessGame(fen, ChessGameStringType.fen);
    }

    public NewFromSAN(san: string): ChessGame {
        return new ChessGame(san, ChessGameStringType.san);
    }
}

export interface IChessGameFactory {


    NewStandardGame(): ChessGame;
    NewFromFEN(fen: string): ChessGame;
    NewFromSAN(pgn: string): ChessGame;
}