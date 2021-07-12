import requests
from bs4 import BeautifulSoup as bs
import sys
from time import sleep

while True:
    URL = 'http://192.168.137.97'
    webpage = requests.get(URL)
    webcontent = webpage.content
    htmlcontent = bs(webcontent, 'html.parser')
    # print(htmlcontent)

    content = htmlcontent.get_text()

    result = content.strip()
    print(result)

    result = result.replace(' ', '')
    result = result.replace('%', '').replace('*C', '')
    result = result.split('\t')
    print(result)

    sensor = {}

    for i in result:
        i = i.split(':')
        sensor[i[0]] = float(i[1])

    print(sensor)

    url = "http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/upload/sendStatus"

    payload = {
        'temp': sensor['Temperature'],
        'hum': sensor['Humidity']
    }
    headers = {
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdGFAZGF0YS5jb20iLCJuYW1lIjoiZGF0YSIsImlhdCI6MTYyNTA0ODI0MiwiZXhwIjoxNjI1NjUzMDQyfQ.Avykbm5FQzIpY7DpCvcs5oa7h4IZTrcld0jvFjPIghc'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)

    sleep(60)