import requests
import json

def parse_title(raw):
    return raw.replace(" ", "_")

def format_link(title, cont):
    link = f'https://en.wikipedia.org/w/api.php?action=query&titles={parse_title(title)}&prop=links&pllimit=max&format=json'

    if (cont):
        link += f'&plcontinue={cont}'

    return link

# filter out links that you don't like
def filter_links(title):
    blockedChars = [':', 'disambiguation']
    allowed = True

    for banned in blockedChars:
        if banned in title:
            allowed = False
    
    return allowed
    

def parse_links(js):
    js = js['query']['pages']
    pageid = list(js.keys())[0]

    links = js[pageid]['links']
    newLinks = [i['title'] for i in links]
    
    return list(filter(filter_links, newLinks))

# main connections function
def get_connections(title):
    links = []
    response = requests.get(format_link(title, False)).json()

    links.append(parse_links(response))

    while 'continue' in response:
        contString = response['continue']['plcontinue'] 
        response = requests.get(format_link(title, contString)).json()
        links.append(parse_links(response))
    
    return links



links = get_connections("Luigi Mangione")
print(links)