import { PieceRulesFactory } from './pieceRulesFactory';
import { singleton } from 'aurelia';
import { MapperService } from './../../../Services/mapperService';
import { Rules } from '../Rules/rules';

@singleton
export class GameRulesService {
    private board: string;
    private pieceRulesFactory: PieceRulesFactory;

    constructor(board: string) {
        this.board = board;
        this.pieceRulesFactory = new PieceRulesFactory(this.board)
    }

    public validateMove(from: string, dest: string) {
        let piece = from[0].toLowerCase();
        let player = from.charCodeAt(0) > 64 && from.charCodeAt(0) < 91 ? "w" : "b";
        let fromRank = parseInt(from.charAt(from.length - 1));
        let destRank = parseInt(dest.charAt(dest.length - 1));
        let fromFile = from.charCodeAt(1);
        let destFile = dest.charCodeAt(0);
        let rules: Rules;
        rules = this.pieceRulesFactory.getRules(piece);
        let isCapture = this.isCapture(dest, player);
        return rules.validateMove(new MoveData({
            fromRank,
            destRank,
            fromFile,
            destFile,
            player,
            isCapture
        }));
    }

    private isCapture(dest: string, player: string): boolean {
        let destFile = dest.charCodeAt(1)
        let destRank = dest.charAt(dest.length - 1) as unknown as number;
        let ranks = this.board.split(" ")[0].split("/");

        let targetRank = [...ranks[ranks.length - destRank]];
        let counter = 0;
        for (const space of targetRank) {
            if (space.charCodeAt(0) > 47 && space.charCodeAt(0) < 58) {
                let number = space as unknown as number;
                counter += number;
            }
            else
                counter++;

            if (counter > destFile - 97)
                break;
            else if (counter == destFile - 97 && ((player == "w" && space.charCodeAt(0) > 64 && space.charCodeAt(0) < 91) || (player == "b" && space.charCodeAt(0) > 96 && space.charCodeAt(0) < 123)))
                return true;
        }
        return false;
    }

}

export class MoveData implements IMoveData {
    public fromRank: number;
    public destRank: number;
    public fromFile: number;
    public destFile: number;
    public player: string;
    public isCapture: boolean;

    constructor(data: IMoveData) {
        MapperService.map(data, this);
    }
}

export interface IMoveData {
    fromRank: number;
    destRank: number;
    fromFile: number;
    destFile: number;
    player: string;
    isCapture: boolean;
}