import os.path

def checkfile(fname):
    return os.path.isfile(f"data/{fname.replace("/", "%2F")}.txt")

initial = input("From:")
target = input("To:")

if (not checkfile(initial) and checkfile(target)):
    print('err')
    exit()

f = open(f"data/{initial.replace("/", "%2F")}.txt", "r").read().split('\n')
t = open(f"data/{target.replace("/", "%2F")}.txt", "r").read().split('\n')

visited = {}


queue = [[[initial], f]]
while len(queue) > 0:
    next = queue.pop(0)
    #print(next)

    for con in next[1]:
        if con in visited:
            continue

        visited[con] = 1
        if not checkfile(con):
            continue

        f = open(f"data/{con.replace("/", "%2F")}.txt", 'r').read().split('\n')
        queue.append([next[0] + [con], f])

        if target in f:
            print('found!')
            print([next[0] + [con] + [target]])

print(f)
