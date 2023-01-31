import { MapperService } from "../../../../Services/mapperService";
import { IMoveData } from "./iMoveData";

export class KingMoveData implements IMoveData {
    public fromRank: number;
    public destRank: number;
    public fromFile: number;
    public destFile: number;
    public player: string;
    public isChecked: boolean;
    public isPinned: boolean;
    public isDestAttacked: boolean;

    constructor(data?: IMoveData) {
        MapperService.map(data, this);
    }
}