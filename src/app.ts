import { RequestInit } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { ChessClient } from 'NSwag/chess_swagger';

@autoinject()
export class App {
  public message = 'Hello World!';
  public user;
  public _chessClient: ChessClient;
  constructor(
    
  ){
    this._chessClient = new ChessClient("https://localhost:44385");
  }


  public async attached() {
    let response = await this._chessClient.getCurrentGame();

    console.log(response);
    
  }
}
