import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  socket:any;
  Message = new BehaviorSubject<string>('');

  constructor() { }

  setupSocketConnection() {
    this.socket = io('http://localhost:3000', { transports : ['websocket'] });

    this.socket.emit('client msg', 'Hi node, from Angular')

    this.socket.on('server msg', (msg: string)=>{
      console.log(msg)
    })
    this.socket.on('recieve msg', (msg: string)=>{
      // console.log('other user says', msg)
      this.Message.next('Other User: ' + msg)
    })
  }

  disconnect() {
    if (this.socket) {
        this.socket.disconnect();
    }
  }
  sendMessage(message: string){
    this.socket.emit('user Message', message)
  }
}
