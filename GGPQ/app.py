from flask import Flask, request, jsonify
from flask_cors import CORS
from email_service import send_welcome_email
from models import db, User
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# CORS configuration to allow frontend requests
CORS(app, resources={r"/*": {"origins": "*"}})

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Create tables if they don't exist
with app.app_context():
    db.create_all()

@app.route('/register', methods=['POST'])
def register():
    """
    Register a new user.
    Expected JSON payload: {"name": "username", "email": "user@example.com"}
    """
    try:
        data = request.json
        
        # Validate input
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        user_name = data.get('name')
        user_email = data.get('email')
        
        if not user_name or not user_email:
            return jsonify({"error": "Name and email are required"}), 400
        
        # Validate email format
        if '@' not in user_email or '.' not in user_email:
            return jsonify({"error": "Invalid email format"}), 400
        
        # Check if user already exists
        existing_user = User.query.filter_by(email=user_email).first()
        if existing_user:
            return jsonify({"error": "User with this email already exists"}), 409
        
        # Create new user
        new_user = User(username=user_name, email=user_email)
        db.session.add(new_user)
        db.session.commit()
        
        # Send welcome email
        site_link = os.getenv('SITE_URL', 'http://localhost:5173')
        email_sent = send_welcome_email(user_email, user_name, site_link)
        
        response_data = {
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "name": new_user.username,
                "email": new_user.email,
                "created_at": new_user.created_at.isoformat()
            },
            "email_sent": email_sent
        }
        
        return jsonify(response_data), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify API is running"""
    return jsonify({"status": "healthy", "message": "API is running"}), 200

@app.route('/users', methods=['GET'])
def get_users():
    """Get all registered users"""
    try:
        users = User.query.all()
        users_list = [{
            "id": user.id,
            "name": user.username,
            "email": user.email,
            "created_at": user.created_at.isoformat()
        } for user in users]
        
        return jsonify({"users": users_list, "count": len(users_list)}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')