import cv2
import os
import csv

def DetectFace():
    reader = csv.DictReader(open('Profile.csv'))
    name=''
    name1 = ''  # Define name1 and name2 before the loop
    name2 = ''
    print('Detecting Login Face')
    for rows in reader:
        result = dict(rows)
        if result['Ids'] == '1':
            name1 = result['Name']
        elif result['Ids'] == '2':
            name2 = result["Name"]

    recognizer = cv2.face.LBPHFaceRecognizer_create()
    recognizer.read("face_login/TrainData/Trainner.yml")  # Update this path if necessary
    harcascadePath = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'

    faceCascade = cv2.CascadeClassifier(harcascadePath)
    cam = cv2.VideoCapture(0)
    font = cv2.FONT_HERSHEY_SIMPLEX
    Face_Id = ''

    while True:
        ret, frame = cam.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = faceCascade.detectMultiScale(gray, 1.3, 5)
        Face_Id = 'Not detected'

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
            Id, confidence = recognizer.predict(gray[y:y + h, x:x + w])
            if confidence < 80:
                if Id == 1:
                    name = name1
                elif Id == 2:
                    name = name2
                Predicted_name = str(name)
                Face_Id = Predicted_name
            else:
                Predicted_name = 'Unknown'
                Face_Id = Predicted_name
                noOfFile = len(os.listdir("UnknownFaces")) + 1
                if int(noOfFile) < 100:
                    cv2.imwrite("UnknownFaces/Image" + str(noOfFile) + ".jpg", frame[y:y + h, x:x + w])
                else:
                    pass

            cv2.putText(frame, str(Predicted_name), (x, y + h), font, 1, (255, 255, 255), 2)

        cv2.imshow('Picture', frame)
        cv2.waitKey(1)
        if Face_Id == name1:
            print('----------Detected {}----------'.format(name1))
            print('-----------login successful-------')
            print('***********WELCOME {}**************'.format(name1))
            break
        elif Face_Id == name2:
            print('----------Detected {}----------'.format(name2))
            print('-----------login successful-------')
            print('***********WELCOME {}**************'.format(name2))
            break
        elif Face_Id == 'Unknown':
            print('-----------Login failed, please try again-------')
        else:
            print('Unknown face detected')


if __name__ == "__main__":
    DetectFace()
