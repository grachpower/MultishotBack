import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket;
  private domainUrl: string;

  constructor() { }

  public connect(urlToConnect) {
    this.domainUrl = urlToConnect;

    this.socket = io.connect(urlToConnect);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public emitShot() {
    this.socket.emit('shot');
  }

  public subscribeOnShot() {

  };

}
