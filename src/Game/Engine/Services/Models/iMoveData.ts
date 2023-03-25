
export interface IMoveData {
    fromRank: number;
    destRank: number;
    fromFile: number;
    destFile: number;
    player: string;
    isCheck?: boolean;
    isPinned?: boolean;
}