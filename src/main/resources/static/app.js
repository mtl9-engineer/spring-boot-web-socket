var name = "";
const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8088/gs-guide-websocket'
});
stompClient.onConnect = (frame) => {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/1', (greeting) => {
        console.log(JSON.parse(greeting.body))
        showGreeting(JSON.parse(greeting.body).time,JSON.parse(greeting.body).from,JSON.parse(greeting.body).text);
    });
};

stompClient.onWebSocketError = (error) => {
    console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
    console.error('Broker reported error: ' + frame.headers['message']);
    console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    stompClient.activate();
}

function disconnect() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    if($("#message").val() != null && $("#name").val() != null ){
    name = name == "" ? $("#name").val() : name
    stompClient.publish({
            destination: "/app/chat/1",

            body: JSON.stringify(
                {
                'from': $("#name").val() ,
                'text': $("#message").val(),
                'time' : 'test'
                }
            )
        });
    }
    $("#name").hide();

}

function showGreeting(time,from,message) {
    $("#greetings").append("<tr><th>"+from+"</th><td>" + message +"  &nbsp&nbsp&nbsp" +time + "</td></tr>");
}

$(function () {
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendName());
});