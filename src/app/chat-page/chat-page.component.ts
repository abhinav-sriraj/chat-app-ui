import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from '../shared/services/socketio.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  constructor(private socketService: SocketioService) { }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
