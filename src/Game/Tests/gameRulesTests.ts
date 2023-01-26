import { ChessGameFactory } from './../Engine/chessGameFactory';
export async function runTests() {
    let names = ["test_pawn_movement", "test_italian_game", "test_ruy_lopez", "test_scholars_mate"];
    let task = Promise.all([test_pawn_movement(), test_italian_game(), test_ruy_lopez(), test_scholars_mate()]);
    let result = await task;

    for (let i = 0; i < result.length; i++) {
        console.log(names[i] + "\t" + result[i]);
    }
}

function test_scholars_mate() { // 1.e4 e5 2.Bc4 (targeting f7) Nc6 3.Qh5 (adding another attacker to the f7-pawn) Nf6?? 4.Qxf7#
    let factory = new ChessGameFactory();
    let chessGame = factory.NewStandardGame();

    let success = chessGame.move("Pe2", "e4");
    if (!success)
        return false;

    success = chessGame.move("pe7", "e5");
    if (!success)
        return false;

    success = chessGame.move("Bf1", "c4");
    if (!success)
        return false;

    success = chessGame.move("nb8", "c6");
    if (!success)
        return false;

    success = chessGame.move("Qd1", "h5");
    if (!success)
        return false;

    chessGame.move("ng8", "f6");
    if (!success)
        return false;

    success = chessGame.move("Qh5", "f7");
    if (!success)
        return false;

    return true;
}

function test_italian_game() {
    let factory = new ChessGameFactory();
    let chessGame = factory.NewStandardGame();

    let success = chessGame.move("Pe2", "e4");
    if (!success)
        return false;

    success = chessGame.move("pe7", "e5");
    if (!success)
        return false;

    success = chessGame.move("Ng1", "f3");
    if (!success)
        return false;

    success = chessGame.move("nb8", "c6");
    if (!success)
        return false;

    success = chessGame.move("Bf1", "c4");
    if (!success)
        return false;

    return true;
}

function test_ruy_lopez() { // 1. e4 e5  2. Nf3 Nc6  3. Bb5
    let factory = new ChessGameFactory();
    let chessGame = factory.NewStandardGame();

    let success = chessGame.move("Pe2", "e4");
    if (!success)
        return false;

    success = chessGame.move("pe7", "e5");
    if (!success)
        return false;

    success = chessGame.move("Ng1", "f3");
    if (!success)
        return false;

    success = chessGame.move("nb8", "c6");
    if (!success)
        return false;

    success = chessGame.move("Bf1", "b5");
    if (!success)
        return false;

    return true;
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
        sucess = chessGame.move(`pe7`, `e${i}`);
        if (((i == 6 || i == 5) && sucess == false) || (i != 6 && i != 5 && sucess == true))
            return false;
    }

    for (let i = 1; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("Pa2", `${"a".charCodeAt(0) + i}2`);
        if (sucess == true)
            return false;
    }

    for (let i = 1; i > 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("Ph2", `${"h".charCodeAt(0) - i}2`);
        if (sucess == true)
            return false;
    }

    for (let i = 1; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("pa7", `${"a".charCodeAt(0) + i}7`);
        if (sucess == true)
            return false;
    }

    for (let i = 1; i < 9; i++) {
        chessGame = factory.NewStandardGame();
        sucess = chessGame.move("ph7", `${"h".charCodeAt(0) - i}7`);
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

function test_bishop_movement() {

}