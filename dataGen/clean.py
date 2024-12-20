import os

allFiles = [f for f in os.listdir('./data/')]
c = 0
for file in allFiles:
    f = open(f'data/{file}', 'r')
    cons = f.read().split('\n')


    if (len(cons)==0 or not cons[0]):
        print(file)


# Visual J++.txt
# GamesRadar+
# Redirect to themselves for some reason? But they do have real wikipedia files???
