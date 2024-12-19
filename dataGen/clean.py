import os

allFiles = [f for f in os.listdir('data/')]
c = 0
for file in allFiles:
    f = open(f'data/{file}', 'r')
    cons = f.read().split('\n')

    if (len(cons) < 2 and cons[0] == file[:-4]):
        c += 1
        print(file)

print(c)

# Visual J++.txt 
# GamesRadar+
# Redirect to themselves for some reason? But they do have real wikipedia files???