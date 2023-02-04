import { GetMoveRequest } from './Models/getMoveRequest';
import { PieceRulesFactory } from './Factories/pieceRulesFactory';
import { Rules } from '../Rules/rules';
import { MoveDataFactory } from './Factories/moveDataFactory';
import { IMoveData } from './Models/iMoveData';
import _ from 'lodash';

export class GameRulesService {
    public locationBlackKing: string;
    public locaitonWhiteKing: string;
    public blackPins: string[];
    public whitePins: string[];
    public isBlackChecked: boolean;
    public isWhiteChecked: boolean;
    public isMate: boolean;
    public isDraw: boolean;

    constructor() {
        this.locaitonWhiteKing = "";
        this.locationBlackKing = "";
        this.blackPins = [];
        this.whitePins = [];
        this.isBlackChecked = false;
        this.isWhiteChecked = false;
        this.isMate = false;
        this.isDraw = false;
    }

    public validateMove(board: string, from: string, dest: string) {
        let piece = from[0].toLowerCase();
        let player = from.charAt(0) == from.charAt(0).toUpperCase() ? "w" : "b";
        let rules: Rules = PieceRulesFactory.getRules(board, piece, from, dest);

        let moveData: IMoveData = MoveDataFactory.getMoveData(new GetMoveRequest({
            from,
            dest,
            piece,
            player,
            whitePins: this.whitePins,
            blackPins: this.blackPins,
            isWhiteChecked: this.isWhiteChecked,
            isBlackChecked: this.isBlackChecked,
            isCapture: this.isCapture(board, dest, player),
            isSpaceAttacked: this.getAttackers(dest, player, board).length ? true : false,
        }));

        return rules.validateMove(moveData);
    }

    public isCapture(board: string, dest: string, player: string): boolean {
        let destFile = dest.charCodeAt(0)
        let destRank = dest.charAt(dest.length - 1) as unknown as number;
        let ranks = board.split(" ")[0].split("/");

        let targetRank = ranks[ranks.length - destRank];
        const space = this.getSpaceFromRank(targetRank, destFile - 96);
        if (_.isNumber(+space))
            return false;
        let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
        if ((player == "w" && colorOfPiece == "b") || (player == "b" && colorOfPiece == "w"))
            return true;

        return false;
    }

    public evaluateBoard(playerThatJustMoved: string, board: string): void {
        // is Check
        let ranks = board.split(" ")[0].split("/");
        let rankIndex = ranks.findIndex(x => x.includes(playerThatJustMoved == "w" ? "k" : "K"));
        let rank = 8 - rankIndex;
        let fileIndex = ranks[rankIndex].indexOf(playerThatJustMoved == "w" ? "k" : "K");
        let file = 97 - fileIndex;
        let attackers = this.getAttackers(`${String.fromCharCode(file)}${rank}`, playerThatJustMoved == "w" ? "b" : "w", board);
        let isCheck = attackers.length > 0;
        this.isBlackChecked = isCheck && playerThatJustMoved == "w" ? true : false;
        this.isWhiteChecked = isCheck && playerThatJustMoved == "b" ? true : false;

        // is Check mate 
        if (isCheck) {

            // return if is check mate
        }
        // is Draw 
        // return if is draw 

        // update Pinned 

    }

    public getAttackers(space: string, player: string, board: string): string[] {
        // check all directions starting from attacked space 
        let attackers: string[] = [];
        let ranks = board.split(" ")[0].split("/");
        let targetRank: string = ranks[8 - +space.charAt(space.length - 1)];

        // horizontal
        let horizontalAttackers = this.getHorizontalAttackers(targetRank, space.charCodeAt(0), player);
        if (horizontalAttackers.length)
            attackers.push(...horizontalAttackers);
        // vertical
        let verticalAttackers = this.getVerticalAttackers(ranks, space, player);
        if (verticalAttackers.length)
            attackers.push(...verticalAttackers);
        // diagonals
        let bottomTopAttackers = this.getBottomToTopDiagonalAttackers(ranks, space, player);
        if (bottomTopAttackers.length)
            attackers.push(...bottomTopAttackers);
        let topBottom = this.getTopToBottomDiagonalAttackers(ranks, space, player);
        if (topBottom.length)
            attackers.push(...topBottom);
        // knight spaces 
        let knightAttackers = this.getKnightAttackers(ranks, space, player);
        if (knightAttackers.length)
            attackers.push(...knightAttackers);

        return attackers;
    }

    private getHorizontalAttackers(targetRank: string, targetFileCharCode: number, player: string): string[] {
        let attackers = [];
        let leftAttacker: string;
        let rightAttackers: string;
        let counter = 0;
        for (const space of targetRank) {
            if (_.isNumber(+space)) {
                let number = +space;
                counter += number;
                continue;
            }
            else
                counter++;

            if (counter < (targetFileCharCode - 96)) {
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece && (space.toLowerCase() == "r" || space.toLowerCase() == "q")) {
                    leftAttacker = `${String.fromCharCode(counter + 96)}${+space.charAt(space.length - 1)}`;
                }
                else {
                    leftAttacker = undefined;
                }
            }
            else if (counter > (targetFileCharCode - 96)) {
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (((colorOfPiece == "w" && player == "w") || (colorOfPiece == "b" && player == "b")) && rightAttackers == undefined)
                    break;
                else if (player != colorOfPiece && (space.toLowerCase() == "r" || space.toLowerCase() == "q")) {
                    rightAttackers = `${String.fromCharCode(counter + 96)}${+space.charAt(space.length - 1)}`;
                    break;
                }
            }
        }
        if (leftAttacker)
            attackers.push(leftAttacker);
        if (rightAttackers)
            attackers.push(rightAttackers);
        return attackers;
    }

    private getVerticalAttackers(ranks: string[], targetSpace: string, player: string): string[] {
        let attackers = [];
        let targetRankNum: number = +targetSpace.charAt(1);
        let targetFileCharCode: number = targetSpace.charCodeAt(0);
        let aboveAttacker: string;
        let belowAttacker: string;
        let rankIndex = 0;
        for (const rank of ranks) {
            // if above target
            if (8 - rankIndex > targetRankNum) {
                const space = this.getSpaceFromRank(rank, targetFileCharCode - 96);
                if (_.isNumber(+space))
                    continue;
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece)
                    aboveAttacker = `${String.fromCharCode(targetFileCharCode)}${8 - rankIndex}`;
                else
                    aboveAttacker = undefined;
            }
            // if below target
            else if (8 - rankIndex < targetRankNum) {
                const space = this.getSpaceFromRank(rank, targetFileCharCode - 96);
                if (_.isNumber(+space))
                    break;
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece) {
                    belowAttacker = `${String.fromCharCode(targetFileCharCode)}${8 - rankIndex}`;
                    break;
                }
                break;
            }
            rankIndex++;
        }
        if (aboveAttacker)
            attackers.push(aboveAttacker);
        if (belowAttacker)
            attackers.push(belowAttacker);
        return attackers;
    }

    private getBottomToTopDiagonalAttackers(ranks: string[], targetSpace: string, player: string): string[] {
        let targetRank = +targetSpace.charAt(targetSpace.length - 1)
        let targetFileCharCode = targetSpace.charCodeAt(0);
        let distanceLeft = targetFileCharCode - 97;
        let distanceBottom = targetRank - 1;
        let bottomLeft: string;

        if (distanceLeft < distanceBottom)
            bottomLeft = `${String.fromCharCode(targetFileCharCode - distanceLeft)}${targetRank - distanceLeft}`
        else if (distanceBottom <= distanceLeft)
            bottomLeft = `${String.fromCharCode(targetFileCharCode - distanceBottom)}${targetRank - distanceBottom}`;

        let attackers = [];
        let leftAttacker: string;
        let rightAttacker: string;
        for (let i = bottomLeft.charCodeAt(0) - 96, j = +bottomLeft.charAt(bottomLeft.length - 1); i <= 8 && j <= 8; i++, j++) {
            let rank = ranks[8 - j];
            if (targetRank < j) {
                const space = this.getSpaceFromRank(rank, i);
                if (_.isNumber(+space))
                    break;
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece)
                    leftAttacker = `${String.fromCharCode(i + 96)}${j}`;
                else
                    leftAttacker = undefined;
            } else if (j > targetRank) {
                const space = this.getSpaceFromRank(rank, i);
                if (_.isNumber(+space))
                    break;
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece) {
                    rightAttacker = `${String.fromCharCode(i + 96)}${j}`;
                    break;
                }
                break;
            }
        }
        if (leftAttacker)
            attackers.push(leftAttacker);
        if (rightAttacker)
            attackers.push(rightAttacker);
        return attackers;
    }

    private getTopToBottomDiagonalAttackers(ranks: string[], targetSpace: string, player: string): string[] {
        let targetRank = +targetSpace.charAt(targetSpace.length - 1)
        let targetFileCharCode = targetSpace.charCodeAt(0);
        let topLeft: string;
        let distanceTop = 8 - targetRank;
        let distanceLeft = targetFileCharCode - 97;

        if (distanceLeft < distanceTop)
            topLeft = `${String.fromCharCode(targetFileCharCode - distanceLeft)}${targetRank + distanceLeft}`
        else if (distanceTop <= distanceLeft)
            topLeft = `${String.fromCharCode(targetFileCharCode - distanceTop)}${targetRank + distanceTop}`;

        let attackers = [];
        let leftAttacker: string;
        let rightAttacker: string;
        for (let i = topLeft.charCodeAt(0) - 96, j = +topLeft.charAt(topLeft.length - 1); i <= 8 && j >= 1; i++, j--) {
            let rank = ranks[8 - j];
            if (j > targetRank) {
                const space = this.getSpaceFromRank(rank, i);
                if (_.isNumber(+space))
                    continue;
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece)
                    leftAttacker = `${String.fromCharCode(i + 96)}${j}`;
                else
                    leftAttacker = undefined;

            } else if (targetRank < j) {
                const space = this.getSpaceFromRank(rank, i);
                if (_.isNumber(+space))
                    continue;
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (player != colorOfPiece) {
                    rightAttacker = `${String.fromCharCode(i + 96)}${j}`;
                    break;
                }
                break;
            }
        }

        if (leftAttacker)
            attackers.push(leftAttacker);
        if (rightAttacker)
            attackers.push(rightAttacker);
        return attackers;
    }

    private getKnightAttackers(ranks: string[], targetSpace: string, player: string) {
        let targetRank = +targetSpace.charAt(targetSpace.length - 1)
        let targetFileCharCode = targetSpace.charCodeAt(0);
        let attackers = [];
        if (targetRank + 2 <= 8) {
            // up 2 right 1
            if ((targetFileCharCode - 96) + 1 < 8) {
                let rank = ranks[8 - (targetRank + 2)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) + 1);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) + 1)}${targetRank + 2}`);
            }
            // up 2 left 1
            if ((targetFileCharCode - 96) - 1 < 8) {
                let rank = ranks[8 - (targetRank + 2)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) - 1);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) - 1)}${targetRank + 2}`);
            }
        }
        if (targetRank + 1 <= 8) {
            // right 2 up 1
            if ((targetFileCharCode - 96) + 2 < 8) {
                let rank = ranks[8 - (targetRank + 1)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) + 2);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) + 2)}${targetRank + 1}`);
            }
            // left 2 up 1
            if ((targetFileCharCode - 96) - 2 < 8) {
                let rank = ranks[8 - (targetRank + 1)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) - 2);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) - 2)}${targetRank + 1}`);
            }
        }
        if (targetRank - 1 >= 1) {
            // right 2 down 1
            if ((targetFileCharCode - 96) + 2 < 8) {
                let rank = ranks[8 - (targetRank - 1)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) + 2);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) + 2)}${targetRank - 1}`);
            }
            // left 2 down 1
            if ((targetFileCharCode - 96) - 2 < 8) {
                let rank = ranks[8 - (targetRank - 1)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) - 2);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) - 2)}${targetRank - 1}`);
            }
        }
        if (targetRank - 2 >= 1) {
            // right 1 down 2
            if ((targetFileCharCode - 96) + 1 < 8) {
                let rank = ranks[8 - (targetRank - 2)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) + 1);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) + 1)}${targetRank - 2}`);
            }
            // left 1 down 2
            if ((targetFileCharCode - 96) - 1 < 8) {
                let rank = ranks[8 - (targetRank - 2)];
                const space = this.getSpaceFromRank(rank, (targetFileCharCode - 96) - 1);
                let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                if (_.isNaN(+space) && player != colorOfPiece)
                    attackers.push(`${String.fromCharCode((targetFileCharCode - 96) - 1)}${targetRank - 2}`);
            }
        }
        return attackers;
    }

    private getSpaceFromRank(fullRank: string, file: number): string {
        let counter = 0;
        for (const space of fullRank) {
            if (_.isNumber(+space)) {
                let number = +space;
                counter += number;
                continue;
            }
            else
                counter++;

            if (counter >= file)
                return space;
        }
    }
}



