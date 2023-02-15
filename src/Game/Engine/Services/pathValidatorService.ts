import { singleton } from 'aurelia';
import _ from 'lodash';
import { getSpaceFromRank } from './Utility/helpfulFunctions';
@singleton
export class PathValidatorService {
    private board: string;

    constructor(board: string) {
        this.board = board;
    }

    public isPathBlocked(path: string[], player: string): boolean {
        for (const space of path) {
            let destFile = space.charCodeAt(0) - 96;
            let destRank = +space.charAt(space.length - 1);
            let ranks = this.board.split(" ")[0].split("/");
            let targetRank = ranks[ranks.length - destRank];
            let target = getSpaceFromRank(targetRank, destFile);
            if (_.isFinite(+target))
                return false;
            let colorOfPiece = target == target.toUpperCase() ? "w" : "b";
            if (player == colorOfPiece)
                return true;
            if (player != colorOfPiece && space != path[path.length - 1] && path.length > 1)
                return true;
        }

        return false;
    }
}