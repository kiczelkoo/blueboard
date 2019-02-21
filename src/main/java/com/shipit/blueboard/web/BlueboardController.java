package com.shipit.blueboard.web;

import com.shipit.blueboard.model.Operation;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class BlueboardController {

    @MessageMapping("/operation/{boardNumber}")
    @SendTo("/topic/operation/{boardNumber}")
    public Operation greeting(Operation operation) throws Exception {
        System.out.println("Msg received: " + operation.getName() + " board number: " + operation.getBoardNumber());
//        Thread.sleep(1000); // simulated delay
        return operation;
    }
}
