import { PieceRulesFactory } from './pieceRulesFactory';
import { singleton } from 'aurelia';
import { MapperService } from './../../../Services/mapperService';
import { Rules } from '../Rules/rules';

@singleton
export class GameRulesService {

    public static validateMove(board: string, from: string, dest: string) {
        let piece = from[0].toLowerCase();
        let player = from.charCodeAt(0) > 64 && from.charCodeAt(0) < 91 ? "w" : "b";
        let fromRank = +from.charAt(from.length - 1);
        let destRank = +dest.charAt(dest.length - 1);
        let fromFile = from.charCodeAt(1);
        let destFile = dest.charCodeAt(0);
        let rules: Rules;
        rules = PieceRulesFactory.getRules(board, piece);
        let isCapture = this.isCapture(board, dest, player);
        return rules.validateMove(new MoveData({
            fromRank,
            destRank,
            fromFile,
            destFile,
            player,
            isCapture,
        }));
    }

    public static isCapture(board: string, dest: string, player: string): boolean {
        let destFile = dest.charCodeAt(1)
        let destRank = dest.charAt(dest.length - 1) as unknown as number;
        let ranks = board.split(" ")[0].split("/");

        let targetRank = [...ranks[ranks.length - destRank]];
        let counter = 0;
        for (const space of targetRank) {
            const spaceCharCode = space.charCodeAt(0);
            if (spaceCharCode > 47 && spaceCharCode < 58) {
                let number = +space;
                counter += number;
            }
            else
                counter++;

            if (counter > destFile - 96)
                break;
            else if (counter == destFile - 96 && ((player == "w" && spaceCharCode > 64 && spaceCharCode < 91) || (player == "b" && spaceCharCode > 96 && spaceCharCode < 123)))
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