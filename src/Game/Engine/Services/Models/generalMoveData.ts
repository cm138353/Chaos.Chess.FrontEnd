import { MapperService } from "../../../../Services/mapperService";
import { IMoveData } from "./iMoveData";

export class GeneralMoveData implements IMoveData {
    public fromRank: number;
    public destRank: number;
    public fromFile: number;
    public destFile: number;
    public player: string;
    public isCapture: boolean;
    public isChecked: boolean;
    public isPinned: boolean;

    constructor(data?: IMoveData) {
        MapperService.map(data, this);
    }
}