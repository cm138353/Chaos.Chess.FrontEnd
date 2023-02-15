import { IUpdateFenString } from './Models/updateFenString';
import { IUpdateSanString } from './Models/updateSanString';
import { SanStringService } from './sanStringService';
import _ from 'lodash';
import { FenStringService } from './fenStringService';
import { IUpdateGameString } from './Models/iUpdateGameString';

export class GameStringService {

    public static updateFen = (update: IUpdateGameString): string => FenStringService.update(update as IUpdateFenString);

    public static updateSan = (update: IUpdateGameString): string => SanStringService.update(update as IUpdateSanString);


}