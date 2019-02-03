package com.shipit.blueboard.web;

import com.shipit.blueboard.model.Operation;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class BlueboardController {

    @MessageMapping("/operation")
    @SendTo("/topic/operation")
    public Operation greeting(Operation operation) throws Exception {
        Thread.sleep(1000); // simulated delay
        return operation;
    }

}
