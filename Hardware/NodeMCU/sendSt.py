import requests

url = "http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/upload/sendStatus"

payload = {
    'temp': 3.1,
    'hum': 0.1
}
headers = {
  'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdGFAZGF0YS5jb20iLCJuYW1lIjoiZGF0YSIsImlhdCI6MTYyNTA0ODI0MiwiZXhwIjoxNjI1NjUzMDQyfQ.Avykbm5FQzIpY7DpCvcs5oa7h4IZTrcld0jvFjPIghc'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)