import websockets
import re
import paho.mqtt.client as mqttClient
import time
import asyncio
import datetime

h=-1
async def tim(websocket, path):
    while True:
        await websocket.send(result)
        await asyncio.sleep(1)

def on_connect(client, userdata, flags, rc):
    
 
    if rc == 0:
 
        print("Connected to broker")
 
        global Connected                #Use global variable
        Connected = True                #Signal connection 
 
    else:
 
        print("Connection failed")
 
def on_message(client, userdata, message):
    #print ("Message received: "  + str(message.payload))
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

    # start_server = websockets.serve(tim, 'localhost', 5678)
    # asyncio.get_event_loop().run_until_complete(start_server)
    # asyncio.get_event_loop().run_forever()
    # h=h+1
    # print(h)
    


'''start_server = websockets.serve(time, '127.0.0.1', 5678)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()'''
# asyncio.get_event_loop().run_forever()
Connected = False #global variable for the state of the connection
broker_address= "13.232.6.208"
port = 1883
user = "mqtttester"
password = "Orahi@123"


client = mqttClient.Client("Python") 
#mqttc = mqtt.Client(transport='websockets')               #create new instance
client.username_pw_set(user, password=password)    #set username and password
client.on_connect= on_connect    
client.on_message= on_message


client.connect(broker_address, port=port) 


client.loop_start()                        #start the loop
 
while Connected != True:    #Wait for connection
    time.sleep(0.1) 
client.subscribe("#")


try:
    while True:
        time.sleep(1)

 
except KeyboardInterrupt:
    print ("exiting")
    client.disconnect()
    client.loop_stop()
