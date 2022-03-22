import requests
import csv
import json
import html
import re

no_html = re.compile("<.*?>")

def parseStr(string):
    string = html.unescape(string)
    string = re.sub(no_html, "", string)
    string = string.replace("Ã©", "é")
    string = string.replace("Ã¨", "è")
    string = string.replace("Ã´", "ô")
    string = string.replace("\n", "<br>")
    string = string.replace("\t", "&emsp;")

    return string

url = "https://opendata.mairie-albi.fr/api/3/action/package_show?id={}"

types = ["parcs_jardins", "monuments_poi", "etablissements_culturels", "bibliotheque"]

data = []

for t in types:
    r = requests.get(url.format(t))
    res = r.json()
    
    for resource in res["result"]["resources"]:
        r = requests.get(resource["url"])
        with open("tempcsv", "w") as f:
            f.write(r.text)

        with open("tempcsv", "rt") as f:
            file = csv.DictReader(f, delimiter=";")
            for row in file:
                toAppend = {"titre":        parseStr(row["title"]),
                             "description": parseStr(row["description"]),
                             "categorie":   list(map(parseStr, row["categories"].split("|"))),
                             "address":     parseStr(row["address"]),
                             "longiture":   parseStr(row["longitude"]),
                             "latitude":    parseStr(row["latitude"])}

                data.append(toAppend)

with open("data.json", "w") as f:
    json.dump(data, f, ensure_ascii=False)
