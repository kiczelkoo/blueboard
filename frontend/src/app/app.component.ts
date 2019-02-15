import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { MessagingService } from './messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blueboard';
  greetings: string[] = [];
  showConversation: boolean = false;
  name: string;
  disabled: boolean;

  constructor(private messagingService: MessagingService) { }

  connect() {
    let that = this;
    this.messagingService.connect().subscribe(msg => {
      console.log('subscribed', msg);
      console.log(msg);
        // that.showGreeting(msg);
    })
    that.disabled = true;
  }

  disconnect() {
    this.messagingService.disconnect();
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendName() {
    let data = JSON.stringify({
      'name': this.name
    });
    this.messagingService.senMessage(data);
  }

  showGreeting(message) {
    this.showConversation = true;
    this.greetings.push(JSON.parse(message).name)
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.greetings = [];
  }
}
