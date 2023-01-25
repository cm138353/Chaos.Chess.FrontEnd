import { MoveData } from "../Services/gameRulesService";
import { Rules } from "./rules";

export class KingRules extends Rules {
    validateMove(move: MoveData): boolean {
        throw new Error("Method not implemented.");
    }
    protected isBlocked(from: string, dest: string): boolean {
        throw new Error("Method not implemented.");
    }

}