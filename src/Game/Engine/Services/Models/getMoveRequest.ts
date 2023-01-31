import { MapperService } from "../../../../Services/mapperService";

export class GetMoveRequest implements IGetMoveRequest {
    public from: string;
    public dest: string;
    public piece: string;
    public player: string;
    public whitePins: string[];
    public blackPins: string[];
    public isWhiteChecked: boolean;
    public isBlackChecked: boolean;
    public isCapture: boolean;
    public isSpaceAttacked: boolean;

    constructor(data?: IGetMoveRequest) {
        MapperService.map(data, this);
    }

}

export interface IGetMoveRequest {
    from: string;
    dest: string;
    piece: string;
    player: string;
    whitePins: string[];
    blackPins: string[];
    isWhiteChecked: boolean;
    isBlackChecked: boolean;
    isCapture: boolean;
    isSpaceAttacked: boolean;
}