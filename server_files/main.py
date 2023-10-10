from flask import Flask,jsonify,request
from flask_socketio import send,emit,SocketIO
from flask_cors import CORS;
import time
import math
import random
from threading import Thread
import json
##RUN WITH $ flask --app main run --debug
#-UTILS-----------------------------
def write_to_file(data, filename):
    with open(filename, "w", encoding = "UTF-8") as write_file:
        json.dump(data, write_file)
def fetch_from_file(filename):
    with open(filename, "r",encoding = "UTF-8") as read_file:
        return json.load(read_file)
    
def fetch_question(old_question):
    while True:
        index = math.floor(random.random()*len(QUESTIONS))
        if QUESTIONS[index]["question"] != old_question["question"]:
         return QUESTIONS[index]
    
def change_question():
    global CURRENT_QUESTION
    CURRENT_QUESTION = fetch_question(CURRENT_QUESTION)
    return 

def is_correct_answer(answer, group_ID = 0):
    for allowed in CURRENT_QUESTION["answers"]:
        if answer.lower() == allowed:
            return True
    
    return False
#--------------------------------------

#-INIT-------------------------------------
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"
socketio = SocketIO(app ,cors_allowed_origins="*")
app.config.update(FLASK_RUN_PORT=5050)
#-------------------------------------------
#-CONSTS------------------------------------
global RESET_TIME 
global CURRENT_QUESTION
global QUESTIONS
global CONST_DELAY
CONST_DELAY = 10
QUESTIONS = fetch_from_file("all_questions.json")
RESET_TIME = time.time()
CURRENT_QUESTION = QUESTIONS[0]
allMessages = []
#------------------------------------------
#-ROUTES----------------------------------
@app.route("/getThing")
def firstRoute():
    return jsonify("Hello Stjepan!")

@socketio.on("message")
def handle_msg(data):
    print("Recieved following message: ",data)
    allMessages.append(data)
    if is_correct_answer(data["text"]):
        t_msg = {'text':"Congratulations {}! Your answer is correct!".format(data["username"]), 'username':'GameMaster', 'socketID':"server"}
        socketio.emit("singleMessage", t_msg)
        data["text"] = "||||||||||||||"
        emit("singleMessage", data, broadcast=True)
    else:
        print("Sending this: ", data)
        emit("singleMessage", data, broadcast=True)
    


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response
#-----------------------------------

#-FUNCTIONS----------------------------
def question_change_loop(group_ID = 0):
    print("\n\nIn loop!\n\n", flush=True)
    global CURRENT_QUESTION
    global RESET_TIME
    global CONST_DELAY
    while True:
        change_question()
        q_msg = {'text':CURRENT_QUESTION["question"], 'username':'GameMaster', 'socketID':"server"}
        print("Sending this: ", q_msg)
        socketio.emit("singleMessage", q_msg)
        time.sleep(10)
#-----------------------------------------------

        
#-MAIN-------------------------------------------
a = Thread(target = question_change_loop)
a.start()
if __name__ == "__main__":
    h = Thread(target= socketio.run(app, port=5000,  host="0.0.0.0", debug=True))
    h.start()
#------------------------------------------------
    
    
    
    