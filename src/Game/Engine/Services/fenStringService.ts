import { GameRulesService } from './gameRulesService';
export class FenStringService {

    public static update(fen: string, from: string, dest: string): string {
        let piece = from.charAt(0);
        let board = fen.split(" ")[0];
        let boardStatus = fen.split(" ").slice(1);
        let isCapture = GameRulesService.isCapture(fen, dest, piece == piece.toUpperCase() ? "w" : "b");

        let replace = this.moveFrom(board, from);
        replace = this.moveDest(replace, dest, piece);
        fen = fen.replace(board, replace);

        let spaces = 0;
        if (piece.toLowerCase() == "p")
            spaces = Math.abs(+from.charAt(2) - +dest.charAt(1));
        else if (piece.toLowerCase() == "k")
            spaces = Math.abs((from.charCodeAt(1) - dest.charCodeAt(0)));

        this.updateBoardStatus(boardStatus, from, spaces, isCapture);

        return fen;
    }

    private static getTargetIndex(rank: string[], file: string, isFrom: boolean): number {
        let counter = 0;
        let index = -1;
        for (const space of rank) {
            if (Number.isInteger(+space)) {
                let number = +space;
                counter += number;
            }
            else
                counter++;

            index++;
            if ((isFrom && counter == file.charCodeAt(0) - 96) || (!isFrom && counter >= file.charCodeAt(0) - 96))
                break;
        }
        return index;
    }

    private static moveFrom(board: string, from: string): string {
        let fromRank = +from.charAt(2);
        let fromFile = from.charAt(1);
        let boardFromRank = [...board.split("/")[8 - fromRank]];
        let buildFromRank: string[] = [];
        let index = this.getTargetIndex(boardFromRank, fromFile, true);

        // index is not on the edges of the array
        if (index != boardFromRank.length - 1 && index != 0) {
            // is there a number to the right only
            if (Number.isNaN(+boardFromRank[index - 1]) && Number.isInteger(+boardFromRank[index + 1])) {
                buildFromRank.push(...[...boardFromRank.slice(0, index), `${+boardFromRank[index + 1] + 1}`]);
                if (index + 1 != boardFromRank.length - 1)
                    buildFromRank.push(...boardFromRank.slice(index + 2));
            }
            // is there a number to the left only
            else if (Number.isInteger(+boardFromRank[index - 1]) && Number.isNaN(+boardFromRank[index + 1])) {
                if (index - 1 != 0)
                    buildFromRank.push(...boardFromRank.slice(0, index - 1));

                buildFromRank.push(...[`${+boardFromRank[index - 1] + 1}`, ...boardFromRank.slice(index + 1)])
            }
            // is there a number on both sides
            else if (Number.isInteger(+boardFromRank[index - 1]) && Number.isInteger(+boardFromRank[index + 1])) {
                if (index - 1 != 0)
                    buildFromRank.push(...boardFromRank.slice(0, index - 1));

                buildFromRank.push(...[`${(+boardFromRank[index - 1]) + (+boardFromRank[index + 1]) + 1}`]);

                if (index + 1 != boardFromRank.length - 1)
                    buildFromRank.push(...boardFromRank.slice(index + 2));
            }
            // there is not a number on either side
            else if (Number.isNaN(+boardFromRank[index - 1]) && Number.isNaN(+boardFromRank[index + 1])) {
                buildFromRank.push(...[...boardFromRank.slice(0, index), "1", ...boardFromRank.slice(index + 1)]);
            }
        }
        // index is in the beginning of the array 
        else if (index == 0) {
            // is not a number
            if (Number.isNaN(+boardFromRank[index + 1])) {
                buildFromRank.push(...["1", ...boardFromRank.slice(index + 1)]);
            }
            // is a number 
            else if (Number.isInteger(+boardFromRank[index + 1])) {
                buildFromRank.push(`${+boardFromRank[index + 1] + 1}`)
                if (index + 1 != boardFromRank.length - 1)
                    buildFromRank.push(...boardFromRank.slice(index + 2));
            }
        }
        // index is at the end of the array 
        else if (index == boardFromRank.length - 1) {
            // is not a number
            if (Number.isNaN(+boardFromRank[index - 1])) {
                buildFromRank.push(...[...boardFromRank.slice(0, index), "1"]);
            }
            // is a number 
            else if (Number.isInteger(+boardFromRank[index - 1])) {
                if (index - 1 != 0)
                    buildFromRank.push(...boardFromRank.slice(0, index - 1));
                buildFromRank.push(`${+boardFromRank[index - 1] + 1}`);
            }
        }
        return this.replaceRank(board, buildFromRank, fromRank);
    }

    private static moveDest(board: string, dest: string, piece: string): string {
        let destRank = +dest.charAt(1);
        let destFile = dest.charAt(0);
        let boardDestRank = [...board.split("/")[8 - destRank]];
        let buildDestRank: string[] = [];
        let index = this.getTargetIndex(boardDestRank, destFile, false);

        // if space is a 1 or
        // if space is occupied by another piece 
        if (+boardDestRank[index] == 1 || Number.isNaN(+boardDestRank[index])) {
            if (index != 0)
                buildDestRank.push(...boardDestRank.slice(0, index));
            buildDestRank.push(piece);
            if (index != boardDestRank.length - 1)
                buildDestRank.push(...boardDestRank.slice(index + 1));
        }
        // if space is one of many empty spaces 
        else if (Number.isInteger(+boardDestRank[index])) {
            // if dest in the middle
            let emptySpacesBefore: number = (destFile.charCodeAt(0) - 96) - index - 1;
            let emptySpacesAfter: number = +boardDestRank[index] - ((destFile.charCodeAt(0) - 96) - index);
            if (index != 0)
                buildDestRank.push(...boardDestRank.slice(0, index));
            buildDestRank.push(...[`${emptySpacesBefore}`, piece, `${emptySpacesAfter}`]);
            if (index != boardDestRank.length - 1)
                buildDestRank.push(...boardDestRank.slice(index + 1));
        }


        return this.replaceRank(board, buildDestRank, destRank);
    }

    private static replaceRank(board: string, buildRank: string[], targetRank: number): string {
        let currRank = 8;
        let startIndex = 0;
        let endIndex = board.indexOf("/");
        let replace: string[] = [];
        while (currRank != targetRank) {
            startIndex = endIndex + 1;
            let slashIndex = board.indexOf("/", endIndex + 1);
            if (slashIndex == -1)
                endIndex = board.length - 1;
            else
                endIndex = slashIndex;

            currRank--;
        }

        if (startIndex == 0)
            replace.push(...buildRank);
        else
            replace.push(...[...board.slice(0, startIndex), ...buildRank]);

        if (endIndex != board.length - 1)
            replace.push(...board.slice(endIndex));

        return replace.join("");
    }

    private static updateBoardStatus(boardStatus: string[], from: string, spaces: number, isCapture: boolean): string {
        let piece = from.charAt(0);
        let buildBoardStatus: string[] = [];
        let currCastleStatus = boardStatus[1].split("");
        let buildCastleStatus: string[] = [];
        let currTurn = boardStatus[0];
        // flip player turn
        buildBoardStatus.push(boardStatus[0] == "w" ? "b" : "w");

        // update castle
        if (boardStatus[1] != "-") {
            if (piece.toLowerCase() == "k") {
                if (piece == piece.toUpperCase()) {
                    if (currCastleStatus.some(x => x == "k"))
                        buildCastleStatus.push("k");
                    if (currCastleStatus.some(x => x == "q"))
                        buildCastleStatus.push("q");
                } else {
                    if (currCastleStatus.some(x => x == "K"))
                        buildCastleStatus.push("K");
                    if (currCastleStatus.some(x => x == "Q"))
                        buildCastleStatus.push("Q");
                }
            }
            else if (piece.toLowerCase() == "r") {
                let fromCharCode = from.charCodeAt(1);
                // queen side rook moves
                if (fromCharCode == 97) {
                    if (piece.toUpperCase() == piece) {
                        if (currCastleStatus.some(x => x == "K"))
                            buildCastleStatus.push("K");
                        if (currCastleStatus.some(x => x == "k"))
                            buildCastleStatus.push("k");
                        if (currCastleStatus.some(x => x == "q"))
                            buildCastleStatus.push("q");
                    } else {
                        if (currCastleStatus.some(x => x == "K"))
                            buildCastleStatus.push("K");
                        if (currCastleStatus.some(x => x == "Q"))
                            buildCastleStatus.push("Q");
                        if (currCastleStatus.some(x => x == "k"))
                            buildCastleStatus.push("k");
                    }
                }
                // king side rook moves 
                else if (fromCharCode == 104) {
                    if (piece.toUpperCase() == piece) {
                        if (currCastleStatus.some(x => x == "Q"))
                            buildCastleStatus.push("Q");
                        if (currCastleStatus.some(x => x == "k"))
                            buildCastleStatus.push("k");
                        if (currCastleStatus.some(x => x == "q"))
                            buildCastleStatus.push("q");
                    } else {
                        if (currCastleStatus.some(x => x == "K"))
                            buildCastleStatus.push("K");
                        if (currCastleStatus.some(x => x == "Q"))
                            buildCastleStatus.push("Q");
                        if (currCastleStatus.some(x => x == "q"))
                            buildCastleStatus.push("q");
                    }
                }
            } else
                buildCastleStatus.push(...boardStatus[1]);
        }
        if (!buildCastleStatus.length && boardStatus[1].length)
            buildBoardStatus.push("-");
        else
            buildBoardStatus.push(buildCastleStatus.join(""));

        // if pawn and move 2 spaces then update en Passant
        if (piece.toLowerCase() == "p" && spaces == 2) {
            if (piece.toUpperCase() == piece)
                buildBoardStatus.push(`${from.charAt(1)}${+from.charAt(2) - 1}`);
            else
                buildBoardStatus.push(`${from.charAt(1)}${+from.charAt(2) + 1}`);
        } else
            buildBoardStatus.push("-");

        // update half moves and full moves
        if (isCapture || piece.toLowerCase() == "p")
            buildBoardStatus.push("0");
        else
            buildBoardStatus.push(`${+boardStatus[3] + 1}`);

        if (currTurn == "b")
            buildBoardStatus.push(`${+boardStatus[4] + 1}`);
        else
            buildBoardStatus.push(boardStatus[4]);

        return buildBoardStatus.join("");
    }

}