import csv
import json
import os

for filename in os.listdir("formattedData/"):
    print(filename)
    if (filename != ".DS_Store"):
        csvfile = open("formattedData/" + filename, 'r')
        jsonfile = open("jsonData/" + filename[:-3] + 'json', 'w')

        fieldnames = ("geography","industry","sex","year", "quarter", "Emp", "HirN", "EarnS")
        reader = csv.DictReader( csvfile, fieldnames)
        for row in reader:
            json.dump(row, jsonfile)
            jsonfile.write('\n')