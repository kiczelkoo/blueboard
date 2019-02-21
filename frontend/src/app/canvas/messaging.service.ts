import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    serverUrl = 'ws://blboard.herokuapp.com';
    // serverUrl = 'ws://localhost:8080';
    webSocketEndpoit: string = this.serverUrl + '/gs-guide-websocket';
    subscribeEndpoint: string = '/topic/operation/';
    sendEndpoint: string = '/app/operation/';

    webSocket: any;

    constructor() { }

    connect(boardNumber: String) {
        let socket = new WebSocket(this.webSocketEndpoit);
        this.webSocket = Stomp.over(socket);
        let that = this;
        return new Observable(observer => {
            this.webSocket.connect({}, function (frame) {
                that.webSocket.subscribe(that.subscribeEndpoint + boardNumber, function (message) {
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

    senMessage(msg: string, boardNumber: String) {
        console.log('BB sending message');
        this.webSocket.send(this.sendEndpoint + boardNumber, {}, msg);
    }

}
