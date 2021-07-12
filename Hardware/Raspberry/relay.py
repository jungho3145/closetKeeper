import os
import RPi.GPIO as GPIO
from time import sleep

pan = 23
peltier = 
humidifier = 
fever = 

def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pan, GPIO.OUT)
    GPIO.setup(peltier, GPIO.OUT)
    GPIO.setup(humidifier, GPIO.OUT)
    GPIO.setup(fever, GPIO.OUT)
    GPIO.setwarnings(False)

try:
    setup()
    sensor = {
        'temp': 21.0,
        'hum': 37.0
    }
    while True:
        if sensor['temp'] >= 
        GPIO.output(pin, True)
        sleep(5)
        GPIO.output(pin, False)
        sleep(5)
except KeyboardInterrupt:
    GPIO.cleanup()