import pandas as pd

big = pd.read_csv("games_details.csv")

size = len(big)
small = big.head(size//50)

small.to_csv("games_details_smaller.csv", index=False)