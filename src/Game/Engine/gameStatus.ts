import { MapperService } from './../../Services/mapperService';
import { GameState } from './gameState';

export class GameStatus implements IGameStatus {
    public state: GameState;
    public turn: Turn;
    public winner: Winner;
    public reason: string;

    constructor(data: IGameStatus) {
        MapperService.map(data, this);
    }
}

export interface IGameStatus {
    state: GameState;
    turn: Turn;
    winner: Winner;
    reason: string;
}

export type Turn = "white" | "black";
export type Winner = "white" | "black" | "draw";