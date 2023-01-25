import { ChessGameFactory } from './../Engine/chessGameFactory';
export function runTests() {
    test_pawn_movement();

}

function test_pawn_movement() {
    let factory = new ChessGameFactory();
    let chessGame = factory.NewStandardGame();
    let sucess = false;

    for (let i = 3; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("Pe2", `e${i}`);
        if (((i == 3 || i == 4) && sucess == false) || (i != 3 && i != 4 && sucess == true))
            return false;
    }

    for (let i = 6; i > 0; i--) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("pe7", "e3");
        if (((i == 6 || i == 5) && sucess == false) || (i != 6 && i != 5 && sucess == true))
            return false;
    }

    for (let i = 1; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("Pa2", `P${"a".charCodeAt(0) + i}2`);
        if (sucess == true)
            return false;
    }

    for (let i = 1; i < 9; i--) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("Ph2", `P${"h".charCodeAt(0) - i}2`);
        if (sucess == true)
            return false;
    }

    for (let i = 1; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("pa7", `p${"a".charCodeAt(0) + i}7`);
        if (sucess == true)
            return false;
    }

    for (let i = 1; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("ph7", `p${"h".charCodeAt(0) - i}7`);
        if (sucess == true)
            return false;
    }

    return true;
}

function test_rook_movement() {
    let factory = new ChessGameFactory();
    let chessGame = factory.NewStandardGame();
    let sucess = false;

}