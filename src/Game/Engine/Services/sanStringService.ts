import { Rules } from '../Rules/rules';
import { PieceRulesFactory } from './Factories/pieceRulesFactory';
import { IUpdateSanString } from "./Models/updateSanString";

export class SanStringService {

    public static update(update: IUpdateSanString): string {
        let piece = update.from.charAt(0);
        let sanList: string[] = update.san.split(" ");
        // TODO: implement short version, do the work
        // r q n p (b if someone promotes pawn to b, totherwise will never happen)
        let rules = PieceRulesFactory.getRules(update.fen, piece.toLowerCase());

        // Check how many of each piece can move to the destination ex. pe4 and pc4 to d5
        let move = rules.getStandardOrLongNotation(update.from, update.dest);

        // if (piece.toUpperCase() == piece)
        //     sanList.push(`${update.from}${update.dest}`);

        return sanList.join(" ");
    }


}