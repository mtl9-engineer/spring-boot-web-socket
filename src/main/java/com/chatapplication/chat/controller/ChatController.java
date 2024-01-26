package com.chatapplication.chat.controller;

import com.chatapplication.chat.Model.Message;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Controller
public class ChatController {


    @MessageMapping("/chat/{roomId}")
    @SendTo("/topic/{roomId}")
    public Message greeting(@DestinationVariable String roomId, Message message) throws Exception {
        Thread.sleep(1000); // simulated delay
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("HH:mm");
        return new Message(message.getFrom(),message.getText(),  simpleDateFormat.format(Date.from(Instant.now())));
    }

}