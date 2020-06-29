import sys
import paho.mqtt.client as mqtt

def on_connect(mqttc, obj, flags, rc):
	if rc == 0:
		print("Connected to broker")
		global Connected
		Connected = True
	else:
		print("Connection failed")
		print("rc: "+str(rc))

def on_message(mqttc, obj, msg):
    
    a=str(message.payload)
    res = re.split(r' |/|\\',a)
    b=''.join(res)
    c=list(b)
    count=-1
    count1=-1
    if c[0]!="'":
        c[0]=""
    for j in c:
        count1=count1+1
        if c[count1]=="s":
            c[count1+3]=""
    for i in c:
        count=count+1
        if c[count]=='}':
            c[count+1]=""
            break
    result=''.join(c)
    global h
    h=h+1
    global l
    l=[]
    l.append(result)
    for line in l:
        print(line)

def on_publish(mqttc, obj, mid):
    print("mid: "+str(mid))

def on_subscribe(mqttc, obj, mid, granted_qos):
    print("Subscribed: "+str(mid)+" "+str(granted_qos))

def on_log(mqttc, obj, level, string):
    print(string)
Connected = False #global variable for the state of the connection
broker_address= "13.232.6.208"
port = 1883
user = "mqtttester"
password = "Orahi@123"
mqttc = mqtt.Client(transport='websockets')  
mqttc.username_pw_set(user, password=password) 
mqttc.on_message = on_message
mqttc.on_connect = on_connect
mqttc.on_publish = on_publish
mqttc.on_subscribe = on_subscribe

mqttc.connect(broker_address, port=port)

mqttc.subscribe("#", 0)
#mqttc.subscribe("$SYS/#", 0)

mqttc.loop_forever()