import json
import subprocess as sp
import sys

with open("translateddata.json", "r") as f:
    data = json.load(f)


def getTranslation(fr):
    toReturn = {}

    for lang in ["en", "es", "de"]:
        res = json.loads(sp.run(["crow", "-j", "-t", lang, fr], capture_output=True).stdout)
        toReturn[lang] = res["translation"]
    return toReturn




lieus = []
for lieu in data:
    newLieu = lieu
    otherTrans = getTranslation(newLieu["description"]["fr"])
    newLieu["description"] = newLieu["description"] | otherTrans
    #json.dump(newLieu, sys.stdout)
    #sys.stdout.flush()
    lieus.append(newLieu)

json.dump(lieus, sys.stdout)
sys.stdout.flush()
