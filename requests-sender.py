import random
import urllib2
import time

# Seconds between each request
INTERVAL = 5

def getTemperature():
	return random.randint(29,30)

def getHumidity():
	return random.randint(16,30)

def getBrightness():
	return random.randint(16,30)

while 1:
	time.sleep(INTERVAL)
	temp = getTemperature()
	hum = getHumidity()
	bri = getBrightness()
	address = "http://localhost:5000/arduino?temperature={}&humidity={}&brightness={}".format(temp,hum,bri)
	try:
		f =  urllib2.urlopen(address)
		print f.read()
	except Exception:
		print "ERROR: request failed"
