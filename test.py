import requests
import json
import threading
import time
from os import listdir
import random
from concurrent.futures import ThreadPoolExecutor, TimeoutError
from queue import Queue

def update_file(title, cons):
    f = open(f'data/{title.replace("/", "%2F")}.txt', 'w')
    out = ''
    for con in cons:
        out += con + '\n'
    
    out = out.strip()
    f.write(out)

def parse_title(raw):
    return raw.replace(" ", "_").replace("&", "%26").replace("/", "%2F")

def format_link(title, cont):
    link = f'https://en.wikipedia.org/w/api.php?action=query&titles={parse_title(title)}&prop=links&pllimit=max&format=json'
    if (cont):
        link += f'&plcontinue={cont}'
    
    return link

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

    try:
        links = js[pageid]['links']
        newLinks = [i['title'] for i in links]
        return list(filter(filter_links, newLinks))
    except:
        print("FAILURE: LINKS...")
        print(js)
        return []

def get_connections(title):
    global LAST_FETCH

    if title in searched and searched[title]:
        return []

    links = []

    now = time.time()
    while not (now - LAST_FETCH) > 0.1:
        now = time.time()

    LAST_FETCH = now
    try:
        response = requests.get(format_link(title, False), timeout=10).json()
    except Exception as e:
        print(f"ERROR!!! TITLE: {title}")
        print(f'LINK: {format_link(title, False)}')
        print(f'Error: {e}')
        return []

    links = parse_links(response)

    try:
        while 'continue' in response:
            contString = response['continue']['plcontinue'] 
            response = requests.get(format_link(title, contString), timeout=10).json()
            links = links + parse_links(response)
    except Exception as e:
        print(f'Connection error for {title}: {e}')
        retry.append(title)
    return links

def process_links(root, queue):
    """Process a single root and add its connections to the queue"""
    global links, searched

    if root in searched:
        return
    
    initialLinks = get_connections(root)
    if not initialLinks:
        return

    update_file(root, initialLinks)
    print(f"Updated {root}")

    initialLinks = initialLinks
    searched[root] = 1
    links[root] = initialLinks

    # Add new links to queue
    for link in initialLinks:
        if link not in searched:
            queue.put(link)

def bfs_worker(queue, executor):
    """Worker function that processes items from the queue"""
    while True:
        try:
            root = queue.get(timeout=5)  # 5 second timeout
            if root is None:  # Poison pill
                break
            
            process_links(root, queue)
            queue.task_done()
            
        except TimeoutError:
            break
        except Exception as e:
            print(f"Worker error: {e}")
            queue.task_done()

# Constants
searched = {}
links = {}
MAX_TIME = 1200
LAST_FETCH = time.time()
RATE_LIMIT = 0.3
MAX_WORKERS = 20
MAX_LINKS_PER_PAGE = 50
start = time.time()
retry = []

# Initialize based on data
allFiles = [f for f in listdir('data/')]
toCheck = []
for file in allFiles:
    f = open(f'data/{file}', 'r')
    connections = f.read().split('\n')

    if (connections[-1]) == '':
        connections = connections[:-1]

    searched[file[:-4]] = 1
    links[file[:-4]] = connections
    toCheck.append(file[:-4])

# Create work queue
work_queue = Queue()

# Add initial work to queue
f = open('retry.txt', 'r')
retryWords = f.read().strip().split('\n')
random.shuffle(retryWords)
random.shuffle(toCheck)
for word in retryWords:
    if word:
        work_queue.put(word)

# Create thread pool and worker threads
with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
    while not work_queue.empty():
        workers = []
        for _ in range(MAX_WORKERS):
            worker = threading.Thread(target=bfs_worker, args=(work_queue, executor))
            worker.start()
            workers.append(worker)
        
        # Send poison pills to stop workers
        for _ in range(MAX_WORKERS):
            work_queue.put(None)
        
        # Wait for all workers to finish
        for worker in workers:
            worker.join()

# Store data
for title in links.keys():
    update_file(title, [links[title]])

f = open('retry.txt', 'w')
for r in retry:
    f.write(f'{r}\n')

print(work_queue.qsize())