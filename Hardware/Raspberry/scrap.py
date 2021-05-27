import requests
from bs4 import BeautifulSoup as bs
import sys
from time import sleep

for i in range(5):
    URL = sys.argv[1]
    # URL = 'http://192.168.137.98/'
    webpage = requests.get(URL)
    webcontent = webpage.content
    htmlcontent = bs(webcontent, 'html.parser')
    # print(htmlcontent)

    content = htmlcontent.get_text()

    result = content.strip()
    print(result)

    result = result.replace(' ', '')
    result = result.split('\t')
    print(result)

    sensor = {}

    for i in result:
        i = i.split(':')
        sensor[i[0]] = i[1]

    print(sensor)

    sleep(10)
# return sensor