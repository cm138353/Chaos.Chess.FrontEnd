import { singleton } from 'aurelia';
import _ from 'lodash';
@singleton
export class PathValidatorService {
    private board: string;

    constructor(board: string) {
        this.board = board;
    }

    public isPathBlocked(path: string[], player: string) {
        let dest = path[path.length - 1];
        let destFile = dest.charCodeAt(0);
        let destRank = +dest.charAt(dest.length - 1);
        let ranks = this.board.split(" ")[0].split("/");
        let targetRank = ranks[ranks.length - destRank];
        let counter = 0;
        for (const space of targetRank) {
            if (_.isNumber(+space)) {
                let number = +space;
                counter += number;
            }
            else
                counter++;

            if (counter > destFile - 96 || _.isNumber(+space))
                return false;
            else if (counter == destFile - 96 && ((player == "w" && space.charAt(0) == space.charAt(0).toUpperCase()) || (player == "b" && space.charAt(0).toLowerCase() == space.charAt(0))))
                return true;
        }
    }
}