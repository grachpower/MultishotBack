import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class SocketService {
  private socket;
  private domainUrl: string;
  private socketStream: Subject<any> = new Subject();

  constructor() { }

  public connect(urlToConnect) {
    this.domainUrl = urlToConnect;

    this.socket = io.connect(urlToConnect);
    this.socketStream.next(this.socket);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public emitShot() {
    this.socket.emit('shot');
  }

  public subscribeOnShot(): void {

  };

  public selectFolder(): void {
    this.socket.emit('filePath');
  }
}
