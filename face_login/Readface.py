import sys
import cv2
import csv
def TakeImages():
    name = input("Enter Name: ")
    Id = input("Enter Id: ")

    if not Id.isdigit():
        print("Error: Id must be a number.")
        return

    # Create dictionary for storing data
    dict1 = {'Name': name, 'Ids': Id}

    # Write data to CSV file
    fieldnames = ['Name', 'Ids']
    with open('Profile.csv', 'a+') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if f.tell() == 0:
            writer.writeheader()
        writer.writerow(dict1)

    # Load Haar cascade classifier for face detection
    harcascadePath = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
    try:
        detector = cv2.CascadeClassifier(harcascadePath)
    except cv2.error as e:
        print(f"Error: Failed to load Haar cascade classifier. {e}")
        return

    # Open camera and capture images
    cam = cv2.VideoCapture(0)
    sampleNum = 0

    while True:
        ret, img = cam.read()
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 3)
            sampleNum += 1
            cv2.imwrite(f"TrainingImage/{name}.{Id}.{sampleNum}.jpg", gray[y:y + h, x:x + w])

        cv2.imshow('Capturing Face for Login', img)

        if cv2.waitKey(100) & 0xFF == ord('q') or sampleNum > 60:
            break

    cam.release()
    cv2.destroyAllWindows()
    print(f"Images Saved for Name: {name} with ID: {Id}")
    print("Images saved location is TrainingImage/")

if __name__ == "__main__":
    TakeImages()
