import requests
from bs4 import BeautifulSoup
import datetime
import json
import os

Headers = { 'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246" }
web_url = "https://www.republika.co.id"
page = requests.get(web_url, headers=Headers)

if page.status_code == 200:
    obj = BeautifulSoup(page.content, 'html.parser')
    data = obj.find('ul', attrs={'class': 'wrap-latest'})
    datas = []
else:
    print("Webpage failed to fetch")
    exit()

filename = "headline.json"
previous_data = []

if os.path.exists(filename) and os.path.getsize(filename) > 0:
    with open(filename, "r") as f:
        previous_data = json.load(f)
else:
    previous_data = []

for data_scrap in data.find_all('li', attrs={'class': 'conten1'}):
    
    title = data_scrap.find('h3').text.strip().replace('"', '')
        
    duplicate = False
    for previous in previous_data:
        if previous['title'] == title:
            duplicate = True
            break
        if duplicate == True:
            continue
        
    category = data_scrap.find('span', class_='kanal-info').text.strip()
    if category == '':
        continue
        
    publish = data_scrap.find('div', class_='date').text.strip()
        
    time_collected = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
    datas.append({
        'title': title,
        'category': category,
        'publish_time': publish.split('-')[1].strip(),
        'storing_time': time_collected
    })

previous_data.extend(datas)

with open(filename, 'w') as f:
    json.dump(previous_data, f, indent=4)