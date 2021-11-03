import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket:any;

  constructor() { }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000', { transports : ['websocket'] });

    this.socket.emit('client msg', 'Hello there from Angular.')
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
}
}
