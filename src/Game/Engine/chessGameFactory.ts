import { ChessGame } from './chessGame';

export class ChessGameFactory implements IChessGameFactory {


    NewStandardGame(): ChessGame {
        return new ChessGame();
    }

    NewFromFEN(fen: string): ChessGame {
        throw new Error('Method not implemented.');
    }

    NewFromPGN(pgn: string): ChessGame {
        throw new Error('Method not implemented.');
    }
}

export interface IChessGameFactory {


    NewStandardGame(): ChessGame;
    NewFromFEN(fen: string): ChessGame;
    NewFromPGN(pgn: string): ChessGame;
}