import json;
import requests

example = {"question_id": 0,"question":"txt", "answers": []}

def write_to_file(data, filename):
    with open(filename, "w") as write_file:
        json.dump(data, write_file)
def fetch_from_file(filename):
    with open(filename, "r") as read_file:
        return json.load(read_file)
    
resp = requests.get("https://opentdb.com/api.php?amount=50")
stuff = json.loads(resp.text)

current_results = []
for i in stuff["results"]:
    if i["type"] !=  "boolean":
        current_results.append({"question_id":0, "question":i["question"], "answers":[i["correct_answer"].lower()]})

write_to_file(current_results, "triviaDBtemp.json")
    

