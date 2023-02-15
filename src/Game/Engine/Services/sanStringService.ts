import { IUpdateSanString } from "./Models/updateSanString";

export class SanStringService {

    public static update(update: IUpdateSanString): string {
        let piece = update.from.charAt(0);
        let sanList: string[] = update.san.split(" ");
        // TODO: implement short version, do the work
        // r q n p
        if (piece.toUpperCase() == piece)
            sanList.push(`${update.from}${update.dest}`);

        return "";
    }


}