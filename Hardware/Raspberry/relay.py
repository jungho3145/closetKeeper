import os
import RPi.GPIO as GPIO
from time import sleep

pan = 23
peltier = 

def setup():
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pin, GPIO.OUT)
    GPIO.setwarnings(False)

try:
    setup()
    while True:
        GPIO.output(pin, True)
        sleep(5)
        GPIO.output(pin, False)
        sleep(5)
except KeyboardInterrupt:
    GPIO.cleanup()