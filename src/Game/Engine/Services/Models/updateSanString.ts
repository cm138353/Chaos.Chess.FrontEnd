import { MapperService } from '../../../../Services/mapperService';
import { IUpdateGameString } from './iUpdateGameString';
export class UpdateSanString implements IUpdateSanString {
    public from: string;
    public dest: string;
    public promotion: string;
    public fen: string;
    public san: string;
    public isCapture: boolean;
    public isCheck: boolean;

    constructor(data?: IUpdateSanString) {
        MapperService.map(data, this);
    }

}

export interface IUpdateSanString extends IUpdateGameString {
    san: string;
    isCheck: boolean;
}