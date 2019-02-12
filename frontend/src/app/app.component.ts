import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Blueboard';
    greetings: string[] = [];
   showConversation: boolean = false;
   ws: any;
   name: string;
   disabled: boolean;

   constructor(){}

   connect() {
     //connect to stomp where stomp endpoint is exposed
     //let ws = new SockJS(http://localhost:8080/gs-guide-websocket);
     let socket = new WebSocket("ws://localhost:8080/gs-guide-websocket");
     this.ws = Stomp.over(socket);
     let that = this;
     this.ws.connect({}, function(frame) {
       that.ws.subscribe("/topic/operation", function(message) {
         console.log(message)
         that.showGreeting(message.body);
       });
       that.disabled = true;
     });
   }

   disconnect() {
     if (this.ws != null) {
       this.ws.ws.close();
     }
     this.setConnected(false);
     console.log("Disconnected");
   }

   sendName() {
     let data = JSON.stringify({
       'name' : this.name
     })
     this.ws.send("/app/operation", {}, data);
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
