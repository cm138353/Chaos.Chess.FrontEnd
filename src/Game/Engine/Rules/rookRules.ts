import { MoveData } from './../Services/gameRulesService';
import { Rules } from './rules';
export class RookRules extends Rules {


    public validateMove(move: MoveData): boolean {
        let rankDirection = move.fromRank - move.destRank;
        let fileDirection = move.fromFile - move.destFile;

        // if(move.isCapture)


        return true;
    }
}