import { Game } from "./Game/game";
import { Home } from "./Home/home";
import { ChessClient } from "./NSwag/chess_swagger";

export class MyApp {
  public message = 'Hello World!';
  public _chessClient: ChessClient;
  public static routes = [
    {
      path: '',
      component: Home,
      title: 'Home',
    },
    {
      path: '/game',
      component: Game,
      title: 'Game',
    }
  ];
  constructor() {
    this._chessClient = new ChessClient("https://localhost:44385");
  }


  public async attached() {
    // let response = await this._chessClient.getCurrentGame();

    // console.log(response);

  }
}
