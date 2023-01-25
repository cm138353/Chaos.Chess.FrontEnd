import { MoveData } from './../Services/gameRulesService';
import { Rules } from './rules';

export class PawnRules extends Rules {

    constructor(board: string) {
        super(board);
    }

    public validateMove(move: MoveData): boolean {
        let rankDirection = move.fromRank - move.destRank;
        let fileDirection = move.fromFile - move.destFile;

        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // check if moving backwards
        if (move.player == "b" && rankDirection < 0)
            return false;
        else if (move.player == "w" && rankDirection > 0)
            return false;

        // ensure pawn can only take two steps on initial position
        if (Math.abs(rankDirection) == 2) {
            if (move.player == "b" && move.fromRank != 7)
                return false
            else if (move.player == "w" && move.fromRank != 2)
                return false;
        } else if (Math.abs(rankDirection) > 1) // ensure pawn can only move one space at a time
            return false;

        // ensure pawn cannot eat moving forward
        if (Math.abs(rankDirection) > 0 && Math.abs(fileDirection) == 0 && move.isCapture)
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
        if (Math.abs(fileDirection) == 1 && !move.isCapture && enPassant != `${move.destFile}${move.destRank}`)
            return false;

        // is blocked 
        if (this.isBlocked(`${move.player == "w" ? "P" : "p"}${String.fromCharCode(move.fromFile)}${move.fromRank}`, `${String.fromCharCode(move.destFile)}${move.destRank}`))
            return false;

        return true;
    }


    protected isBlocked(from: string, dest: string) {
        let fromFile = from.charAt(1);
        let destRank: number = +dest.charAt(dest.length - 1);
        let fromRank: number = +from.charAt(from.length - 1);
        let player = from.charAt(0).toUpperCase() == from.charAt(0) ? "w" : "b";

        let path = [];
        let i = fromRank;
        while (i != destRank) {
            if (destRank > fromRank) {
                path.push(`${fromFile}${i + 1}`);
                i++;
            }
            else {
                path.push(`${fromFile}${i - 1}`);
                i--;
            }
        }
        return this.pathValidator.isPathBlocked(path, player);
    }


}