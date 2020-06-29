a='{"data":{"res":"{\"timestamp\": 1560234681 ,\"imei\":\"0866192037728027\", \"device_time\" : \"2019-06-11 06:31:17+00:00\" , \"receive_time\" :\"2019-06-11 06:31:21\" , \"lat\" :28.477572 , \"lon\" : 77.087297 , \"speed\" : 0}","imei":"0866192037728027"}}'
import re
res = re.split(r' |/|\\',a) 
b=''.join(res)
'''res = re.split('"',b)
b=''.join(res)
res = re.split('}',b)
b=''.join(res)
print(b)
b=b.replace("lon","lng")
c=b.split(",")'''
#print(c[5])
#print(c[4])
#d="{"+c[4]+","+c[5]+"},"
#print(d)
#for b in range(b.length()):
#	pass"''
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



	




