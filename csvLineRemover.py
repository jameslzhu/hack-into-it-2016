import csv
import os
for filename in os.listdir("data/"):
    print(filename)
    if (filename != ".DS_Store"):
        with open("data/" + filename,"rb") as source:
            rdr= csv.reader( source )
            with open("formattedData/" + filename,"wb") as result:
                wtr= csv.writer( result )
                for r in rdr:
                    wtr.writerow( (r[3], r[5], r[7], r[14], r[15], r[16], r[17], r[18]) )