from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import sqlite3
import random
import os
from app.prediction import predict_disease, is_leaf_image
from app.disease_data import disease_info

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.config["JWT_SECRET_KEY"] = "supersecretkey"
jwt = JWTManager(app)

# Database Setup
def init_db():
    conn = sqlite3.connect("database.db")
    conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)
    conn.execute("""
        CREATE TABLE IF NOT EXISTS contact (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            message TEXT
        )
    """)
    conn.close()

init_db()

# Routes
@app.route('/')
def home():
    return jsonify({"message": "Flask backend is running!"})

# Signup Route
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not all([name, email, password]):
            return jsonify({"message": "Please fill in all required fields."}), 400

        if len(password) < 6:
            return jsonify({"message": "Password must be at least 6 characters long."}), 400

        conn = sqlite3.connect("database.db")
        cur = conn.cursor()
        cur.execute("SELECT * FROM users WHERE email = ?", (email,))
        existing_user = cur.fetchone()

        if existing_user:
            conn.close()
            return jsonify({"message": "Email already exists."}), 400

        # Hash and save password
        hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            (name, email, hashed_pw)
        )
        conn.commit()
        conn.close()
        return jsonify({"message": "Signup successful"}), 201

    except Exception as e:
        print("Error during signup:", e)
        return jsonify({"message": "Server error during signup", "error": str(e)}), 500


# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("SELECT id, name, password FROM users WHERE email=?", (email,))
    user = cur.fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user[2], password):
        token = create_access_token(identity={"id": user[0], "name": user[1], "email": email})
        return jsonify({"token": token, "name": user[1], "email": email})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# Predict Route (Demo)
# Predict Route
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"message": "No image file provided"}), 400
    
    file = request.files['image']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    try:
        # Save temp file
        filename = "temp_upload.jpg"
        file.save(filename)

        # Check if it's a leaf
        if not is_leaf_image(filename):
            os.remove(filename)
            return jsonify({"message": "Image is not a leaf. Please upload a valid leaf image."}), 400

        # Predict
        predicted_class, confidence = predict_disease(filename)
        
        # Get disease info
        info = disease_info.get(predicted_class, {
            "about": ["Information not available."],
            "treatment": ["Consult an expert."],
            "tips": ["Keep plant healthy."]
        })

        # Clean up
        os.remove(filename)

        # Parse crop and disease names
        parts = predicted_class.split('_')
        if len(parts) >= 2:
            crop = parts[0]
            disease = " ".join(parts[1:])
        else:
            crop = predicted_class
            disease = "Unknown"

        return jsonify({
            "crop": crop,
            "disease": disease,
            "confidence": confidence,
            "about": info['about'],
            "treatment": info['treatment'],
            "tips": info['tips']
        })

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({"message": "Error processing image", "error": str(e)}), 500

# Contact Route
@app.route('/contact', methods=['POST'])
def contact():
    data = request.get_json()
    name = data.get('name')
    message = data.get('message')
    conn = sqlite3.connect("database.db")
    cur = conn.cursor()
    cur.execute("INSERT INTO contact (name, message) VALUES (?, ?)", (name, message))
    conn.commit()
    conn.close()
    return jsonify({"message": "Message received"}), 200

from google.oauth2 import id_token
from google.auth.transport import requests as grequests

@app.route("/google-login", methods=["POST"])
def google_login():
    token = request.json.get("token")
    try:
        idinfo = id_token.verify_oauth2_token(token, grequests.Request())
        email = idinfo["email"]
        name = idinfo.get("name", "")
        # (Optional) Create user if not exist in DB
        return jsonify({"message": "Google login verified", "email": email, "name": name})
    except Exception as e:
        return jsonify({"message": "Invalid token", "error": str(e)}), 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
