import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    // serverUrl = 'blueboard.azurewebsites.net';
  serverUrl = 'localhost:8080';
    webSocketEndpoit: string = 'ws://' + this.serverUrl +'/gs-guide-websocket';
    subscribeEndpoint: string = '/topic/operation';
    sendEndpoint: string = '/app/operation';

    webSocket: any;

    constructor() { }

    connect() {
        let socket = new WebSocket(this.webSocketEndpoit);
        this.webSocket = Stomp.over(socket);
        let that = this;
        return new Observable(observer => {
            this.webSocket.connect({}, function (frame) {
                that.webSocket.subscribe(that.subscribeEndpoint, function (message) {
                    console.log(message)
                    observer.next(message.body);
                });
            });

        });
    }

    disconnect() {
        if (this.webSocket != null) {
            this.webSocket.ws.close();
        }
        console.log("BB disconnected");
    }

    senMessage(msg: string) {
        console.log('BB sending message');
        this.webSocket.send(this.sendEndpoint, {}, msg);
    }

}
