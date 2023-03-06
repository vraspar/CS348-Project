# reading csv file
text = open("/u4/dcsena/cs348/project/games.csv", "r")
  
# joining with space content of text
text = ' '.join([i for i in text]) 
  
#open text file
text_file = open("/u4/dcsena/cs348/project/CS348-PROJECT/Database/testdb/life", "w")
 
#write string to file
text_file.write(text)
 
#close file
text_file.close()