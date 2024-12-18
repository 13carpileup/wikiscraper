import mysql.connector 


mydb = mysql.connector.connect(
  host="localhost",
  user="mysql",
  password="1234",
  collation="utf8mb4_unicode_ci",
  database="wiki" 
)

cursor = mydb.cursor()

#cursor.execute("CREATE DATABASE wiki")


# Execute every command from the input file
cur = ''
i = 0
j = 0
with open('rawSQL/pagelinks.sql', 'r') as fd:
  for line in fd:
    print(j)
    j += 1
    
    cur += line

    if ";" in line:
      i+=1
      
      try:
        cursor.execute(line)
        print('ece')
      except Exception as msg:
        continue
        print("Command skipped: ", msg)
      
      cur = ''



print('Done!')