/*
	* MQTT-WebClient example for Web-IO 4.0
*/
var hostname = "13.232.6.208";
var port = 1883;
var clientId = "webio4mqttexample";
clientId += new Date().getUTCMilliseconds();;
var username = "mqtttester";
var password = "Orahi@123";
var subscription = "#";

mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived = MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
	mqttClient.connect({
	onSuccess: Connected,
	onFailure: ConnectionFailed,
	keepAliveInterval: 10,
	userName: username,
	useSSL: true,
	password: password});
}

/*Callback for successful MQTT connection */
function Connected() {
	console.log("Connected");
	mqttClient.subscribe(subscription);
}

/*Callback for failed connection*/
function ConnectionFailed(res) {
	console.log("Connect failed:" + res.errorMessage);
}

/*Callback for lost connection*/
function ConnectionLost(res) {
	if (res.errorCode !== 0) {
		console.log("Connection lost:" + res.errorMessage);
		Connect();
	}
}

/*Callback for incoming message processing */
function MessageArrived(message) {
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
	console.log(str2);
	switch(message.payloadString){
		case "ON":
			displayClass = "on";
			break;
		case "OFF":
			displayClass = "off";
			break;
		default:
			displayClass = "unknown";
	}
	var topic = message.destinationName.split("/");
	if (topic.length == 3){
		var ioname = topic[1];
		UpdateElement(ioname, displayClass);
	}
}