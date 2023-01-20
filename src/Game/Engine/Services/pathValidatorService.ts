import { singleton } from 'aurelia';
@singleton
export class PathValidatorService {
    private board: string;

    constructor(board: string) {
        this.board = board;
    }

    public isPathBlocked(path: string[], player: string) {
        let dest = path[path.length - 1];
        let destFile = dest.charCodeAt(0);
        let destRank = parseInt(dest.charAt(dest.length - 1));
        let ranks = this.board.split(" ")[0].split("/");
        let targetRank = [...ranks[ranks.length - destRank]];
        let counter = 0;
        for (const space of targetRank) {
            if (space.charCodeAt(0) > 47 && space.charCodeAt(0) < 58) {
                let number = parseInt(space);
                counter += number;
            }
            else
                counter++;

            if (counter > destFile - 97)
                return false;
            else if (counter == destFile - 97 && ((player == "w" && space.charCodeAt(0) > 64 && space.charCodeAt(0) < 91) || (player == "b" && space.charCodeAt(0) > 96 && space.charCodeAt(0) < 123)))
                return true;
        }
    }
}