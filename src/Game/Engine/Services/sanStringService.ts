import _ from 'lodash';
import { PieceRulesFactory } from './Factories/pieceRulesFactory';
import { IUpdateSanString } from "./Models/updateSanString";

export class SanStringService {

    public static update(update: IUpdateSanString): string {
        let piece = update.from.charAt(0);
        let sanList: string[] = update.san.split(" ").filter(x => !_.isEmpty(x));
        // TODO: implement short version, rook: done, bishop: in progress, queen: todo, knight: todo, pawn: todo

        // r q n p (b if someone promotes pawn to b, otherwise will never happen)
        let rules = PieceRulesFactory.getRules(update.fen, piece);

        let move = rules.getStandardOrLongNotation(update.from, update.dest);

        if (piece.toUpperCase() == piece) {
            let round = 0;
            if (sanList.length >= 3)
                round = +sanList[sanList.length - 3].charAt(0);

            sanList.push(...[`${(++round + ".")}`, `${move}`]);
        } else
            sanList.push(`${move}`);

        return sanList.join(" ");
    }


}