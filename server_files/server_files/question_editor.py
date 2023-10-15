import json;
import os
def write_to_file(data, filename):
    with open(filename, "w", encoding = "UTF-8") as write_file:
        json.dump(data, write_file)
def fetch_from_file(filename):
    with open(filename, "r",encoding = "UTF-8") as read_file:
        return json.load(read_file)

def remove_answer(question, answer_index):
    question["answers"].pop(answer_index)
    return question

def add_answer(question, answer):
    question["answers"].append(answer)
    return question

def update_answer(question, index, answer):
    question["answers"][index] = answer
    return question

def update_question(question, new_question):
    question["question"] = new_question
    return question
current_questions = fetch_from_file("editor_feed.json")
delete_list = []
finish = False
for index,question in enumerate(current_questions):
    if finish:
        break
    while True:
        os.system("cls")
        print("\nQUESTION:", question["question"])
        temp_answers =", ".join(list( map(lambda x: x + "("+ str(question["answers"].index(x))+")", question["answers"])))
        print("ANSWERS:", temp_answers)
        ulaz = input("What you want to do? change, rm, add, update, delete, DONE: ")
        if ulaz == "":
            break
        elif ulaz == "change":
            update_question(question, input("Unesi novo pitanje: "))
        elif ulaz == "rm":
            remove_answer(question, int(input("Unesi index odgovora koji zelis izbrisati: ")))
        elif ulaz == "add":
            add_answer(question, input("Unesi novi odgovor: "))
        elif ulaz == "update":
            update_answer(question, int(input("Unesi index odgovora koji zelis promijeniti: ")), input("Unesi novi odgovor: "))
        elif ulaz == "delete":
            confirm = input("Are you sure? Type 'YES'")
            if confirm == "YES":
                question["question"] = "scrap"
        elif ulaz == "DONE":
            finish = True
            break
        else:
            print("Ulaz nepoznat, za gasenje stisnuti samo enter!")
for i in range(len(current_questions)-1,0,-1):
    if current_questions[i]["question"] == "scrap":
        current_questions.pop(i)
write_to_file(current_questions,"freshest_edit.json")