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

    public evaluateBoard(playerThatJustMoved: string, board: string): void {
        // is Check
        let ranks = board.split(" ")[0].split("/");
        let rankIndex = ranks.findIndex(x => x.includes(playerThatJustMoved == "w" ? "k" : "K"));
        let rank = 8 - rankIndex;
        let fileIndex = ranks[rankIndex].indexOf(playerThatJustMoved == "w" ? "k" : "K");
        let file = 97 - fileIndex;
        let isCheck = this.getAttackers(`${String.fromCharCode(file)}${rank}`, playerThatJustMoved == "w" ? "b" : "w", board);
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

        // horse spaces 

        return [];
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
                if (((colorOfPiece == "w" && player == "b") || (colorOfPiece == "b" && player == "w")) && (space.toLowerCase() == "r" || space.toLowerCase() == "q")) {
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
                else if (((colorOfPiece == "w" && player == "b") || (colorOfPiece == "b" && player == "w")) && (space.toLowerCase() == "r" || space.toLowerCase() == "q")) {
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
                let counter = 0;
                for (const space of rank) {
                    if (_.isNumber(+space)) {
                        let number = +space;
                        counter += number;
                        continue;
                    }
                    else
                        counter++;

                    if (counter == targetRankNum) {
                        let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                        if (((colorOfPiece == "w" && player == "b") || (colorOfPiece == "b" && player == "w")))
                            aboveAttacker = `${String.fromCharCode(targetFileCharCode)}${8 - rankIndex}`;
                        else
                            aboveAttacker = undefined;
                    } else
                        break;
                }
            }
            // if below target
            else if (8 - rankIndex < targetRankNum) {
                let counter = 0;
                for (const space of rank) {
                    if (_.isNumber(+space)) {
                        let number = +space;
                        counter += number;
                        continue;
                    }
                    else
                        counter++;

                    if (counter == targetRankNum) {
                        let colorOfPiece = space == space.toUpperCase() ? "w" : "b";
                        if ((colorOfPiece == "w" && player == "w") || (colorOfPiece == "b" && player == "b"))
                            break;
                        else if (((colorOfPiece == "w" && player == "b") || (colorOfPiece == "b" && player == "w"))) {
                            belowAttacker = `${String.fromCharCode(targetFileCharCode)}${8 - rankIndex}`;
                            break;
                        }
                    } else
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
}



