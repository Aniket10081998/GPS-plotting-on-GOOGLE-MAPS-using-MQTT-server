import asyncio
import datetime
import websockets
import re
import paho.mqtt.client as mqttClient
import time
#import test.py
a='{"data":{"res":"{\"timestamp\": 1560234681 ,\"imei\":\"0866192037728027\", \"device_time\" : \"2019-06-11 06:31:17+00:00\" , \"receive_time\" :\"2019-06-11 06:31:21\" , \"lat\" :28.477572 , \"lon\" : 77.087297 , \"speed\" : 0}","imei":"0866192037728027"}}'
res = re.split(r' |/|\\',a) 
b=''.join(res)
c=list(b)
c[15]=""
#print(c)
count=-1
for i in c:
	count=count+1
	if c[count]=='}':
		c[count+1]=""
		break
result=''.join(c)
#result=test.on_message();
async def tim(websocket, path):
    while True:
        await websocket.send(result)
        await asyncio.sleep(1)
start_server = websockets.serve(tim, 'localhost', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()