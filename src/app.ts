import { autoinject } from 'aurelia-framework';
import { Client } from 'NSwag/chess_swagger';

@autoinject()
export class App {
  public message = 'Hello World!';


  constructor(
    public _client: Client
  ){

  }


  public attached() {
    this._client.usersGET()
  }
}
