import pandas as pd
import sys
import datetime as time
import os.path

ids = [461372, 100798, 194529,
       158512, 312456, 443608,
       365743, 180847, 27056,
       142073, 126208, 324883,
       126519, 108736, 35910,
       349097, 446381, 176943,
       218481, 391218, 222487,
       418060, 147985, 116613,
       300345, 30951, 163541,
       395463, 320224, 373444,
       439921, 30563, 301580,
       324217, 35561, 208195,
       123718, 238335, 58438,
       421631, 392130, 64354,
       141656, 425526, 330260,
       155763, 45580, 116864,
       332424, 131584, 15023,
       16946, 282888, 2956,
       355975, 197474, 28387,
       160671, 218192, 104696,
       125999, 56057, 71313,
       180236, 369325, 135933,
       44662, 267055, 185619,
       317785, 238913, 45364,
       399471, 426021, 220609]

header_list = ["ID", "Content"]
pd.set_option('display.max_colwidth', 10000)
df = pd.read_csv('fulldata.csv', encoding='utf-8', names=header_list)

runNumber = 2
folderName = "data_" + str(runNumber)
print(folderName)

current_directory = os.getcwd()
final_directory = os.path.join(current_directory, folderName)
if not os.path.exists(final_directory):
    os.makedirs(final_directory)

query = 0
querymultiplier = 0;
for id in ids:
    query = 1 + int(querymultiplier / 3)
    filename = "output_#" + str(query) + "_" + str(id)+".txt";

    completeName = os.path.join(final_directory, filename)
    print(completeName)

    file1 = open(completeName, "w", encoding="utf-8")
    output = str(df.iloc[[id]])
    file1.write(output)
    file1.close()
    querymultiplier += 1