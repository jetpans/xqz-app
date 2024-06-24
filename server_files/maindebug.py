from flask import Flask,jsonify,request
from flask_socketio import send,emit,SocketIO
from flask_cors import CORS;
import time
import math
import random
from threading import Thread
#------------------------------------------
app = Flask(__name__)
app.config["SECRET_KEY"] = "secret"
socketio = SocketIO(app ,cors_allowed_origins="*")
app.config.update(FLASK_RUN_PORT=5050)
#-------------------------------------------
global RESET_TIME 
global CURRENT_QUESTION
global QUESTIONS
global CONST_DELAY

CONST_DELAY = 10
QUESTIONS = [{"question":"What can you find in Egypt?", "answers": ["piramids", "piramide", "pyramids", "piramidu", "pyramid"]},
             {"question":"What is the best college?", "answers": ["fer", "fakultet elektrotehnike i računarstva"]},
             {"question":"What year did Jesus die?", "answers":["33"]}]
RESET_TIME = time.time()
CURRENT_QUESTION = QUESTIONS[0]
allMessages = []




@app.route("/getThing")
def firstRoute():
    return jsonify("Hello Stjepan!")

@socketio.on("message")
def handle_msg(data):
    print("Recieved following message: ",data)
    allMessages.append(data)


    print("Sending this: ", data)
    emit("singleMessage", data, broadcast=True)


@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

def change_question():
    global CURRENT_QUESTION
    while True:
        index = math.floor(random.random()*len(QUESTIONS))
        if QUESTIONS[index]["question"] != CURRENT_QUESTION["question"]:
         CURRENT_QUESTION = QUESTIONS[index]
        else:
            break
    return 


def question_change_loop():
    print("\n\nIn loop!\n\n", flush=True)
    global CURRENT_QUESTION
    global RESET_TIME
    global CONST_DELAY
    while True:
        change_question()
        q_msg = {'text':CURRENT_QUESTION["question"], 'username':'GameMaster', 'socketID':"server"}
        print("Sending this: ", q_msg)
        socketio.emit("singleMessage", q_msg)
    

        

a = Thread(target = question_change_loop)
a.start()
if __name__ == "__main__":
    h = Thread(target= socketio.run(app, port=5000,  host="0.0.0.0", debug=True))
    h.start()

    
    
    
    