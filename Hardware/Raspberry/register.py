import requests

url = "http://ec2-3-139-102-177.us-east-2.compute.amazonaws.com:3000/api/users/signup"

# payload='email=data@data.com&password=1234&name=data'
payload = {
    'email': 'data@data.com',
    'password': '1234',
    'name': 'data'
}
headers = {}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)