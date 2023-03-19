import pandas as pd

df = pd.read_csv("NBA_Player_Stats.csv")

df['Player'] = df['Player'].str.replace('*', '')

df.to_csv("NBA_Player_Stats.csv", index=False)

df = pd.read_csv("NBA_Finals_and_MVP.csv")

df = df.replace("Miami Heat", "Heat")

df = df.replace("Golden State Warriors", "Warriors")

df = df.replace("Cleveland Cavaliers", "Cavaliers")

df = df.replace("San Antonio Spurs", "Spurs")

df = df.replace("New York Knicks", "Knicks")

df = df.replace("Oklahoma City Thunder", "Thunder")

df = df.replace("Dallas Mavericks", "Mavericks")

df = df.replace("Los Angeles Lakers", "Lakers")

df = df.replace("Boston Celtics", "Celtics")

df = df.replace("Orlando Magic", "Magic")

df = df.replace("Detroit Pistons", "Pistons")

df = df.replace("New Jersey Nets", "Nets")

df = df.replace("Philadelphia 76ers", "76ers")

df = df.replace("Indiana Pacers", "Pacers")

df = df.replace("Chicago Bulls", "Bulls")

df = df.replace("Utah Jazz", "Jazz")


df = df.replace("J. Harden", "James Harden")

df = df.replace("S. Curry", "Stephen Curry")

df = df.replace("R. Westbrook", "Russell Westbrook")

df = df.replace("K. Durant", "Kevin Durant")

df = df.replace("L. James", "LeBron James")

df = df.replace("D. Rose", "Derrick Rose")

df = df.replace("K. Bryant", "Kobe Bryant")

df = df.replace("D. Nowitzki", "Dirk Nowitzki")

df = df.replace("S. Nash", "Steve Nash")

df = df.replace("K. Garnett", "Kevin Garnett")

df = df.replace("T. Duncan", "Tim Duncan")

df = df.replace("A. Iverson", "Allen Iverson")

df = df.replace("S. O'Neal", "Shaquille O'Neal")

# df = df.replace("D. Robinson", "Duncan Robinson")

# df = df.replace("K. Malone", "Karl Malone")

# df = df.replace("M. Jordan", "Michael Jordan")

# df = df.replace("H. Olajuwon", "Hakeem Olajuwon")

# df = df.replace("C. Barkley", "Charles Barkley")

# df = df.replace("M. Johnson", "Magic Johnson")

# df = df.replace("L. Bird", "Larry Bird")

# df = df.replace("M. Malone", "Moses Malone")

df.to_csv("NBA_Finals_and_MVP_2.csv", index=False)