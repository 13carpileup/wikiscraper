import os

allFiles = [f for f in os.listdir('./data/')]
c = 0
for file in allFiles:
    f = open(f'data/{file}', 'r')
    cons = f.read().split('\n')

    for i in cons:
        fname = i + '.txt'
        if (not fname in allFiles):
            print(i)


# Visual J++.txt
# GamesRadar+
# Redirect to themselves for some reason? But they do have real wikipedia files???
