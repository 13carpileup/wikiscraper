import requests
import json
import threading
import time

searched = {}
links = {}
MAX_TIME = 2
LAST_FETCH = time.time()
RATE_LIMIT = 0.1

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
    global LAST_FETCH
    
    if title in searched and searched[title]:
        return []

    links = []

    now = time.time()
    while not (now - LAST_FETCH) > 0.1:
        now = time.time()

    LAST_FETCH = now
    print(title)
    response = requests.get(format_link(title, False)).json()
    print(f'{title} fetched!')
    

    links.append(parse_links(response))

    while 'continue' in response:
        contString = response['continue']['plcontinue'] 
        response = requests.get(format_link(title, contString)).json()
        links.append(parse_links(response))
    
    return links




# search function
def bfs(root):
    now = time.time()
    if (now - start) > MAX_TIME:
        return
    
    initialLinks = get_connections(root)
    if (len(initialLinks)==0):
        return

    initialLinks = initialLinks[0]
    searched[root] = 1
    links[root] = initialLinks
    threads = []

    for con in initialLinks:
        # Fix: Create thread with target function
        t1 = threading.Thread(target=bfs, args=(con,))
        t1.start()
        threads.append(t1)
    
    for thread in threads:
        thread.join()



    

    
    
start = time.time()
links = bfs("Luigi Mangione")
print('lol')