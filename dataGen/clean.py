import os

allFiles = [f for f in os.listdir('./data/')]
c = 0
for file in allFiles:
    print(file)
    f = open(f'data/{file}', 'r')
    cons = f.read().split('\n')
    f.close()

    f = open(f'data/{file}', 'w')
    out = ''

    for i in cons:
        fname = i + '.txt'
        if (fname in allFiles):
            out += i + '\n'

    out = out.strip()
    f.write(out)


# Visual J++.txt
# GamesRadar+
# Redirect to themselves for some reason? But they do have real wikipedia files???
