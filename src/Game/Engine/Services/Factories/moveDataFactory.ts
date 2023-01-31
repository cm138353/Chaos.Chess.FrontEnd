import { GeneralMoveData } from "../Models/generalMoveData";
import { IGetMoveRequest } from "../Models/getMoveRequest";
import { IMoveData } from "../Models/iMoveData";
import { KingMoveData } from "../Models/kingMoveData";
import { PawnMoveData } from "../Models/pawnMoveData";

export class MoveDataFactory {

    public static getMoveData(request: IGetMoveRequest): IMoveData {
        let from = request.from;
        let dest = request.dest;

        let moveData: IMoveData = new GeneralMoveData({
            fromRank: +from.charAt(from.length - 1),
            destRank: +dest.charAt(dest.length - 1),
            fromFile: from.charCodeAt(1),
            destFile: dest.charCodeAt(0),
            player: request.player,
            isChecked: request.player == "w" ? request.isWhiteChecked : request.isBlackChecked,
            isPinned: request.player == "w" ? request.whitePins.some(x => x == from) : request.blackPins.some(x => x == from)
        });
        switch (request.piece.toLowerCase()) {
            case "p":
                moveData = new PawnMoveData(moveData);
                (moveData as PawnMoveData).isCapture = request.isCapture;
                break;
            case "k":
                moveData = new KingMoveData(moveData);
                (moveData as KingMoveData).isDestAttacked = request.isSpaceAttacked;
                break;
        }

        return moveData;
    }
}