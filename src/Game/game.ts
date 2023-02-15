import { inject } from "aurelia";
import _ from "lodash";
import { ChessGame } from "./Engine/chessGame";
import { ChessGameFactory } from "./Engine/Services/Factories/chessGameFactory";
import { runTests } from "./Tests/gameRulesTests";
@inject(ChessGameFactory)
export class Game {
    private game: ChessGame;
    private board: string[][];
    private files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
    private selectedPiece: string;
    private turn: string;

    constructor(chessFactory: ChessGameFactory) {
        runTests();
        this.game = chessFactory.NewStandardGame();
        this.board = [];
        this.getBoard();
        this.turn = "w";
    }

    public move(from: string, to: string): void {//1.e4 e5 2.Nf3 Nc6 3.Bc4
        let success = this.game.move(from, to);
        if (!success)
            console.error("Failed");
        else {
            console.info(this.game.gameFen);
            this.turn = this.turn == "w" ? "b" : "w";
        }
    }

    private selectSpace(rank: number, file: number, isPiece: boolean, colorOfPiece: string) {
        // top to bottom 0 - 7
        // left to right 0 - 7
        const space = `${String.fromCharCode(97 + file)}${8 - rank}`;
        if (this.selectedPiece) {
            if (isPiece && space == this.selectedPiece)
                this.selectedPiece = undefined;
            else if (isPiece && colorOfPiece == this.turn && space != this.selectedPiece)
                this.selectedPiece = this.getPiece(rank, file) + space;
            else if (colorOfPiece != this.turn || !isPiece) {
                this.move(this.selectedPiece, space);
                this.getBoard();
                this.selectedPiece = undefined;
            }
        } else {
            this.selectedPiece = this.getPiece(rank, file) + space;
            let selectedColor = this.selectedPiece[0] == this.selectedPiece[0].toUpperCase() ? "w" : "b";
            if (selectedColor != this.turn)
                this.selectedPiece = undefined;
        }
    }

    private getPiece(rank: number, file: number): string {
        let fullRank = this.game.gameFen.split(" ")[0].split("/")[rank];
        let counter = 0;
        let index = -1;
        for (const space of fullRank) {
            if (_.isFinite(+space)) {
                let number = +space;
                counter += number;
            }
            else
                counter++;

            index++;
            if (counter >= file + 1)
                break;
        }

        return fullRank[index];
    }

    private getBoard() {
        this.board = [];
        let ranks = this.game.gameFen.split(" ")[0].split("/");
        for (let i = 0; i < ranks.length; i++) {
            let rankToPush = [];
            for (const space of ranks[i]) {
                if (_.isFinite(+space))
                    rankToPush.push(...Array(+space).fill([" "]));
                else
                    rankToPush.push([this.getClass(space)]);
            }
            if (rankToPush.length == 8)
                this.board.push(rankToPush);
        }
    }

    private getClass(space: string): string {
        let pieceClass: string;
        if (space.toLowerCase() == space)
            pieceClass = "black";
        else
            pieceClass = "white";


        switch (space.toLowerCase()) {
            case "p":
                pieceClass += "-pawn";
                break;
            case "r":
                pieceClass += "-rook";
                break;
            case "n":
                pieceClass += "-knight";
                break;
            case "b":
                pieceClass += "-bishop";
                break;
            case "q":
                pieceClass += "-queen";
                break;
            case "k":
                pieceClass += "-king";
                break;
        }

        return pieceClass;
    }
}