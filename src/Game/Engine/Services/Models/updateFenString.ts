import { MapperService } from './../../../../Services/mapperService';
import { IUpdateGameString } from "./iUpdateGameString";
export class UpdateFenString implements IUpdateFenString {
    public from: string;
    public dest: string;
    public promotion: string;
    public fen: string;
    public isCapture: boolean;

    constructor(data?: IUpdateFenString) {
        MapperService.map(data, this);
    }
}

export interface IUpdateFenString extends IUpdateGameString {

}