var mqtt    = require('mqtt');
var count =0;
var client  = mqtt.connect("mqtt://13.232.6.208",{
	clientId:"mqttjs01",
	username: 'mqtttester',
   password: 'Orahi@123'});
console.log("connected flag  " + client.connected);
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}




var WebSocketClient = require('websocket').client;
 
var client1 = new WebSocketClient();
 
client1.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client1.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8' && message.utf8Data!='undefined') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    function sendNumber(x) {
        if (connection.connected) {
            connection.send(""+x);
            setTimeout(sendNumber, 1000);
        }
    }
    

 




























client.on('message',function(topic, message, packet){
	str = ("" + message).replace(/\\/g, '');
	str1=("" + str).replaceAt(15," ");
	var i,str2;
	for (var i = 0; i < str1.length; i++) {
		if(str1[i]=='}')
		{
			for(var j=0;j<120;j++)
				if(str1[i+j]=='"')
				{
				str2=("" + str1).replaceAt(i+1," ");
				break;
		}
		}
	}
	// result=JSON.parse(str2);
	// location_details = result.data.res;
	// // lati = location_details.lat;
	// long=location_details.lon;
	sendNumber(str2);
	
	//console.log(lati+"   "+long)
	console.log(topic)
});
});

client.on("connect",function(){	
console.log("connected  "+ client.connected);

})

var topic="pds/device/0867793030516506";

console.log("subscribing to topics");
client.subscribe(topic,{qos:0}); //single topic





client1.connect('ws://localhost:8080/', 'echo-protocol');
console.log("end of script");