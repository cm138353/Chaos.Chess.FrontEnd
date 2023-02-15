import { IMoveData } from '../Services/Models/iMoveData';
import { PawnMoveData } from '../Services/Models/pawnMoveData';
import { Rules } from './rules';

export class PawnRules extends Rules {

    constructor(board: string) {
        super(board);
    }

    public validateMove(move: IMoveData): boolean {
        let moveData: PawnMoveData = new PawnMoveData(move);
        let rankDirection = moveData.fromRank - moveData.destRank;
        let fileDirection = moveData.fromFile - moveData.destFile;

        // out of bounds
        if (this.outOfBounds(moveData))
            return false;

        // check if moving backwards
        if (moveData.player == "b" && rankDirection < 0)
            return false;
        else if (moveData.player == "w" && rankDirection > 0)
            return false;

        // ensure pawn can only take two steps on initial position
        if (Math.abs(rankDirection) == 2) {
            if (moveData.player == "b" && moveData.fromRank != 7)
                return false
            else if (moveData.player == "w" && moveData.fromRank != 2)
                return false;
        } else if (Math.abs(rankDirection) > 1) // ensure pawn can only move one space at a time
            return false;

        // ensure pawn cannot eat moving forward
        if (Math.abs(rankDirection) > 0 && Math.abs(fileDirection) == 0 && moveData.isCapture)
            return false;

        // ensure pawn cannot move laterally more than one space 
        if (Math.abs(fileDirection) > 1)
            return false;

        // ensure pawn cannot move sideways
        if (Math.abs(fileDirection) > 0 && Math.abs(rankDirection) == 0)
            return false;

        // ensure pawn eats one space forward and one space sideways
        if (Math.abs(fileDirection) == 1 && Math.abs(rankDirection) > 1)
            return false;

        // ensure if capture space is empty that destination is equal to en Passant
        let enPassant: string = this.board.split(" ")[3]; // e3 e7 -
        if (Math.abs(fileDirection) == 1 && !moveData.isCapture && enPassant != `${moveData.destFile}${moveData.destRank}`)
            return false;

        // is blocked 
        if (this.isBlocked(move))
            return false;

        return true;
    }


    protected isBlocked(moveData: IMoveData) {
        let path = [];
        let i = moveData.fromRank;
        while (i != moveData.destRank) {
            if (moveData.destRank > moveData.fromRank) {
                path.push(`${String.fromCharCode(moveData.fromFile)}${i + 1}`);
                i++;
            }
            else {
                path.push(`${String.fromCharCode(moveData.fromFile)}${i - 1}`);
                i--;
            }
        }
        return this.pathValidator.isPathBlocked(path, moveData.player);
    }


}