
export interface IMoveData {
    fromRank: number;
    destRank: number;
    fromFile: number;
    destFile: number;
    player: string;
    isChecked: boolean;
    isPinned: boolean;
}