import cv2
import os
import shutil
import csv
import numpy as np
from PIL import Image

def getImagesAndLabels(path):
    # Check if the directory exists
    if not os.path.exists(path):
        print(f"Error: Directory '{path}' does not exist.")
        return [], []

    # Get the path of all the files in the folder
    imagePaths = [os.path.join(path, f) for f in os.listdir(path)]

    # Create empty face and ID lists
    faces = []
    Ids = []

    # Loop through all the image paths and load the IDs and the images
    for imagePath in imagePaths:
        # Loading the image and converting it to grayscale
        pilImage = Image.open(imagePath).convert('L')
        # Convert the PIL image into a numpy array
        imageNp = np.array(pilImage, 'uint8')
        # Extract the ID from the image
        Id = int(os.path.split(imagePath)[-1].split(".")[1])
        # Extract the face from the training image sample
        faces.append(imageNp)
        Ids.append(Id)

    return faces, Ids

# Train image using LBPHFace recognizer
def TrainImages():
    recognizer = cv2.face.LBPHFaceRecognizer_create()
    harcascadePath = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'

    detector = cv2.CascadeClassifier(harcascadePath)
    faces, Id = getImagesAndLabels("face_login/TrainingImage")
    
    if len(faces) == 0:
        print("Error: No images found in 'TrainingImage' directory.")
        return

    recognizer.train(faces, np.array(Id))
    # Store data in file
    recognizer.save("face_login/TrainData/Trainner.yml")

    res = "Image Trained and data stored in TrainData/Trainner.yml"
    print(res)
    print(cv2.__version__)

TrainImages()
