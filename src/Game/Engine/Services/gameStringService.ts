import * as _ from 'lodash';
import { FenStringService } from './fenStringService';

export class GameStringService {

    public static updateFen(fen: string, from: string, dest: string): string {
        return FenStringService.update(fen, from, dest);
    }


    public static updateSan(san: string, from: string, dest: string) {

    }


}