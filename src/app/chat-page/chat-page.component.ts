import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SocketioService } from '../shared/services/socketio.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements OnInit, OnDestroy {

  messages : any;
  textBox : string = '';

  constructor(private socketService: SocketioService, private elementRef:ElementRef) { }

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
  }

  ngAfterViewInit() {
    this.messages = this.elementRef.nativeElement.querySelector('#messages');
    // this.messages?.insertAdjacentHTML('afterend', '<div>' + '' + '</div>');

    this.socketService.Message.subscribe((msg)=> {
      this.messages?.insertAdjacentHTML('afterend', '<div>' + msg + '</div>');
    })
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

  sendMsg(event: any){
    // console.log(event.target.value)
    this.socketService.sendMessage(event.target.value)
    this.messages?.insertAdjacentHTML('afterend', '<div> You: ' + event.target.value + '</div>');
    this.textBox = '';
  }
}
