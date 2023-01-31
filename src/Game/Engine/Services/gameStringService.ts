import _ from 'lodash';
import { FenStringService } from './fenStringService';

export class GameStringService {

    public static updateFen(fen: string, from: string, dest: string, isCapture: boolean, promotion?: string): string {
        return FenStringService.update(fen, from, dest, isCapture, promotion);
    }

    public static updateSan(san: string, from: string, dest: string) {

    }


}