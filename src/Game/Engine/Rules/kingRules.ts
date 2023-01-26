import { MoveData } from "../Services/gameRulesService";
import { Rules } from "./rules";

export class KingRules extends Rules {
    validateMove(move: MoveData): boolean {
        // out of bounds
        if (this.outOfBounds(move))
            return false;

        // blocked

        // path is check

        // only move 1 space or 2 if castle available

        return true;
    }
    protected isBlocked(from: string, dest: string): boolean {
        throw new Error("Method not implemented.");
    }

}