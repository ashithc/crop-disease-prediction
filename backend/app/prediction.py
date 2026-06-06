import os
import numpy as np
import torch
import clip
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image

# Paths
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(__file__)),
    "plants_disease_model_best.h5"
)

# Global variables for models
disease_model = None
clip_model = None
clip_preprocess = None
device = "cuda" if torch.cuda.is_available() else "cpu"

# Class Labels
CLASS_LABELS = {
     0: "Pepper_healthy",
    1: "Pepper_leaf_blight",
    2: "Pepper_yellow_mottle_virus",
    3: "Rice BrownSpot",
    4: "Rice Healthy",
    5: "Rice Hispa",
    6: "Rice LeafBlast",
    7: "Sugarcane healthy",
    8: "Sugarcane mosaic",
    9: "Sugarcane red rot",
    10: "Sugarcane rust",
    11: "Sugarcane yellow leaf",
    12: "Tomato Bacterial Spot",
    13: "Tomato Early Blight",
    14: "Tomato Healthy",
    15: "Tomato Late Blight",
    16: "Tomato Septoria Leaf Spot",
    17: "Tomato Yellow Leaf Curl Virus",
    18: "Tomato leaf mold",
    19: "Tomato mosaic virus",
    20: "Tomato spider mites two-spotted spider mite",
    21: "Tomato target spot"
}

def load_models():
    global disease_model, clip_model, clip_preprocess
    if disease_model is None:
        print("Loading Disease Model...")
        disease_model = load_model(MODEL_PATH)
        print("Disease Model Loaded.")
    
    if clip_model is None:
        print("Loading CLIP Model...")
        clip_model, clip_preprocess = clip.load("ViT-B/32", device=device)
        print("CLIP Model Loaded.")

def is_leaf_image(img_path, threshold=0.5):
    """
    Uses CLIP to check if the image is a leaf.
    """
    if clip_model is None:
        load_models()
        
    image = clip_preprocess(Image.open(img_path)).unsqueeze(0).to(device)
    text_prompts = ["a photo of a leaf", "a photo of not a leaf"]
    text_tokens = clip.tokenize(text_prompts).to(device)

    with torch.no_grad():
        logits_per_image, _ = clip_model(image, text_tokens)
        probs = logits_per_image.softmax(dim=-1).cpu().numpy()[0]

    print(f"Leaf Probability: {probs[0]:.4f}")
    return probs[0] > threshold

def predict_disease(img_path):
    """
    Runs the disease prediction model on the image.
    """
    if disease_model is None:
        load_models()

    # Preprocess for Keras model
    img = keras_image.load_img(img_path, target_size=(150, 150))
    img_array = keras_image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    prediction = disease_model.predict(img_array)
    predicted_class_idx = np.argmax(prediction, axis=1)[0]
    confidence = float(np.max(prediction) * 100)
    
    predicted_class = CLASS_LABELS.get(predicted_class_idx, "Unknown")
    
    return predicted_class, confidence
